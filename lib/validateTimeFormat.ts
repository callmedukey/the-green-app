const regex = /^\d{2}:\d{2}$/;

export function validateTimeFormat(input: string) {
  return regex.test(input);
}
