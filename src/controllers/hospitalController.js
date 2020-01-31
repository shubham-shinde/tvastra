import hospitalModelServices from '../services/hospitalModelServices';
import Hospital from '../models/hospitalModel';

export const addHospital = async (req, res, next) => {
    const {name, email,password, listoftreatment, location, beds} = req.body;

    if(!name || !email || !password || !listoftreatment ||  !location || beds ){
        res.redirect('/adminHospital')
        res.end();
    }
    const _hospital = {
        name, email,password,  listoftreatment,  location, beds
    }
    try{
        const new_hospital = await hospitalModelServices.add(_hospital);
        res.redirect('/hospitals');
        res.end();
    }catch(err){
        console.log('[err]: ', err);
        res.redirect('/adminHospital')
    }
}

export const getHospital = async (req, res, next) => {
    try{
        let workexperience = req.query.workexperience;
        if(workexperience && workexperience instanceof Array) {
            workexperience = workexperience.map(e => Number(e));
            workexperience = Math.min(...workexperience);
        }
        console.log({ role : "hospital", ...req.query, workexperience: { $gte : workexperience || 0 }});
        
        const hospitals = await Hospital.find({ role : "hospital", ...req.query, workexperience: { $gte : workexperience || 0 }});       
        console.log('hospitals====', doctors);
        // console.log(doctors);
        return res.render('hospitals', {hospitals});
    }catch(err){
        console.log('[err]: ', err);
        return res.redirect('/');
    }
}