"use server";
import { signIn, signOut } from "@/auth";
import censorUsername from "@/lib/censorUsername";
import containsSpecialCharacters from "@/lib/containsSpecialCharacters";
import generateCode from "@/lib/generateCode";
import prisma from "@/lib/prisma";
import saltAndHashPassword from "@/lib/saltAndHashPassword";
import testValidPassword from "@/lib/tesValidPassword";
import testValidPhoneNumber from "@/lib/testValidPhoneNumber";
import { cookies } from "next/headers";
import { SolapiMessageService } from "solapi";
import { z } from "zod";
import { KakaoTemplates } from "@/lib/kakaoTemplates";

export async function checkUsername({ username }: { username: string }) {
  try {
    if (
      !username ||
      username.length < 3 ||
      username.length > 14 ||
      typeof username !== "string" ||
      containsSpecialCharacters(username) ||
      username.includes(" ")
    ) {
      return {
        error: "사용 불가한 아이디입니다",
      };
    }

    const found = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (found) {
      return {
        error: "이미 존재하는 아이디입니다",
      };
    }

    return {
      message: "사용 가능한 아이디입니다",
    };
  } catch (error) {
    return {
      error: "서버 오류입니다",
    };
  }
}

export const verifyPhoneNumber = async ({ phone }: { phone: string }) => {
  try {
    const cookieStores = cookies();
    const foundCookie = cookieStores.get("verifying-number");

    if (foundCookie) {
      return {
        message: "인증번호 발송 하진지 1분이 되지 않았습니다",
      };
    }

    const code = generateCode();

    const created = await prisma.verificationCode.create({
      data: {
        code,
      },
    });

    //Send code to mobile number

    //Set cookie for timer
    cookieStores.set({
      name: "verifying-number",
      value: new Date().toString(),
      httpOnly: true,
      maxAge: 60,
    });

    if (created) {
      const solapi = new SolapiMessageService(
        process.env.SOLAPI_API_KEY!,
        process.env.SOLAPI_API_SECRET!
      );
      const response = await solapi.sendOne({
        to: phone,
        from: process.env.SOLAPI_SENDER_PHONE_NUMBER!,
        text: `더그린 인증번호: [ ${created.code} ]`,
      });
      console.log(response);
      if ((response.statusCode = "2000"))
        return { message: "인증번호 발송 완료" };
      else return { error: "인증번호 발송 실패" };
    } else {
      return { error: "인증번호 발송 실패" };
    }
  } catch (error) {
    console.error(error);
    return { error: "서버 오류" };
  }
};

