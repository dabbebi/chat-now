const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");


const db = require("../models");
const User = db.user;






exports.register = (req, res) => {
    User.findOne({email : req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(403).send({ message: "This email is already used !" });
        }
    });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        } else {
            const user = new User({
                _id: new db.mongoose.Types.ObjectId(),
                name: req.body.firstname + " " + req.body.lastname,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
            user.save((err, user) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                res.status(201).send({ message: "User was registered successfully!"});
            });
        }
    })
};

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, config.secret, { expiresIn: "750h" });

        return res.status(200).send({
            id: user._id,
            email: user.email,
            name : user.firstname + ' ' + user.lastname,
            accessToken: token
        });
    });
};

