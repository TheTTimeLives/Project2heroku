//the user logs in and his data is authenticated, then it goes into the database, a get request is ran on document ready and then his id is put into req.params.

//He is then given the current prompt with buttons to create buttons, but he can also create threads. His threads will be their own table, and on creation a id will be given to the element as a data attribute.

//Each application will run with the current logic to route to an edit link, but it will use if logic to check if this user is authorized to edit this post. If not, it will run an error or display something, but it will hard lock either way.

//Each class can only have one message, but users can have many messages as they want as long as they are in different classes. So one way of doing that would be to check all posts in a thing for a message id, but that's really inefficient, though it would work.

//Another way would be to make a table association, where the table has an iD that can be checked against the existence of a message, that is reset to 0 if a message is deleted. (This would be instrinsic to the above method, since the data element would be removed.)

$(document).ready(function () {
    

    $('#editComplete').on('click', function () {

        console.log("Post Objects logging below!");

        console.log($(this).parent().find('#mynameEntry').val());
        console.log($(this).parent().find('#messageEntry').val());
        console.log($(this).parent().find('#ratingEntry').val());
        console.log($(this).parent().find('#buybookEntry').val());
        console.log($(this).parent().find('#sellbookEntry').val());

        var url = window.location.href;
        console.log(url);
        var postId = url.split("editroute/")[1];
        var postedId = postId.split('/')[1];
        console.log(postId);
        console.log(postedId);

        var update = {
            name: $(this).parent().find('#mynameEntry').val(),
            message: $(this).parent().find('#messageEntry').val(),
            rating: $(this).parent().find('#ratingEntry').val(),
            textbookSale: $(this).parent().find('#sellbookEntry').val(),
            textbookBuy: $(this).parent().find('#buybookEntry').val(),
            classid: $(this).attr('data-id') //this is the only thing that is working for any post other than the first elements post
        }

        window.location.href = '/index'

    })

        // var update = {
        //     name: $(".name").val(),
        //     email: $('.email').val(),
        //     userid: postId
        // }

    //     $.ajax({
    //         method: "PUT",
    //         url: '/api/update',
    //         data: update
    //     })
    //         .then(function () {
    //             //   window.location.href = "/blog";
    //             console.log('I got a response');
    //         });
    // })

    $(document).on('click', '#createMessage', function () {
        //event listener variables can't take things from outside the listener

        

       
        console.log(postObject);
        console.log('THIS data-id below');
        console.log($(this).attr('data-id'));

        $.post('/messages', postObject, function (err, response) {
            console.log('Response message');
            console.log(response);
            //the code that will put the object up on the front page
        })

    })












    $('#destroyComplete').on('click', function () {
        console.log('I am clicked');
        var url = window.location.href;
        console.log(url);
        var postId = url.split("edit/")[1];
        console.log(postId);
    
        var update = {
            userid: postId
        }
    
        $.ajax({
            method: "DELETE",
            url: `/api/delete/${postId}`,
        })
            .then(function () {
                //   window.location.href = "/blog";
                console.log('I got a response');
            });
    })

    window.location.href = '/index'
    


})