export const verifyPhoneNumberCode = async ({ code }: { code: string }) => {
  try {
    if (!code || code.length !== 6 || typeof code !== "string") {
      return {
        error: "인증번호는 6자리 입니다.",
        invalidCode: true,
      };
    }

    const deleted = await prisma.$transaction(async (tx) => {
      const foundCode = await tx.verificationCode.findFirst({
        where: {
          code,
        },
      });

      if (foundCode) {
        return await tx.verificationCode.delete({
          where: {
            id: foundCode.id,
          },
        });
      } else {
        return null;
      }
    });

    if (!deleted) {
      return {
        message: "인증번호가 유효하지 않습니다.",
        invalidCode: true,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: "서버 오류" };
  }

  return { message: "인증번호가 일치합니다.", verified: true };
};

export const registerUser = async ({
  password,
  passwordConfirm,
  email,
  phone,
  name,
  address,
  username,
}: {
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
  name: string;
  address: string;
  username: string;
}) => {
  try {
    if (password !== passwordConfirm || !testValidPassword(password)) {
      return {
        error: "비밀번호를 확인해주세요",
      };
    }

    if (username.includes(" ")) {
      return {
        error: "아이디에 공백을 포함할 수 없습니다.",
      };
    }

    const created = await prisma.user.create({
      data: {
        password: await saltAndHashPassword(password),
        email,
        phone: phone.replace(/-/g, ""),
        name,
        address,
        username,
      },
    });

    if (!created) {
      return { error: "회원가입 실패" };
    }

    const solapi = new SolapiMessageService(
      process.env.SOLAPI_API_KEY!,
      process.env.SOLAPI_API_SECRET!
    );
    await solapi.sendOne({
      to: phone,
      from: process.env.SOLAPI_SENDER_PHONE_NUMBER!,
      kakaoOptions:{
        pfId:process.env.SOLAPI_PFID!,
        templateId:KakaoTemplates.SIGNUP,
        disableSms:false,
        variables: {
          "#{name}": name,
        },
      },
    });

    return {
      message: "회원가입 성공",
      redirectTo: "/account",
    };
  } catch (error) {
    console.log(error);
    return { error: "회원가입 실패" };
  }
};

export const signInUser = async (username: string, password: string) => {
  const userExists = await prisma.user.findFirst({
    where: {
      username,
      password: await saltAndHashPassword(password),
    },
  });

  if (!userExists) {
    return {
      error: "아이디 또는 비밀번호가 잘못되었습니다.",
    };
  }

  await signIn("credentials", {
    username,
    password,
    redirect: false,
  });

  return {
    message: "로그인 성공",
  };
};

export const findUsername = async ({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) => {
  const newPhone = phone.replace(/-/g, "");

  const user = await prisma.user.findUnique({
    where: {
      name,
      phone: newPhone,
    },
    select: {
      username: true,
    },
  });

  if (!user) {
    return {
      error: "아이디를 찾을 수 없습니다.",
    };
  }

  const censoredUsername = censorUsername(user.username);

  return {
    username: censoredUsername,
  };
};

export const resetPasswordFirstStep = async ({
  username,
  phone,
}: {
  username: string;
  phone: string;
}) => {
  try {
    const cookieStore = cookies();

    const passwordResetSent = cookieStore.get("passwordResetSent");
    if (passwordResetSent) {
      return {
        error:
          "인증번호 발송하신지 1분이 안되었습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    const updated = await prisma.user.update({
      where: {
        username,
        phone: phone.replace(/-/g, ""),
      },
      data: {
        passwordResetCode: {
          upsert: {
            update: {
              code: generateCode(),
            },
            create: {
              code: generateCode(),
            },
          },
        },
      },
      select: {
        id: true,
        passwordResetCode: {
          select: {
            code: true,
          },
        },
      },
    });

    if (updated && updated.passwordResetCode) {
      const solapi = new SolapiMessageService(
        process.env.SOLAPI_API_KEY as string,
        process.env.SOLAPI_API_SECRET as string
      );

      const res = await solapi.sendOne({
        to: phone,
        from: process.env.SOLAPI_SENDER_PHONE_NUMBER as string,
        text: `더그린 비밀번호 초기화 인증번호: [ ${updated.passwordResetCode.code} ]`,
      });

      if (res.statusCode === "2000") {
        cookieStore.set("passwordResetSent", "true", {
          path: "/",
          httpOnly: true,
          secure: true,
          maxAge: 60,
        });

        return {
          message: "인증번호 발송 완료",
        };
      } else {
        return {
          error: "인증번호 발송 오류",
        };
      }
    } else {
      return {
        error: "인증번호 발송 오류",
      };
    }
  } catch (error) {
    return {
      error: "아이디와 휴대폰 번호를 확인해주세요.",
    };
  }
};

export const resetPasswordSecondStep = async ({
  code,
  username,
}: {
  code: string;
  username: string;
}) => {
  try {
    const deleteCode = await prisma.passwordResetCode.delete({
      where: {
        code,
        userUsername: username,
      },
    });

    if (!deleteCode) {
      return {
        error: "인증번호를 확인해주세요.",
      };
    }

    const uniqueCode = await prisma.oneTimeUniqueCode.findUnique({
      where: {
        userUsername: username,
      },
    });
    let codeId;
    if (!uniqueCode) {
      codeId = await prisma.oneTimeUniqueCode.create({
        data: {
          userUsername: username,
        },
      });
      if (codeId) {
        return {
          message: "인증번호 확인 완료",
          redirectTo: `/reset-password/reset?code=${codeId.id}`,
        };
      }
    }

    if (uniqueCode) {
      return {
        message: "인증번호 확인 완료",
        redirectTo: `/reset-password/reset?code=${uniqueCode.id}`,
      };
    } else
      return {
        error: "인증번호 확인 오류",
      };
  } catch (error) {
    return {
      error: "인증번호를 확인해주세요.",
    };
  }
};

export const resetPasswordFinalStep = async ({
  password,
  uniqueCode,
}: {
  password: string;
  uniqueCode: string;
}) => {
  try {
    const foundCode = await prisma.oneTimeUniqueCode.findFirst({
      where: {
        id: uniqueCode,
      },
      select: {
        userUsername: true,
      },
    });

    if (!foundCode) {
      return {
        error: "인증번호를 확인해주세요.",
      };
    }

    const userUpdated = await prisma.user.update({
      where: {
        username: foundCode.userUsername,
      },
      data: {
        password: await saltAndHashPassword(password),
      },
    });

    if (userUpdated) {
      await prisma.oneTimeUniqueCode.delete({
        where: {
          id: uniqueCode,
        },
      });

      return {
        message: "비밀번호 재설정 완료",
        redirectTo: "/login",
      };
    } else {
      return {
        error: "비밀번호 재설정 오류",
      };
    }
  } catch (error) {
    return {
      error: "비밀번호를 확인해주세요.",
    };
  }
};

const UpdateUserSchema = z.object({
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
      {
        message:
          "비밀번호는 최소 8자 이상, 특수 문자 한개 이상, 숫자 한개 이상이어야 합니다.",
      }
    ),
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  address: z.string({ required_error: "주소를 입력해주세요" }),
  phone: z.string().refine((val) => testValidPhoneNumber(val), {
    message: "휴대폰 번호 형식이 올바르지 않습니다.",
  }),
});

export const updateUser = async ({
  phone,
  email,
  address,
  password,
  username,
}: {
  phone: string;
  email: string;
  address: string;
  password: string;
  username: string;
}) => {
  try {
    const parsed = UpdateUserSchema.parse({
      phone,
      email,
      address,
      password,
    });

    const updated = await prisma.user.update({
      where: {
        username,
      },
      data: {
        ...parsed,
        phone: phone.replace(/-/g, ""),
      },
    });

    if (updated) {
      return {
        message: "정보 수정 됐습니다",
      };
    } else {
      return {
        error: "정보 수정이 안됐습니다. 다시 시도해주세요.",
      };
    }
  } catch (error) {
    console.error(error);
    return { error: "잘못된 입력입니다." };
  }
};

export const deleteUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const deleted = await prisma.user.delete({
      where: {
        username,
        password: await saltAndHashPassword(password),
      },
    });
    if (deleted) {
      return {
        message: "회원탈퇴 완료",
        signOut: true,
      };
    } else {
      return { error: "회원탈퇴 오류, 유선 문의 부탁드립니다" };
    }
  } catch (error) {
    return { error: "회원탈퇴 오류, 유선 문의 부탁드립니다" };
  }
};

export const SignOutUser = async () => {
  await signOut({ redirectTo: "/login", redirect: true });
};
