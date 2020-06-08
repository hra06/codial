const User = require('../models/user')

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status1(401).send('Unauthorized!');
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codial|SignUp'
    });
}

module.exports.SignIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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


module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','Logged Out Successfully');

    return res.redirect('/');
}