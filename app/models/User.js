const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

function triggerUserAfter(doc, next) {
    console.log('New User Created and Saved to the Database.\n', doc);
    next();
}

async function triggerUserBefore(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
}

async function login(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password.");
    }
    throw Error("Incorrect Email.");
}

const userStructure = {
    email: {
        type: String,
        required: [true, "Please, enter an e-mail."],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please, enter a valid e-mail."]
    },
    password: {
        type: String,
        required: [true, "Please, enter a password."],
        minlength: [8, "The password should be at least 8 characters long."]
    }
};

const opt = {
    timeStamps: true
}

const userSchema = new Schema(userStructure, opt);

// trigger before
userSchema.pre('save', triggerUserBefore);

// trigger after
userSchema.post('save', triggerUserAfter);

userSchema.statics.login = login;

const User = mongoose.model("User", userSchema);

module.exports = User;