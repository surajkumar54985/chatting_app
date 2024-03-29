const Comment = require('../models/comments');
const Post = require('../models/post');

const { post } = require('../routes');


// module.exports.create = function(req,res){
//     Post.findById(req.body.post , function(err,post){

//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err,comment){
//                 //handle error

//                 post.comments.push(comment);
//                 post.save();
//                 req.flash('success','Successfully commented!');
//                 res.redirect('back');
//             });
//         }
//     });
// }

module.exports.create = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);

            if(post){
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });

                if(req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment:comment
                        },
                        message: "Successfully Commented!"
                    });
                }

                post.comments.push(comment);
                post.save();
                req.flash('success','Successfully commented!');
                res.redirect('back');

            };
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}

// module.exports.destroy = async function(req,res){
//     Comment.findById(req.params.id , function(err,comment){
//         //.id means converting the object id into string
//         if(comment.user == req.user.id){
//             let postId = comment.Post;
//             comment.remove();
            
//             Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}} , function(err,post){
//                 req.flash('success','comment deleted!');
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.Post;
            comment.remove();
            
            let post = Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id}} , function(err,post){
                req.flash('success','comment deleted!');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return;
    }
}