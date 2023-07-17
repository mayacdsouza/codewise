/*
This is a utility function for validating login form input.
It takes an object 'values' containing the login form field values and returns an object containing error messages, if any.
*/

function LoginValidation(values){
    let error = {}
    const email_pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (values.login_email === "") {
        error.email = "Email cannot be empty";
    } else if (!email_pattern.test(values.login_email)) {
    error.email = "Invalid email format";
    } else {
    error.email = ""
    }

    if (values.login_password_hash === "") {
      error.password = "Password cannot be empty";
    } else {
      error.password = ""
    }
    return error;
}

export default LoginValidation;