const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Codial|SignUp'
    });
}

module.exports.SignIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Codial|SingIn'
    });
}


module.exports.create = function(req,res){
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('There is an error while finding user in sign in! Please try again later');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('There is an error while signing up! Please try again later');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }        
    })
}