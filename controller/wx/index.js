const Axios = require('axios');
const fs = require('fs');
const config = require('../../config');

class Wx {
    constructor() {
        this.tokenLoaded = true;
        this.token = [];
        this.pageAuthTokenLoaded = true;
        this.pageAuthToken = [];
    }
    getTokenFromNet() {
        this.tokenLoaded = false;
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`
        return Axios.get(url);
    }
    getAuthTokenFromNet(code) {
        this.tokenLoaded = false;
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`
        return Axios.get(url);
    }
    async getToken() {
        let _this = this;
        console.log(JSON.stringify(_this.token));
        // 有token且未过期
        if (this.token.length && ((+Date.now() - this.token[0].createTime) <= 6000000 || !this.tokenLoaded)) {
            return this.token[0].token;
        }
        let data = await this.getTokenFromNet();
        this.token.push({
            token: data.data.access_token,
            createTime: +Date.now()
        });
        if (this.token.length > 1) {
            this.token.shift();
        }
        this.tokenLoaded = true;
        return data.data.access_token;
    }
    async getAuthToken(code) {
        let _this = this;
        let data = await this.getAuthTokenFromNet(code);
        let authInfo = data.data;
        return authInfo;
    }
    auth(url) {

    }
}

module.exports = Wx;