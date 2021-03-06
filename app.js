let express = require('express');
let cookieParser = require('cookie-parser');
let indexRouters = require('./routers/router.index');
let wxRouters = require('./routers/router.wx');
let app = express();

app.use(cookieParser());
app.use(function (err, req, res, next) {
	console.log('错误捕捉')
	res.status(500).send('error');
});
app.get('/', function (req, res) {
	res.send('test123');
});
app.use('/wx', wxRouters);

app.use('/index', indexRouters);
app.get('/baidu', function (req, res) {
	res.redirect('http://www.baidu.com');
});
var data = {a: 100,b:200};
app.get('/data', function (req, res) {
	console.log(req);
	res.json(data);
});

app.listen(80);