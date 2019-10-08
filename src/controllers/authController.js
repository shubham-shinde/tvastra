import config from '../../config';
import * as errMsg from "../common/errMsg";
import crypticServices from '../services/crypticServices';
import userModelServices from '../services/userModelServices';
import { USERID } from '../common/variables';

export const get_register = (req, res, next) => res.render("register");
export const get_signin = async (req, res, next) => res.render("signin");

export const post_register = async (req, res, next) => {
    const {name, email, password, role } = req.body;
    if(!name || !email || !password || !role)  return res.end();
    try{
        const _user = {
            name, email, password, role
        };
        const new_user = await userModelServices.add(_user);
        res.redirect('/auth/signin');
        return res.end();
    }catch(err){
        console.log('[err]',err);
        res.redirect('/auth/register');
        return res.end();
    }
}

export const post_signin = async (req, res, next) => {
    const {email, password } = req.body;
    //validate mail everywhere
    if( !email || !password ) return res.end();
    try{
        const new_user = await userModelServices.getByEmail({email});
        const is_pass_true = await crypticServices.verify({hash : new_user.password, password : password});
        if(!is_pass_true){
            return res.end();
        }
        req.session[USERID] = new_user._id;
        res.redirect('/');
        return res.end();
        
    }catch(err){
        console.log('[err]',err);
        res.redirect('/auth/signin');
        return res.end();
    }
}

export const signout = async (req, res, next) => {
    req.session[USERID] = '';
    res.clearCookie(config.TOKEN);
    res.redirect('/auth/signin');
    res.end();
}
