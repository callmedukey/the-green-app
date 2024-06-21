import type { InquiryType } from "@prisma/client";

export function generateInquiryType(inquiryType: InquiryType) {
  switch (inquiryType) {
    case "CONSTRUCTION":
      return "건축도면";
    case "QUOTE":
      return "견적";
    case "ETC":
      return "기타";
  }
}
