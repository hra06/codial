{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data.data.post);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    // Clear the textArea
                    // let textArea = $('#post-area');
                    // textArea.val('');
                    // $('#post-area').val('');

                    // Noty Added Successfully
                    new Noty({
                        theme:'relax',              
                        text: 'Post Created Successfully',
                        type:'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                    deletePost($(' .delete-post-button', newPostDom));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delte the post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    
                    // Delete Post Noty
                    new Noty({
                        theme:'relax',              
                        text: 'Post Deleted Successfully',
                        type:'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();


    let deletePostLoaded = function(){
        let loadedDeleteButton = $('.delete-post-button');
        
        loadedDeleteButton.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'GET',
                url: $('.delete-post-button').prop('href'),
                success:function(data){
                    $(`#post-${post._id}`).remove();
                    
                    // Delete Post Noty
                    new Noty({
                        theme:'relax',              
                        text: 'Post Deleted Successfully',
                        type:'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    deletePostLoaded();
}