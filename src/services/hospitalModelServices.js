import Hospital from '../models/hospitalModel';
import { promisify } from 'util';
import * as errMsg from '../common/errMsg';
import crypticServices from '../services/crypticServices';

const addHospital = async (props, cb) => {
    const {name, email, password, role} = props;
    try{
        if(!name || !email || !password || !role) throw errMsg.INVALID_ARGUMENTS;

        if(role === "hospital"){
            const {  listoftreatment,  
            location, beds } = props;

            if( !listoftreatment ||  !location || !beds ){
                throw errMsg.INCOMPLETE_ARGUMENTS;
            }
            const passHash = await crypticServices.cyptify({password});
            const _hospital = {
                name , email, password : passHash, role,  listoftreatment,  location, beds
            };
            const _new_hospital = new Hospital(_hospital);
            const new_hospital = await _new_hospital.save();
            return cb(null, new_hospital);
        }

        const passHash = await crypticServices.cyptify({password});
        const _hospital = {
            name , email, password : passHash, role
        };
        const _new_hospital = new Hospital(_hospital);
        const new_hospital = await _new_hospital.save();
        return cb(null, new_hospital);
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

const hospitalModelServices = {
    add : promisify(addHospital),
    getById : promisify(getUserById),
    getByEmail : promisify(getUserByEmail),
    update : promisify(updateUser)
};
export default hospitalModelServices;