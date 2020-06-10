const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        console.log('Hello server')
        let user = await User.findOne({email:req.body.email}); 
        console.log(user)  
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid Email or Password"
            });
        }

        return res.json(200,{
            message: "SingIn is Successful here is your token please keep it safe!",
            data:{
                token: jwt.sign(user.toJSON(), 'codial', {expiresIn: '100000'})
            }
        })
    } catch (err) {
        console.log(err);
        return res.json(500,{
            message: "Internal Server Error"
        })
        
    }    
}
