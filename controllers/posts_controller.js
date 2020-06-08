const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function(req,res){
    
    try {
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){
        // post = await post.populate('user', 'name').execPopulat();
            // yeh apko next videos mein seekhayenge sir yeh command ke throu
            //  zxhr reqb send hota hai a ajx mein then phir user populate krvaya padta hai <Ek min
            // Object Object show rha h na
            // Yha to page load hi nhi ho rha.....
            return res.status(200).json({
                data:{
                    post:post
                },
                messages:"Post Created!"
            })
        }

        req.flash('success','Post Created Successfully');
        return res.redirect('back');
    } catch (err) {
        req.flash('error','error in creating post ---> ');
        return res.redirect('back');
    }
    
    
}


module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);

         // .id means converting ObjectId into string
        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','post DELETED successfully')
            return res.redirect('back');
        }else{
            
            req.flash('error','error in DELETING post ---> ')
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');       
    }
    
}


// module.exports.destroy = async function(req, res){

//     try{
//         let post = await Post.findById(req.params.id);

//         if (post.user == req.user.id){
//             post.remove();

//             await Comment.deleteMany({post: req.params.id});

//             req.flash('success', 'Post and associated comments deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'You cannot delete this post!');
//             return res.redirect('back');
//         }

//     }catch(err){
//         req.flash('error', err);
//         return res.redirect('back');
//     }
    
// }