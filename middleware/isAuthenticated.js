const jwt = require('jsonwebtoken');
const User = require('../models/User');



// Middleware for authenticating Upcoming requests
const isAuthenticated = (req,res,next)=>{

const {authorization} = req.headers;


const token = authorization.replace("Bearer ","");
if(!token)
{
    return res.status(500).send("Sorry! You are not logged in");
}


const payload = jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
    if(err)
    {
        return res.send("Unauthorized");
    }
    User.findOne({_id:payload.id}).then(user=>{


        console.log(user);
        if(user.role.toLowerCase() == "admin")
        {
            next();
        }
        else
        {
            console.log("ROle not matching");
            return res.send("Unauthorized");
        }
      
    })
    
});



}


module.exports = isAuthenticated;