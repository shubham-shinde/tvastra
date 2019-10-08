var express = require('express');
var router = express.Router();
import * as authController from '../controllers/authController';
import { USERID } from '../common/variables';

const redirectHome = (req, res, next) => {
    if(req.session[USERID]) return res.redirect('/');
    return next();
}

router.get('/register', redirectHome, authController.get_register );
router.post('/register', authController.post_register );

router.get('/signin', redirectHome, authController.get_signin );
router.post('/signin', authController.post_signin );

router.get('/signout', authController.signout );
router.post('/signout', authController.signout );

module.exports = router;
