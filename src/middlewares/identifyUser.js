import userModelServices from '../services/userModelServices';
import { USERID } from '../common/variables';

const identifyUser = async (req, res, next) => {
    try {
        const id = req.session[USERID];
        const _user = await userModelServices.getById({ id });
        if(!_user) throw "No user found";
        req.user = _user;

        return next();
    } catch (err) {

        console.log('Unidentified user!', err);
        res.redirect('/auth/signout');
        res.end();
    }
}

export default identifyUser;