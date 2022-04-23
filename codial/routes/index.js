const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

console.log('Router loaded');

router.get('/', homeController.home);

router.use('/users',require('./users'));

router.use('/posts' , require('./post'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

//for any further routes, access it from here.
//router.use('routeName',require('./routerfile'));

module.exports = router;