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
        let workexperience = req.query.workexperience;
        if(workexperience && workexperience instanceof Array) {
            workexperience = workexperience.map(e => Number(e));
            workexperience = Math.min(...workexperience);
        }
        console.log({ role : "doctor", ...req.query, workexperience: { $gte : workexperience || 0 }});
        
        const doctors = await User.find({ role : "doctor", ...req.query, workexperience: { $gte : workexperience || 0 }});       
        // console.log('doctors====', doctors);
        // console.log(doctors);
        return res.render('doctors', {doctors});
    }catch(err){
        console.log('[err]: ', err);
        return res.redirect('/');
    }
}