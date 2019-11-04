import userModelServices from '../services/userModelServices';
import User from '../models/userModel';

export const addDoctor = async (req, res, next) => {
    const {name, email, password, role, specialisation, listoftreatment, 
        workexperience, qualification, awards, location, avgfees, hospital} = req.body;

    if(!name || !email || !password || !role || !specialisation || !listoftreatment || 
    !workexperience || !qualification || !awards || !location || !avgfees || !hospital ){
        res.redirect('/admin')
        res.end();
    }
    const _user = {
        name, email, password, role, specialisation, listoftreatment, 
        workexperience, qualification, awards, location, avgfees, hospital
    }
    try{
        const new_user = await userModelServices.add(_user);
        res.redirect('/doctors');
        res.end();
    }catch(err){
        console.log('[err]: ', err);
        res.redirect('/admin')
    }
}

export const getDoctor = async (req, res, next) => {
    try{
        const doctors = await User.find({ role : "doctor" });
        console.log(req.query);
        
        // console.log('doctors====', doctors);
        // console.log(doctors);
        return res.render('doctors', {doctors});
    }catch(err){
        console.log('[err]: ', err);
        return res.redirect('/');
    }
}