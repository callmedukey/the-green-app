function testValidPassword(password: string) {
  // Define the regular expression for the password
  let regex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
  // Test the password against the regex
  return regex.test(password);
}

export default testValidPassword;
