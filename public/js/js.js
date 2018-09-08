//the user logs in and his data is authenticated, then it goes into the database, a get request is ran on document ready and then his id is put into req.params.

//We need a POST to run if the user isn't already in the system on log in and if he is, we need to simply pull his data with a GET instead

//He is then given the current prompt with buttons to create buttons, but he can also create threads. His threads will be their own table, and on creation a id will be given to the element as a data attribute.

//Each application will run with the current logic to route to an edit link, but it will use if logic to check if this user is authorized to edit this post. If not, it will run an error or display something, but it will hard lock either way.

//Each class can only have one message, but users can have many messages as they want as long as they are in different classes. So one way of doing that would be to check all posts in a thing for a message id, but that's really inefficient, though it would work.

//Another way would be to make a table association, where the table has an iD that can be checked against the existence of a message, that is reset to 0 if a message is deleted. (This would be instrinsic to the above method, since the data element would be removed.)

$(document).ready(function () {

    


    $.get('/api/users', function (response) {
        console.log('ENTRIES BELOW');
        console.log(response);

        //This appends the data from the db to the front page on page load
        for (i = 0; i < response.length; i++) {
            $('.target').append(`<div > My name is ${response[i].name} and my email is ${response[i].email}. </div>`);
            $('.target').append(`<button class = "editButton" data-id = ${response[i].userid}> EDIT POST </div>`);
            $('.target').append('<br>');
        }
    })

    $('#filterNames').on('click', function () {

        //event listener variables can't take things from outside the listener
        $.get('/api/users/updatenames', function (response) {
            console.log('Updating with filters');
            console.log(response);

            $('.target').empty();
            //This appends the data from the db to the front page on page load
            for (j = 0; j < response.length; j++) {
                let jj = j;
                console.log(response.length);
                console.log(jj);
                console.log(response[jj].name);

                //It only puts in the latest entry despite the fact that the loop is working
                
                $('.target').append(`<div > My name is ${response[jj].name} </div>`);
                $('.target').append(`<button class = "editButton" data-id = ${response[jj].userid}> EDIT POST </div>`);
                $('.target').append('<br>');
            }
        })
    });

    $('#filterEmail').on('click', function () {

        //event listener variables can't take things from outside the listener
        //event listener variables can't take things from outside the listener
        $.get('/api/users/updateemail', function (response) {
            console.log('Updating with filters');
            console.log(response);

            $('.target').empty();
            //This appends the data from the db to the front page on page load
            for (j = 0; j < response.length; j++) {
                let jj = j;
                console.log(response.length);
                console.log(jj);
                console.log(response[jj].name);

                //It only puts in the latest entry despite the fact that the loop is working
                
                $('.target').append(`<div > My email is ${response[jj].email} </div>`);
                $('.target').append(`<button class = "editButton" data-id = ${response[jj].userid}> EDIT POST </div>`);
                $('.target').append('<br>');
            }
        })
    })








    $('#createPost').on('click', function () {

        //event listener variables can't take things from outside the listener
        var postObject = {
            name: $(".name").val(),
            id: $(".id").val(),
            email: $('.email').val()
        }
        $.post('/api', postObject, function (err, response) {
            console.log('Response below');
            console.log(response);
            //the code that will put the object up on the front page
        })
    })

    







})




window.fbAsyncInit = function () {
    FB.init({
      appId: '859826360873812',
      cookie: true,
      xfbml: true,
      version: 'v3.1'
    });
  
    //checks if someone is logged in by calling statusChangeCallback
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  
  };
  
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  //the function that checks if someone is logged in
  function statusChangeCallback (response){
    if (response.status === 'connected'){
      console.log('Your logged in!');
      console.log(response);
      setElements(true);
      testAPI();

      //put our on creation logic here, do req.params with the id from the testAPI response, so probably just run this in testAPI
      
    }
    else {
      console.log ('Not authenticated');
      setElements(false);
    }
  }
  
  //checks the login state from the event handler on the front end index page
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  //function for showing the login button contingent on whether someone is already logged in or not
  
  function setElements(isLoggedIn){
    if (isLoggedIn){
      console.log('Is logged in!');
      event.preventDefault();
      
      $('#logout').show();
      $('#fbbutton').hide();
    }
    else {
      console.log('Is not logged in!');
      $('#logout').hide();
      $('#fbbutton').show();
    }
  }
  
  //function for logging out called inline
  
  $('#logout').on('click', function (){
    FB.logout(function(response){
        setElements(false);
      })
  })
  
  
  function testAPI (response) {
    FB.api('/me?fields=name,email', function (response){
      if (response && !response.error){
        console.log(response); //the response which has the keys with the data

        var postObject = {
            id: response.id,
            name: response.name,
            email: response.email
                   
        }

        console.log('POST OBJECT BELOW!');
        console.log(postObject);

        $.post('/api', postObject, function (err, response) {
            console.log('Response below');
            console.log(response);
            //the code that will put the object up on the front page
            window.location.href = `/index/${postObject.id}`
        })

        // var param = response.id;
      }
    })
  
  }









$(document).on('click', '.editButton', function () {
    console.log('I am clicked');
    console.log($(this).attr('data-id'));
    var id = $(this).attr('data-id');
    window.location.href = "/edit/" + id;

})



$('#editComplete').on('click', function () {
    var url = window.location.href;
    console.log(url);
    var postId = url.split("edit/")[1];
    console.log(postId);

    var update = {
        userid: postId
    }

    // $.put(`/api/update/${postId}`, function (response){
    //     console.log(response);
    //     console('I got a response');
    // })

    $.ajax({
        method: "PUT",
        url: '/api/update',
        data: update
    })
        .then(function () {
            //   window.location.href = "/blog";
            console.log('I got a response');
        });
})







