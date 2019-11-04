import User from '../models/userModel';
import { promisify } from 'util';
import * as errMsg from '../common/errMsg';
import crypticServices from '../services/crypticServices';

const addUser = async (props, cb) => {
    const {name, email, password, role} = props;
    try{
        if(!name || !email || !password || !role) throw errMsg.INVALID_ARGUMENTS;

        if(role === "doctor"){
            const { specialisation, listoftreatment, 
            workexperience, qualification, awards, 
            location, avgfees, hospital } = props;

            if(!specialisation || !listoftreatment || 
            !workexperience || !qualification || !awards || !location || !avgfees || !hospital ){
                throw errMsg.INCOMPLETE_ARGUMENTS;
            }
            const passHash = await crypticServices.cyptify({password});
            const _user = {
                name , email, password : passHash, role, 
                specialisation, listoftreatment, 
                workexperience, qualification, awards, location, avgfees, hospital
            };
            const _new_user = new User(_user);
            const new_user = await _new_user.save();
            return cb(null, new_user);
        }

        const passHash = await crypticServices.cyptify({password});
        const _user = {
            name , email, password : passHash, role
        };
        const _new_user = new User(_user);
        const new_user = await _new_user.save();
        return cb(null, new_user);
    }catch(err){
        return cb(err);
    }
}

const getUserById = async ( {id}, cb) => {
    try{
        if(!id) throw errMsg.INVALID_ARGUMENTS;
        const user = await User.findById(id);
        if(!user) throw "No user found";
        return cb(null, user);
    }catch(err){
        return cb(err);
    }
}
const getUserByEmail = async ({email}, cb) => {
    try{
        if(!email) throw errMsg.INVALID_ARGUMENTS;
        const user = await User.findOne({email});
        if(!user) throw "No user found";
        return cb(null, user);
    }catch(err){
        return cb(err);
    }
}

const updateUser = async ({data}, cb) => {
    // do something to update user
}

const userModelServices = {
    add : promisify(addUser),
    getById : promisify(getUserById),
    getByEmail : promisify(getUserByEmail),
    update : promisify(updateUser)
};
export default userModelServices;