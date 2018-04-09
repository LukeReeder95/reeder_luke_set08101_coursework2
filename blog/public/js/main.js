$(document).ready(function(){
    $('.deletePost').on('click', deletePost);
});

$(document).ready(function(){
    $('.editTitle').on('click', editTitle);
});

$(document).ready(function(){
    $('.editPost').on('click', editPost);
});


function deletePost(){
    var confirmation = confirm('Are you sure you wish to delete the post?');

    if(confirmation){
        $.ajax({
            type:'DELETE',
            url: '/posts/delete/'+$(this).data().id
        }).done(function(response){
            window.location.replace('/viewPosts');
        });
        window.location.replace('/viewPosts');
    } else {
        return false;
    }
}

function editTitle(){
    var confirmation = confirm('Would you like to edit the post title?');

    if(confirmation){
      var amend = prompt('What would you like the new post title to be?', '');
      while(amend.trim() === "" || amend === null){
          alert("Input is not valid, please enter a new title");
          var amend = prompt('What would you like the new post title to be?', '');
      }
          $.ajax({
              type:'PUT',
              url: '/posts/update/'+$(this).data().id,
              data: {title: amend}
          }).done(function(response){
              console.log(response);
              window.location.replace('/viewPosts');
          });
      } else {
          return false;
      }
  }

function editPost(){
      var confirmation = confirm('Would you like to edit the post?');

      if(confirmation){
        var amend = prompt('What would you like the new post title to be?', '');
        while(amend.trim() === "" || amend === null){
            alert("Input is not valid, please enter a new title");
            var amend = prompt('What would you like the new post title to be?', '');
        }
          $.ajax({
              type:'PUT',
              url: '/posts/update/'+$(this).data().id,
              data: {blogpost: amend}
          }).done(function(response){
              console.log(response);
              window.location.replace('/viewPosts');
          })
      }
  }
