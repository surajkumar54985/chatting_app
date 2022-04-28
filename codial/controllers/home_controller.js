const Post = require("../models/post");

const User = require('../models/user');

// module.exports.home = function(req,res){
//     //console.log(req.cookies);
//     //res.cookie('user_id' , 25);
//     return res.render('home' , {
//         title :"codial | Home",
//     });
// }

/*module.exports.home = function(req,res){
    User.find({})
    .populate('user')
    .exec(function(err , users){

        User.find({} , function(err,users){
            return res.render('home' , {
                title: "codial | Home",
                all_users: users
            });
        });
        
    })
}*/

module.exports.home = async function(req,res){
    try{
        //populate the user of each post
        let posts = await Post.find({})
        .sort('_createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({}).populate('user');


        // let curr_user = User.findById(req.params.id , function(err,user){
        //     return res.render('home',{
        //         title: 'User Profile',
        //         user: user
        //     });
        // });

        let curr_user = User.findById(req.params.id , function(err,profile_user){
            return res.render('home',{
                title: 'User Profile',
                profile_user: profile_user
            });
        });



        return res.render('home', {
            title: "codial|home",
            posts: posts,
            all_users: users,
            curr_user: curr_user.schema.statics.avatarPath
        });
    }catch(err) {
        console.log('Error',err);
        return;
    }
}

//module.exports.actionName = function(){}