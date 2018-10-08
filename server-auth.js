const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.use('/auth/*', bodyParser.json());
router.use('/auth/*', bodyParser.urlencoded({ extended: true }));

let lastUserId = 0;
let users = [
    { id: "0", username: "a", password: "b" }
];

function isNullOrWhitespace(str){
    return str == null || str.match(/^ *$/) !== null;
}

router.post('/auth/login', (req, res) => {
    const expiresTime = 129600;
    const { username, password } = req.body;
    for (let user of users) {
        if (user.username == username && user.password == password) {   /* todo: hash password */
            let token = jwt.sign({ id: user.id, username: user.username }, 'mysecretkey', { expiresIn: expiresTime });
            res.status(200).json({
                idToken: token,
                expiresIn: expiresTime
            });
            return;
        }
    }
    res.sendStatus(401);
});

router.post('/auth/signup', (req, res) => {
    const { username, password } = req.body;
    if (isNullOrWhitespace(username) || isNullOrWhitespace(password)) {
        res.statys(400).json("fail");
        return;
    }
    for (let user of users) {
        if (user.username == username) {
            res.status(409).json("fail");
            return;
        }
    }
    let user = { id: ++lastUserId, username: username, password: password };
    users.push(user);
    res.status(200).json("success");
});

function makePassword() {
    var text = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += chars.charAt(Math.floor(Math.random() * chars.length));
  
    return text;
  }

router.post('/auth/get-password', (req, res) => {
    const { username } = req.body;
    for (let user of users) {
        if (user.username == username) {   /* todo: hash password */
            let password = makePassword();
            user.password = password;
            res.status(200).json( {password: password} );
            return;
        }
    }
    res.sendStatus(400);
});

module.exports = router;