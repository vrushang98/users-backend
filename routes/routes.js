
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/isAuthenticated');
function initRoutes(app)
{



    // Login Route
    app.post('/login',(req,res)=>{


        const {email,password} = req.body;

        console.log(email);
        console.log(password);
        User.findOne({email:email}).then(user=>{

            if(!user)
            {
                return res.status(500).send('Unknown User');
            }
            const match = bcrypt.compareSync(password,user.password);

            if(!match)
            {
                return res.status(500).send('Invalid Credentials');
            }

            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:86400});
            console.log(token);

            res.status(200).send({
                first_name:user.first_name,
                last_name:user.last_name,
                email:user.email,
                accessToken : token,
                role:user.role
            });


        })
    });


    //List Users with Middleware
    app.get('/show_user',isAuthenticated,(req,res)=>{

        User.find()
        .select("-password -__v")
        .then(data=>{
            res.status(200).send(data);
        })
    });


    //Add New User with Middleware
    app.post('/add_user',isAuthenticated,(req,res)=>{


        const {first_name,last_name,email,dob,role,city,state} = req.body;


        const user = new User({
            first_name,
            last_name,
            email,
            password:bcrypt.hashSync("123456",12),
            dob,
            role,
            city,
            state
        });

        
        user.save((err,data)=>{
            if(err)
            {
                return  res.status(500).send({error:'Something Went wrong try after some time'});
            }

            return res.status(200).send({message:'User added successfully'});

        });
        // user.save((err,res)=>{
        //     if(err)
        //     {
        //         console.log('Error in adding User');
        //         // 
        //     }

        //    


        // });
    });



  

}

module.exports=initRoutes;