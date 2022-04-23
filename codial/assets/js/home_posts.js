    {

    //method to submit the form data for new post using ajax
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/createPost',
                data:newPostForm.serialize(),
                success:function(data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // console.log(data);
                }, error: function(error) {
                    console.log(error.responseText);
                }
            });

        });

    }


    //method to delete the form data for new post using ajax

    // method to create post in dom
    let newPostDom = function(post){
        // console.log(post);
        return $(`<li id="post-${post._id}" style="display:inherit">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
            </small>
            ${ post.user.name }
            <br>
            ${ post.content }
        </p>
        
    </li>`)
    }

    // method to delete the post from dom

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}

$( '.friend-drawer--onhover' ).on( 'click',  function() {
  
    $( '.chat-bubble' ).hide('slow').show('slow');
    
  });