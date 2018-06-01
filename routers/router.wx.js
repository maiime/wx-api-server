let express = require('express');
let router = express.Router();
let Wx = require('../controller/wx');
const config = require('../config');
let checkSignature = require('../controller/wx/checkSignature');

const wx = new Wx();

router.get('/checkSignature', function (req, res) {
    if (checkSignature(req)) {
        console.log(req.query);
        res.send(req.query.echostr);
    } else {
        res.send('error');
    }
});

router.get('/getToken', function (req, res) {
    wx.getToken().then(token => {
        res.send(token);
    });
});
/**
 * url 重定向
 */
router.get('/auth', function (req, res) {
    if (req.query.redirect_uri) {
        let redirect_uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${req.protocol}://${req.hostname}${req.baseUrl}/login&response_type=code&scope=${config.authScope}&state=${req.query.redirect_uri}#wechat_redirect`;
        res.redirect(redirect_uri);
    }
});
router.get('/login', function (req, res) {
    let code = req.query.code;
    let redirect_uri = req.query.redirect_uri;
    wx.getAuthToken(code).then(token => {
        res.json(token);
    });
});



module.exports = router;