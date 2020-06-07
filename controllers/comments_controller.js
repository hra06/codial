// const Comment = require('../models/comment');
// const Post = require('../models/post');


// module.exports.create = function(req,res){
//     Post.findById(req.body.post, function(err,post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post : req.body.post,
//                 user: req.user._id
//             }, function(err,comment){
//                 if(err){
//                     console.log('There is an error while making the comment on the post please try agian later');
//                     return res.redirect('/users/profile');
//                 }

//                 post.comments.push(comment);
//                 post.save();


//                 res.redirect('/');
//             });
//         }
//     });
// }



const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){

    console.log(req.body);

    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                if(err){
                    
                    // console.log('There is an error while making the comment on the post please try agian later');
                    return res.redirect('/users/profile');
                }

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}