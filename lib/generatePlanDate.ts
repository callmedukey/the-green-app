export type BuildingDate = "3months" | "6months" | "12months" | "unknown";

export function generatePlanDate(buildingDate: BuildingDate) {
  switch (buildingDate) {
    case "3months":
      return "3개월 이내";
    case "6months":
      return "6개월 이내";
    case "12months":
      return "1년 이내";
    case "unknown":
      return "미정";
    default:
      return "";
  }
}
