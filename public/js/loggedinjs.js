//the user logs in and his data is authenticated, then it goes into the database, a get request is ran on document ready and then his id is put into req.params.

//He is then given the current prompt with buttons to create buttons, but he can also create threads. His threads will be their own table, and on creation a id will be given to the element as a data attribute.

//Each application will run with the current logic to route to an edit link, but it will use if logic to check if this user is authorized to edit this post. If not, it will run an error or display something, but it will hard lock either way.

//Each class can only have one message, but users can have many messages as they want as long as they are in different classes. So one way of doing that would be to check all posts in a thing for a message id, but that's really inefficient, though it would work.

//Another way would be to make a table association, where the table has an iD that can be checked against the existence of a message, that is reset to 0 if a message is deleted. (This would be instrinsic to the above method, since the data element would be removed.)

$(document).ready(function () {



    $.get('/api/users', function (response) {
        console.log('USERS BELOW');
        console.log(response);

        //This appends the data from the db to the front page on page load
        for (i = 0; i < response.length; i++) {
            $('.target').append(`<div > My name is ${response[i].name} and my email is ${response[i].email}. </div>`);
            $('.target').append(`<button class = "editButton" data-id = ${response[i].id}> EDIT POST </div>`);
            $('.target').append('<br>');
        }
    })

    $.get('/api/classes', function (response) {
        console.log('CLASSES BELOW');
        console.log(response);

        //This appends the data from the db to the front page on page load
        for (i = 0; i < response.length; i++) {

            // $('.targetClass').append(`<br>`);

            $('.targetClass').append(`<li class = 'daddy uk-open' data-id = ${response[i].id}></li>`);




            console.log('LENGTH');
            console.log(response.length);
            console.log('LOOP TO CREATE OUR CLASSES')

            //Is it self appending?

            if (response[i].id == $(`li[data-id =${response[i].id}]`).attr('data-id')) {

                console.log('CONDITIONAL');
                console.log(response[i].id);

                $(`li[data-id =${response[i].id}]`).append(`<a class="uk-accordion-title" href="#">${response[i].subject} ${response[i].courseid} - ${response[i].name} - ${response[i].instructor}</a>`);
                $(`li[data-id =${response[i].id}]`).append(`<div>  </div>`);
                // $(`li[data-id =${response[i].id}]`).append(`<button class = "editButton" data-id = ${response[i].id}> EDIT CLASS </div>`);
                // $(`li[data-id =${response[i].id}]`).append(`<br>`);
                $(`li[data-id =${response[i].id}]`).append(`<form class='sidemargin'> Message <input id = "messageEntry" type="text" placeholder = '...'> Rating <input id = "ratingEntry" type="text" placeholder = '1-5'> Buying Book <input id = "buybookEntry" type="text" placeholder = 'y/n'> Selling Book <input id = "sellbookEntry" type="text" placeholder = 'y/n'> </form>`);
                // $(`li[data-id =${response[i].id}]`).append(`Your Name (autopopulate)`);
                // $(`li[data-id =${response[i].id}]`).append(`<input id = "mynameEntry" type="text">`);
                // $(`li[data-id =${response[i].id}]`).append(`Message`);
                // $(`li[data-id =${response[i].id}]`).append(`<input id = "messageEntry" type="text" placeholder = '...'>`);
                // $(`li[data-id =${response[i].id}]`).append(`Rating`);
                // $(`li[data-id =${response[i].id}]`).append(`<input id = "ratingEntry" type="text" placeholder = '1-5'>`);
                // $(`li[data-id =${response[i].id}]`).append(`Buying Book`);
                // $(`li[data-id =${response[i].id}]`).append(`<input id = "buybookEntry" type="text" placeholder = 'y/n'>`);
                // $(`li[data-id =${response[i].id}]`).append(`Selling Book`);
                // $(`li[data-id =${response[i].id}]`).append(`<input id = "sellbookEntry" type="text" placeholder = 'y/n'>`);
                // $(`li[data-id =${response[i].id}]`).append(`</form>`);
                // $(`li[data-id =${response[i].id}]`);
                $(`li[data-id =${response[i].id}]`).append(`<button id = "createMessage" data-id = ${response[i].id}>POST MESSAGE!</button>`);
                $(`li[data-id =${response[i].id}]`).append(`<div class = "uk-accordion-content"><article class = 'uk-comment uk-comment-primary targetMessages' data-targetId = '${response[i].id}'></article></div>`);
                $(`li[data-id =${response[i].id}]`).append('<br>');
                $(`li[data-id =${response[i].id}]`).append('<br>');

                // console.log($(`div[data-id = ${response[i].id}]`));
            }

            // var classing = $('button[id = createMessage]');
            // console.log(classing);


            // $( "input[value='Hot Fuzz']" ).next().text( "Hot Fuzz" );
            // console.log($( "input[value='Hot Fuzz']" ).next().text( "Hot Fuzz" ));



        }
    })





    $.get('/api/messages', function (response) {


        console.log('MESSAGES BELOW');
        console.log(response);
        console.log("GRABBING ATTRIBUTE BELOW")


        //It's not getting the id the second time
        for (i = 0; i < response.length; i++) {

            // console.log($(this).parent().find('#mynameEntry').val());

            console.log('TEST BELOW!');
            var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
            console.log(tessageid);

            var h = (i + 1);
            console.log('Conditional below');
            console.log('The current array number is...');
            console.log(i);
            console.log('The classid at this array is...');
            console.log(response[i].classid);
            console.log('Below returns a div at data-targetID with this classid');
            var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
            console.log(messageid); //this is undefined, which is why it doesn't populate


            if (response[i].classid == messageid) {
                console.log(`article[data-targetId ='${response[i].classid}']`);

                // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
            }

            //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
            //     <h4 class="uk-comment-title uk-margin-remove">
            //         <a class="uk-link-reset" href="#">Author</a>
            //     </h4>
            //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            //         <li>
            //             <a href="#">12 days ago</a>
            //         </li>
            //         <li>
            //             <a href="#">Reply</a>
            //         </li>
            //     </ul>
            // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            //     </article>


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

    //IT ME

    $('#classFilter').on('click', function () {

        var filter = $('#classFilterEntry').val();
        console.log(filter);

        // event listener variables can't take things from outside the listener
        $.get(`/api/users/updateclass/${filter}`, function (response) {
            console.log('Updating with filters');
            console.log(response);

            $('.targetClass').empty();


            // $('.targetClass').append(`<br>`);

            for (i = 0; i < response.length; i++) {

                // $('.targetClass').append(`<br>`);
    
                $('.targetClass').append(`<li class = 'daddy uk-open' data-id = ${response[i].id}></li>`);
    
    
    
    
                console.log('LENGTH');
                console.log(response.length);
                console.log('LOOP TO CREATE OUR CLASSES')
    
                //Is it self appending?
    
                if (response[i].id == $(`li[data-id =${response[i].id}]`).attr('data-id')) {
    
                    console.log('CONDITIONAL');
                    console.log(response[i].id);
    
                    $(`li[data-id =${response[i].id}]`).append(`<a class="uk-accordion-title" href="#">${response[i].subject} ${response[i].courseid} - ${response[i].name} - ${response[i].instructor}</a>`);
                    $(`li[data-id =${response[i].id}]`).append(`<div>  </div>`);
                    // $(`li[data-id =${response[i].id}]`).append(`<button class = "editButton" data-id = ${response[i].id}> EDIT CLASS </div>`);
                    // $(`li[data-id =${response[i].id}]`).append(`<br>`);
                    $(`li[data-id =${response[i].id}]`).append(`<form class='sidemargin'> Message <input id = "messageEntry" type="text" placeholder = '...'> Rating <input id = "ratingEntry" type="text" placeholder = '1-5'> Buying Book <input id = "buybookEntry" type="text" placeholder = 'y/n'> Selling Book <input id = "sellbookEntry" type="text" placeholder = 'y/n'> </form>`);
                    // $(`li[data-id =${response[i].id}]`).append(`Your Name (autopopulate)`);
                    // $(`li[data-id =${response[i].id}]`).append(`<input id = "mynameEntry" type="text">`);
                    // $(`li[data-id =${response[i].id}]`).append(`Message`);
                    // $(`li[data-id =${response[i].id}]`).append(`<input id = "messageEntry" type="text" placeholder = '...'>`);
                    // $(`li[data-id =${response[i].id}]`).append(`Rating`);
                    // $(`li[data-id =${response[i].id}]`).append(`<input id = "ratingEntry" type="text" placeholder = '1-5'>`);
                    // $(`li[data-id =${response[i].id}]`).append(`Buying Book`);
                    // $(`li[data-id =${response[i].id}]`).append(`<input id = "buybookEntry" type="text" placeholder = 'y/n'>`);
                    // $(`li[data-id =${response[i].id}]`).append(`Selling Book`);
                    // $(`li[data-id =${response[i].id}]`).append(`<input id = "sellbookEntry" type="text" placeholder = 'y/n'>`);
                    // $(`li[data-id =${response[i].id}]`).append(`</form>`);
                    // $(`li[data-id =${response[i].id}]`);
                    $(`li[data-id =${response[i].id}]`).append(`<button id = "createMessage" data-id = ${response[i].id}>POST MESSAGE!</button>`);
                    $(`li[data-id =${response[i].id}]`).append(`<div class = "uk-accordion-content"><article class = 'uk-comment uk-comment-primary targetMessages' data-targetId = '${response[i].id}'></article></div>`);
                    $(`li[data-id =${response[i].id}]`).append('<br>');
                    $(`li[data-id =${response[i].id}]`).append('<br>');
    
                    // console.log($(`div[data-id = ${response[i].id}]`));
                }
    
                // var classing = $('button[id = createMessage]');
                // console.log(classing);
    
    
                // $( "input[value='Hot Fuzz']" ).next().text( "Hot Fuzz" );
                // console.log($( "input[value='Hot Fuzz']" ).next().text( "Hot Fuzz" ));
    
    
    
            }

            $.get('/api/messages', function (response) {


                console.log('MESSAGES BELOW');
                console.log(response);
                console.log("GRABBING ATTRIBUTE BELOW")
        
        
                //It's not getting the id the second time
                for (i = 0; i < response.length; i++) {

                    // console.log($(this).parent().find('#mynameEntry').val());
        
                    console.log('TEST BELOW!');
                    var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
                    console.log(tessageid);
        
                    var h = (i + 1);
                    console.log('Conditional below');
                    console.log('The current array number is...');
                    console.log(i);
                    console.log('The classid at this array is...');
                    console.log(response[i].classid);
                    console.log('Below returns a div at data-targetID with this classid');
                    var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
                    console.log(messageid); //this is undefined, which is why it doesn't populate
        
        
                    if (response[i].classid == messageid) {
                        console.log(`article[data-targetId ='${response[i].classid}']`);
        
                        // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                        $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                        $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                        $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                        $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                        $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                    }
        
                    //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
                    //     <h4 class="uk-comment-title uk-margin-remove">
                    //         <a class="uk-link-reset" href="#">Author</a>
                    //     </h4>
                    //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    //         <li>
                    //             <a href="#">12 days ago</a>
                    //         </li>
                    //         <li>
                    //             <a href="#">Reply</a>
                    //         </li>
                    //     </ul>
                    // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                    //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                    //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    //     </article>
        
        
                }
            })
        })

    });








    // $('#hasRating').on('click', function (){


    // })


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



    $('#createClass').on('click', function () {

        console.log($("#courseIDEntry").val())
        console.log($("#instructorEntry").val())

        //event listener variables can't take things from outside the listener
        var postObject = {
            name: $("#nameEntry").val(),
            courseid: $("#courseIDEntry").val(),
            subject: $('#subjectEntry').val(),
            instructor: $('#instructorEntry').val()
        }

        $.post('/class', postObject, function (err, response) {
            console.log('Response message');
            console.log(response);
            //the code that will put the object up on the front page
        })

        window.location.href = '/index'

    })

    $(document).on('click', '#createMessage', function () {
        //event listener variables can't take things from outside the listener

        console.log("Post Objects logging below!");
        console.log($(this).parent().find('#mynameEntry').val());
        console.log($(this).parent().find('#messageEntry').val());
        console.log($(this).parent().find('#ratingEntry').val());
        console.log($(this).parent().find('#buybookEntry').val());
        console.log($(this).parent().find('#sellbookEntry').val());

        var url = window.location.href;
        console.log(url);
        console.log(url.split("/")[4]);
        var postId = url.split("edit/")[1];
        console.log(postId);

        //CUM HERE

        var postObject = {
            // name: $(this).parent().find('#mynameEntry').val(),
            name: $('#myname').text(),
            message: $(this).parent().find('#messageEntry').val(),
            rating: $(this).parent().find('#ratingEntry').val(),
            textbookSale: $(this).parent().find('#sellbookEntry').val(),
            textbookBuy: $(this).parent().find('#buybookEntry').val(),
            classid: $(this).attr('data-id'), //this is the only thing that is working for any post other than the first elements post
            creator: url.split("/")[4]
        }

        console.log(postObject.creator);
        console.log('THIS data-id below');
        console.log($(this).attr('data-id'));

        $.post('/messages', postObject, function (err, response) {
            console.log('Response message');
            console.log(response);
            //the code that will put the object up on the front page
        })

        window.location.href = '/index'

    })

    //     $(document).on('click', '#hasRating', function () {
    //         //event listener variables can't take things from outside the listener

    // console.log('has rating clicked');

    //     })

    // $(document).on('click', '.createTest', function () {
    //     //event listener variables can't take things from outside the listener
    //     console.log("Test Object logging below!");



    //     // div[data-targetId ='${response[i].classid}']`



    //     // var postObject = {
    //     //     name: $("#mynameEntry").val(),
    //     //     message: $("#messageEntry").val(),
    //     //     rating: $("#ratingEntry").val(),
    //     //     textbookSale: $('#sellbookEntry').val(),
    //     //     textbookBuy: $('#sellbookEntry').val(),
    //     //     classid: $(this).attr('data-id') //this is the only thing that is working for any post other than the first elements post
    //     // }

    //     // console.log(postObject);
    //     // console.log('THIS data-id below');
    //     // console.log($(this).attr('data-id'));

    //     // $.post('/messages', postObject, function (err, response) {
    //     //     console.log('Response message');
    //     //     console.log(response);
    //     //     //the code that will put the object up on the front page
    //     // })

    // })

    // Your Name (autopopulate)
    // <input id = "mynameEntry" type="text"> <!-- Need a classes model. On click this posts a new class and updates the database. The class should have the data that the college system uses. -->
    // Message
    // <input id = "messageEntry" type="text"> <!-- Need a classes model. On click this posts a new class and updates the database. The class should have the data that the college system uses. -->
    // Rating
    // <input id = "ratingEntry" type="text"> <!-- Need a classes model. On click this posts a new class and updates the database. The class should have the data that the college system uses. -->
    // Buying Book 
    // <input id = "buybookEntry" type="text"> <!-- Need a classes model. On click this posts a new class and updates the database. The class should have the data that the college system uses. -->
    // Selling Book 
    // <input id = "sellbookEntry" type="text"> <!-- Need a classes model. On click this posts a new class and updates the database. The class should have the data that the college system uses. -->








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
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Your logged in!');
        console.log(response);
        setElements(true); //changes frontend elements
        testAPI();

        //put our on creation logic here, do req.params with the id from the testAPI response, so probably just run this in testAPI

    }
    else {
        console.log('Not authenticated');
        setElements(false);
    }
}

//checks the login state from the event handler on the front end index page
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

//function for showing the login button contingent on whether someone is already logged in or not

function setElements(isLoggedIn) {
    if (isLoggedIn) {
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

$('#logout').on('click', function () {
    FB.logout(function (response) {
        setElements(false);
    })
    window.location.href = '/index';
})


function testAPI(response) {
    FB.api('/me?fields=name,email', function (response) {
        if (response && !response.error) {
            console.log(response); //the response which has the keys with the data
        }
    });
}

$(document).on('click', '#hasRating', function () {

    console.log('has rating was clicked!');

    $.get('/api/messages/hasRating', function (response) {

        $('.targetMessages').empty();

        console.log('MESSAGES BELOW');
        console.log(response);
        console.log("GRABBING ATTRIBUTE BELOW")


        //It's not getting the id the second time
        for (i = 0; i < response.length; i++) {

            // console.log($(this).parent().find('#mynameEntry').val());

            console.log('TEST BELOW!');
            var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
            console.log(tessageid);

            var h = (i + 1);
            console.log('Conditional below');
            console.log('The current array number is...');
            console.log(i);
            console.log('The classid at this array is...');
            console.log(response[i].classid);
            console.log('Below returns a div at data-targetID with this classid');
            var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
            console.log(messageid); //this is undefined, which is why it doesn't populate


            if (response[i].classid == messageid) {
                console.log(`article[data-targetId ='${response[i].classid}']`);

                // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
            }

            //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
            //     <h4 class="uk-comment-title uk-margin-remove">
            //         <a class="uk-link-reset" href="#">Author</a>
            //     </h4>
            //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            //         <li>
            //             <a href="#">12 days ago</a>
            //         </li>
            //         <li>
            //             <a href="#">Reply</a>
            //         </li>
            //     </ul>
            // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            //     </article>


        }
    })

})

$(document).on('click', '#sellingTextbook', function () {

    console.log('sellingTextbook was clicked!');

    $.get('/api/messages/sellingTextbook', function (response) {

        $('.targetMessages').empty();

        console.log('MESSAGES BELOW');
        console.log(response);
        console.log("GRABBING ATTRIBUTE BELOW")


        //It's not getting the id the second time
        for (i = 0; i < response.length; i++) {

            // console.log($(this).parent().find('#mynameEntry').val());

            console.log('TEST BELOW!');
            var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
            console.log(tessageid);

            var h = (i + 1);
            console.log('Conditional below');
            console.log('The current array number is...');
            console.log(i);
            console.log('The classid at this array is...');
            console.log(response[i].classid);
            console.log('Below returns a div at data-targetID with this classid');
            var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
            console.log(messageid); //this is undefined, which is why it doesn't populate


            if (response[i].classid == messageid) {
                console.log(`article[data-targetId ='${response[i].classid}']`);

                // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
            }

            //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
            //     <h4 class="uk-comment-title uk-margin-remove">
            //         <a class="uk-link-reset" href="#">Author</a>
            //     </h4>
            //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            //         <li>
            //             <a href="#">12 days ago</a>
            //         </li>
            //         <li>
            //             <a href="#">Reply</a>
            //         </li>
            //     </ul>
            // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            //     </article>


        }
    })

})

$(document).on('click', '#buyingTextbook', function () {

    console.log('buyingTextbook was clicked!');

    $.get('/api/messages/buyingTextbook', function (response) {

        $('.targetMessages').empty();

        console.log('MESSAGES BELOW');
        console.log(response);
        console.log("GRABBING ATTRIBUTE BELOW")


        //It's not getting the id the second time
        for (i = 0; i < response.length; i++) {

            // console.log($(this).parent().find('#mynameEntry').val());

            console.log('TEST BELOW!');
            var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
            console.log(tessageid);

            var h = (i + 1);
            console.log('Conditional below');
            console.log('The current array number is...');
            console.log(i);
            console.log('The classid at this array is...');
            console.log(response[i].classid);
            console.log('Below returns a div at data-targetID with this classid');
            var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
            console.log(messageid); //this is undefined, which is why it doesn't populate


            if (response[i].classid == messageid) {
                console.log(`article[data-targetId ='${response[i].classid}']`);

                // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
            }

            //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
            //     <h4 class="uk-comment-title uk-margin-remove">
            //         <a class="uk-link-reset" href="#">Author</a>
            //     </h4>
            //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            //         <li>
            //             <a href="#">12 days ago</a>
            //         </li>
            //         <li>
            //             <a href="#">Reply</a>
            //         </li>
            //     </ul>
            // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            //     </article>


        }
    })

})

$(document).on('click', '#hasReview', function () {

    console.log('hasReview was clicked!');

    $.get('/api/messages/message', function (response) {

        $('.targetMessages').empty();

        console.log('MESSAGES BELOW');
        console.log(response);
        console.log("GRABBING ATTRIBUTE BELOW")


        //It's not getting the id the second time
        for (i = 0; i < response.length; i++) {

            // console.log($(this).parent().find('#mynameEntry').val());

            console.log('TEST BELOW!');
            var tessageid = $(`div[data-targetId =${response[i].id}]`); //the two problem is fucking this up atm because its trying to get the id of two seperate instances and coming back undefined
            console.log(tessageid);

            var h = (i + 1);
            console.log('Conditional below');
            console.log('The current array number is...');
            console.log(i);
            console.log('The classid at this array is...');
            console.log(response[i].classid);
            console.log('Below returns a div at data-targetID with this classid');
            var messageid = $(`article[data-targetId =${response[i].classid}]`).attr('data-targetId');
            console.log(messageid); //this is undefined, which is why it doesn't populate


            if (response[i].classid == messageid) {
                console.log(`article[data-targetId ='${response[i].classid}']`);

                // $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<h4 class="uk-comment-title uk-margin-remove" data-id = ${response[i].classid}><a class="uk-link-reset" href="#">${response[i].name}</a></h4>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li>${response[i].createdAt}</li> <li> Rating: ${response[i].rating}</li><li>Selling ${response[i].textbookSale}</li><li> Buying ${response[i].textbookBuy}</li></ul>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<p class = 'messagestyling' data-id = ${response[i].classid}>${response[i].message}</p>`);
                $(`article[data-targetId ='${response[i].classid}']`).append(`<button class = "editButton" data-messageid = ${response[i].id} data-creator = ${response[i].creator}> EDIT MESSAGE </div>`); //have to grab the response creator
                $(`article[data-targetId ='${response[i].classid}']`).append(`<br>`);
            }

            //     <article class="uk-comment uk-comment-primary"><!-- This will be the target messages with another id I guess I dunno but it's gonna have to work like this -->
            //     <h4 class="uk-comment-title uk-margin-remove">
            //         <a class="uk-link-reset" href="#">Author</a>
            //     </h4>
            //     <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            //         <li>
            //             <a href="#">12 days ago</a>
            //         </li>
            //         <li>
            //             <a href="#">Reply</a>
            //         </li>
            //     </ul>
            // <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            //     et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
            //     ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            //     </article>


        }
    })

})









$(document).on('click', '.editButton', function () {
    var url = window.location.href;
    console.log('I am clicked');
    console.log($(this).attr('data-messageid'));
    var postId = url.split("index/")[1];
    console.log(postId);
    var id = $(this).attr('data-messageid');

    console.log('COMPARATOR BELOW!');
    console.log($(this).attr('data-creator'));
    console.log(url.split("/")[4]);

    if ($(this).attr('data-creator') == url.split("/")[4]) {
        window.location.href = `/editroute/${postId}/${$(this).attr('data-messageid')}`;
    }
    else {
        console.log('THIS IS NOT THE POST OWNER!');
    }



    // window.location.href = `/editroute/${postId})}`; 



    // window.location.href = "/edit/" + id; 

    //might have to do multiple params

    //going to have to make user paths, this edit button needs to have something unique to the message, which I suppose it's id is. ALSO we have to put the current user's ID on the edit buttons so that they can be cross referenced.

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







$(document).on('click', '.mybutton', function () {
    console.log('Test affirmed');
    console.log($('#courseprefix').val())


})