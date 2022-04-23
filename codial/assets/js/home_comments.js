// {
//     //method to submit the form data for new Comment using ajax
//     let create = function() {
//         let newCommentForm = $('#new-comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: 'comments/create',
//                 data:newCommentForm.serialize(),
//                 success:function(data) {
//                     console.log(data);
//                 }, error: function(error) {
//                     console.log(error.responseText);
//                 }
//             });

//         });

//     }

//     //method to create Comment in dom

//     create();
// }


class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newComment = $(`#post-${postId}-comments-form`);

        this.createC
    }
}