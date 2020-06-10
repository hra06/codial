const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
        });

    return res.json(200,{
        message: "List of Posts",
        posts: posts
    });

}



module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);

         // .id means converting ObjectId into string
        // if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post:req.params.id});

            

            return res.json(200,{
                message:"Post and associated commetns deleted successfully"
            });

            // req.flash('success','post DELETED successfully')
            // return res.redirect('back');
        // }else{
            
        //     req.flash('error','error in DELETING post ---> ')
        //     return res.redirect('back');
        // }

    } catch (err) {
        console.log(err)
        return res.json(500,{
                message:"Internal Server Error"
            });      
    }
    
}