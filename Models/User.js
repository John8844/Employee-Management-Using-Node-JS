const mongoose = require("mongoose");
const Scheme = mongoose.Schema

const userSchema = new Scheme({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;