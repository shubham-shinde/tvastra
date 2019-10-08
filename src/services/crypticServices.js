import { promisify } from 'util';
import * as errMsg from '../common/errMsg';
import bcrypt from 'bcrypt';

const cyptify = async (props, cb) => {
    const {password} = props;
    try{
        if( !password ) throw errMsg.INVALID_ARGUMENTS;
        const hash = await bcrypt.hash( password , 10);

        return cb(null, hash);
    }catch(err){
        return cb(err);
    }
}



const verifyCrypt = async (props, cb) => {
    const {hash, password} = props;
    try{
        if( !hash || !password ) throw errMsg.INVALID_ARGUMENTS;
        const res = await bcrypt.compare(password, hash );
        return cb(null, res);
    }catch(err){
        return cb(err);
    }
}
const crypticServices = {
    cyptify : promisify(cyptify),
    verify : promisify(verifyCrypt)
};
export default crypticServices;