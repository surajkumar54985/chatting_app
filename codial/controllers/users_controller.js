const User = require('../models/user');

const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res){
    return res.render('user_profile' , {
             title : 'User Profile'
         });
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body , function (err,user){
    //     return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
   
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****Multer Error: ' , err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path of uploaded file into the avtar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                //console.log(req.file);
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error' , 'Unauthorised!');
        return res.status(401).send('Unauthorised');
    }
}

module.exports.profile_user = function(req,res){
    User.findById(req.params.id , function(err,user){
        return res.render('profile_user',{
            title: 'User Profile',
            profile_user: user
        });
    });
    // return res.render('user_profile' , {
    //     title : 'User Profile'
    // })


    /*if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id , function(err,user){
            if(user)
            {
                return res.render('user_profile' , {
                    title: "User Profile",
                    user:user
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }*/
    
}

// module.exports.posts = function(req,res){
//     return res.render('posts' , {
//         title : "codial | posts"
//     })
//     //res.end('<h1> User posts! </h1>')
// }

//render the signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up' , {
        title: "codial | Sign Up"
    })
}

//render the signin page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in' , {
        title :"codial | sign In"
    })
}

//get the signup data

module.exports.create = function(req,res){
    req.flash('success' , 'signed up successfully!');
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email : req.body.email} , function(err,user){
        if(err)
        {
            console.log('error in finding user while signing up');
            return;
        }
        if(!user)
        {
            User.create(req.body , function(err,user){
                if(err)
                {
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    });
    
}

//authentication using passport js

module.exports.createSession = function(req,res){
    req.flash('success' , 'Logged in successfully!');
    //TODO
    return res.redirect('/');
}

//get the signin data

/*module.exports.createSession = function(req,res){
    //find the user

    User.findOne({email: req.body.email} , function(err,user){
        if(err)
        {
            console.log('Error in finding user in signing in');
            return;
        }

        //handle user found
        if(user)
        {
            //handle mismatching of password
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id' , user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            //handle user not found
            return res.redirect('back');
        }


    });
    

    

    

}*/

// module.exports.createSession = function(req,res){
//     return res.redirect('/');
// }

// module.exports.destroySession = function(req,res){

//     if (req.session) {
//         req.session.destroy((err) => {
//           if (err) {
//             next(err);
//           } else {
//             res.clearCookie('connect._id');
//             return res.redirect('/');
//           }
//         });
//       }

//     // res.clearCookie('login_token');
//     // return res.redirect('/');
//     //res.end('<h1> User posts! </h1>')
// }

module.exports.destroySession = function(req,res){
    req.flash('success' , 'Logged out successfully!');
    req.logout();
    return res.redirect('back');
}

