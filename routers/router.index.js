let express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
	console.log('我是中间件');
	next();
});

router.get('/', function (req, res) {
	res.json({
		a: 100,
		name: 'mawenjie'
	});
});
router.get('/test', function (req, res) {
	res.send('index/test')
});

module.exports = router;