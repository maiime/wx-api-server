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
    if (req.query.url) {
        let redirect_uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${req.query.baseUrl}/getToken&response_type=code&scope=${config.authScope}&state=${req.query.url}#wechat_redirect`;
        res.redirect(redirect_uri);
    }
});
router.get('/auth2', function (req, res) {
    res.redirect(req.baseUrl + '/getToken');
});



module.exports = router;