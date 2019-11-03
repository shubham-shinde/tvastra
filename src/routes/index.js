import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import identifyUser from '../middlewares/identifyUser';
import path from 'path';
import { rootPath } from '../common/rootPath';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res, next) => res.render( "index" ) );
router.get('/doctors',  userController.getDoctor );
router.get('/hospitals',  (req, res, next) => res.render( "hospitals" ) );
router.get('/treatments',  (req, res, next) => res.render( "treatments" ) );
router.get('/services',  (req, res, next) => res.render( "services" ) );

router.get('/admin',  (req, res, next) => res.render( "admin" ) );
router.post('/admin/doctor', userController.addDoctor );
    
module.exports = router;

