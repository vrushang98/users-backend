require('dotenv').config();
const express = require('express');
const app=express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const routes = require('./routes/routes');
const cors = require('cors');


// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// DB Configs
mongoose.connect(process.env.MONGO_URL,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false});
const connection = mongoose.connection;
connection.once('open',(err,resp)=>{
    console.log('DB Connected');
    initial();
});


// Initial Admin User for login
function initial()
{


    User.findOne({email:'johndoe@gmail.com'}).then(user=>{
        if(!user)
        {
            const user = new User({
                first_name:'John',
                last_name:'Doe',
                email:'johndoe@gmail.com',
                password:bcrypt.hashSync('123456',12),
                dob:'12-12-1998',
                role:'admin',
                city:'Ahmedabad',
                state:'Gujarat'
        
            });
        
            user.save((err,res)=>{
                if(err)
                {
                    console.log('User not saved');
                }

                console.log('Default Admin User is created');
            });
        }
    });
    
}





// cors
app.use(cors());


//Intializing routes
routes(app);


//Server Listening
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
});





