function containsSpecialCharacters(str: string) {
  // Define the regular expression for special characters
  let regex = /[!@#$%^&*(),.?":{}|<>]/g;
  // Test the string against the regex
  return regex.test(str);
}
export default containsSpecialCharacters;
