import type { UserStatus } from "@prisma/client";

export function parseUserStatus(status: UserStatus) {
  switch (status) {
    case "REGISTERED":
      return "회원가입";
    case "VISIT":
      return "방문상담";
    case "CONSULTATION":
      return "견적전달";
    case "CONTRACT":
      return "계약확정";
    case "SIGNED":
      return "계약서작성";
    case "START":
      return "공사시작";
    default:
      return "";
  }
}
