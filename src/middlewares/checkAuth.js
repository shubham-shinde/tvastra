import { USERID } from "../common/variables";

const checkAuth = (req, res, next) => {
    if( req.session[USERID] ){ 
        next();
    }else{
        res.redirect('/auth/signout');
    }
}

export default checkAuth;