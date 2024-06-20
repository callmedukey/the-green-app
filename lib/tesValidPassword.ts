function testValidPassword(password: string) {
  // Define the regular expression for the password
  let regex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/;
  // Test the password against the regex
  return regex.test(password);
}

export default testValidPassword;
