import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import identifyUser from '../middlewares/identifyUser';
import path from 'path';
import { rootPath } from '../common/rootPath';
import * as userController from '../controllers/userController';
import * as hospitalController from '../controllers/hospitalController';

const router = express.Router();

router.get('/', (req, res, next) => res.render( "index" ) );
router.get('/doctors',  userController.getDoctor );
router.get('/hospitals',  (req, res, next) => res.render( "hospitals" ) );
router.get('/treatments',  (req, res, next) => res.render( "treatments" ) );
router.get('/services',  (req, res, next) => res.render( "services" ) );
router.get('/doctor',  (req, res, next) => res.render( "docProfile" ) );
router.get('/hospital',  (req, res, next) => res.render( "hosProfile" ) );

router.get('/admin',  (req, res, next) => res.render( "admin" ) );
router.post('/admin/doctor', userController.addDoctor );

router.get('/adminHospital',  (req, res, next) => res.render( "hospitalAdmin" ) );
router.post('/adminHospital/hospital', hospitalController.addHospital );


    
module.exports = router;

