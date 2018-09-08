
var db = require('../../models');

module.exports = function (app) {


    app.get('/api/users', function (req, res) {
        db.Users.findAll({}).then(function (allresults) {
            res.json(allresults);
        })
    });

    app.get('/api/classes', function (req, res) {
        db.Class.findAll({}).then(function (allresults) {
            res.json(allresults);
        })
    });

    app.get('/api/messages', function (req, res) {
        db.Message.findAll({}).then(function (allresults) {
            res.json(allresults);
        })
    });

    app.get(`/api/users/updateclass/:classfilter`, function (req, res) {
        db.Class.findAll({
            where: {
                subject: req.params.classfilter
            }
        }).then(function (allresults) {
            console.log('Response object below');
            console.log(allresults);
            res.json(allresults);
        })
    });


    app.get('/api/messages/hasRating', function (req, res) {
        var dingus = '';

        db.Message.findAll({
            where: {
                rating: {
                   $not: dingus //it doesn't like the ! operator so I'm not sure how to do work this
                }
            }
        }).then(function (allresults) {
            console.log('Response object below');
            console.log(allresults);
            res.json(allresults);
        })
    });

    app.get('/api/messages/sellingTextbook', function (req, res) {
        var dingus = '';

        db.Message.findAll({
            where: {
                textbookSale: {
                   $not: dingus //it doesn't like the ! operator so I'm not sure how to do work this
                }
            }
        }).then(function (allresults) {
            console.log('Response object below');
            console.log(allresults);
            res.json(allresults);
        })
    });

    app.get('/api/messages/buyingTextbook', function (req, res) {
        var dingus = '';

        db.Message.findAll({
            where: {
                textbookBuy: {
                   $not: dingus //it doesn't like the ! operator so I'm not sure how to do work this
                }
            }
        }).then(function (allresults) {
            console.log('Response object below');
            console.log(allresults);
            res.json(allresults);
        })
    });

    

    app.get('/api/messages/message', function (req, res) {
        var dingus = '';

        db.Message.findAll({
            where: {
                message: {
                   $not: dingus //it doesn't like the ! operator so I'm not sure how to do work this
                }
            }
        }).then(function (allresults) {
            console.log('Response object below');
            console.log(allresults);
            res.json(allresults);
        })
    });

    app.get('/index/:index', function (req, res) {



        var id = req.params.index;
        console.log('PARAMETER RECIEVED BELOW');
        console.log(id);

        db.Users.findAll({
            where: {
                userid: id
            }
        })
            .then(function (dbPost) {
                console.log('Params call below!');
                console.log(dbPost[0].dataValues);
                res.render('loggedin', dbPost[0].dataValues); //populate this info on logged in /w handlebars
            });
    });


    app.get('/api/users/updatenames', function (req, res) {
        db.Users.findAll({}).then(function (allresults) {
            res.json(allresults);
        })
    });

    app.get('/api/users/updateemail', function (req, res) {
        db.Users.findAll({}).then(function (allresults) {
            res.json(allresults);
        })
    });




    app.post('/api', function (req, res) {
        db.Users.create({
            name: req.body.name,
            userid: req.body.id,
            email: req.body.email
        })
            .then(function (dbPost) {
                console.log('Post was ran!')
                res.json(dbPost);
            });


    });

    // var postObject = {
    //     name: $("#nameEntry").val(),
    //     courseid: $("#courseIDEntry").val(),
    //     subject: $('#subjectEntry').val(),
    //     instructor: $('#instructorEntry').val()
    // }


    app.post('/class', function (req, res) {
        db.Class.create({
            name: req.body.name,
            courseid: req.body.courseid,
            subject: req.body.subject,
            instructor: req.body.instructor

        })
            .then(function (dbPost) {
                console.log('Class post was ran!')
                res.json(dbPost);
            });


    });

    app.post('/messages', function (req, res) {
        db.Message.create({
            name: req.body.name,
            message: req.body.message,
            rating: req.body.rating,
            textbookSale: req.body.textbookSale,
            textbookBuy: req.body.textbookBuy,
            classid: req.body.classid,
            creator: req.body.creator

        })
            .then(function (dbPost) {
                console.log('Class post was ran!')
                res.json(dbPost);
            });


    });

    // name: $("#mynameEntry").val(),
    //         message: $("#messageEntry").val(),
    //         rating: $("#ratingEntry").val(),
    //         textbookSale: $('#sellbookEntry').val(),
    //         textbookBuy: $('#sellbookEntry').val(),

    app.put('/api/update', function (req, res) {
        db.Message.update({
            message: req.body.message,
            rating: req.body.rating,
            textbookSale: req.body.textbookSale,
            textbookBuy: req.body.textbookBuy,

        },
            {
                where: {
                    id: req.body.classid
                }
            })
            .then(function (dbPost) {
                console.log('SUCCESS!');
                res.json(dbPost);
            });


    });

    // var update = {
    //     name: $(this).parent().find('#mynameEntry').val(),
    //     message: $(this).parent().find('#messageEntry').val(),
    //     rating: $(this).parent().find('#ratingEntry').val(),
    //     textbookSale: $(this).parent().find('#sellbookEntry').val(),
    //     textbookBuy: $(this).parent().find('#buybookEntry').val(),
    //     classid: postedId //this is the only thing that is working for any post other than the first elements post
    // }

    app.delete('/api/delete/:id', function (req, res) {
        console.log('Below is req.params');
        console.log(req.params.id);

        db.Message.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbPost) {
                console.log('SUCCESSFULLY DESTROYED!');
                res.json(dbPost);
            });


    });
}

