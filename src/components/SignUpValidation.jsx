function SignUpValidation(values) {
    let error = {}
    const email_pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    
    if(values.name === "") {
      error.name = "Name cannot be empty"
    }
    else {
      error.name = ""
    }
    if (values.signup_email === "") {
      error.email = "Email cannot be empty"
    } else if (!email_pattern.test(values.signup_email)) {
      error.email = "Invalid email format"
    } else {
      error.email = ""
    }
    if(values.company === "") {
        error.company = "Company cannot be empty"
      }
      else {
        error.company = ""
      }
    if (values.signup_password_hash === "") {
      error.password = "Password cannot be empty"
    } else {
      error.password = ""
    }
    return error;
}
export default SignUpValidation;