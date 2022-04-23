const Post = require('../models/post');

const Comment = require('../models/comments');

const User = require('../models/user')
const { post } = require('../routes');

const fs = require('fs');
const path = require('path');



module.exports.posts = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('posts' , {
    //         title :"Posts",
    //         posts : posts
    //     });
    // });

    
    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate: {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        
        return res.render('posts',{
            title : "posts",
            posts: posts
        });
    });
}

module.exports.createPost = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            // postpic: req.files.postpic,
            user: req.user._id
            
        });
        // console.log(post);
        // let post = await Post.create(req,res,function(err){
            
        //     
        //     content: req.body.content,
        //     user: req.user._id

        // });

        // Post.uploadedPost(req,res,function(err){
        //     if(err){
        //         console.log('****Multer Error: ' , err);
        //     }
        //     console.log(req.file);
        //     // user.name = req.body.name;
        //     // user.email = req.body.email;

        //     if(req.file){

        //         if(post.postpic)
        //         {
        //             fs.unlinkSync(path.join(__dirname,'..',post.postpic));
        //         }
        //         //this is saving the path of uploaded file into the avtar field in the user
        //         post.postpic = Post.postPath + '/' + req.file.filename;
        //     }
        //     post.save();
        //     return res.redirect('back');
        //     //console.log(req.file);
        // });


        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post:post
                },
                message: "Post Created!"
            });
        }


        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({post: req.params.id});

        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post is deleted successfully!"
            })
        }

        req.flash('success','Post and Associated comments deleted');
        return res.redirect('back');
    }else{
        req.flash('error','You can not delete this post');
        return res.redirect('back');
    }
    }catch(err){
        req.flash('error',err);
    }
    

    /*Post.findById(req.params.id , function(err,post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.user.id} , function(err)
            {
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });*/
}