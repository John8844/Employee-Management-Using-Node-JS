const { error } = require("@hapi/joi");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function(err, hashed) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashed);
                }
            });
        });

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword
        });

        const oldUser = await User.findOne({ email: req.body.email });

        if (!oldUser) {
            const savedUser = await user.save();
            res.json({
                message: "User Registration Successful!",
                user: savedUser
            });
        } else {
            res.json({
                message: "User already exists!"
            });
        }
    } catch (err) {
        res.json({
            message: "An error occurred!",
            error: err
        });
    }
};


const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({$or: [{email: username},{phone: username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let  token = jwt.sign({name: user.name}, 'secretvalue', {expiresIn: '1h'});
                    res.json({
                        message: "Login Successfull!",
                        token
                    })
                }else{
                    res.json({
                        message: "Password doesn't Match!"
                    })
                }
            })
        }else{
            res.json({
                message: "No User Found!"
            })
        }
    })
}




module.exports = {
    register,
    login
};
