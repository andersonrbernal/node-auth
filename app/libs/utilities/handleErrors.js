function handleErrors(err) {
    let errors = { 
        email: "",
        password: ""
    };

    // duplicate error code
    const emailIsNotUnique = err.code === 11000;
    if (emailIsNotUnique) {
        errors.email = 'This e-mail already exists in our database';
        return errors;
    }

    // incorrect email or password
    const emailIsIncorrect = err.message === 'Incorrect Email.';
    if (emailIsIncorrect) {
        errors.email = "That email is not registered."
        return errors;
    }
    const passwordIsIncorrect = err.message === 'Incorrect password.';
    if (passwordIsIncorrect) {
        errors.password = "That password is incorrect.";
        return errors;
    }
    
    // validation errors
    const userValidationFailed = err.message.includes('User validation failed');
    if (userValidationFailed) {
        const valuesOfErrors = Object.values(err.errors);
        valuesOfErrors.forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    } 

    return errors;
}

module.exports = { handleErrors };