var db = require ('../../models');


module.exports = function (app) {
    app.get('/index', function (req, res) {
        // res.send(console.log('Get at index has been pinged'));
        res.render('index');
    });

    app.get('/edit/:id', function (req, res) {
        // res.send(console.log('Get at index has been pinged'));
        var id = req.params.id;

        db.Users.findAll({
            where: {
                userid: id
            }
        })
            .then(function (dbPost) {
                console.log('Params call below!');
                console.log(dbPost);
                res.render('edit', dbPost);
            });




    });

    app.get('/editroute/:userid/:id', function (req, res) {
        // res.send(console.log('Get at index has been pinged'));

         // http://localhost:5000/editroute/2182981311920136/1

        var userid = req.params.userid;
        var id = req.params.id;
        console.log(userid);
        // console.log(id);

        // db.Users.findAll({
        //     where: {
        //         userid: id
        //     }
        // })
            // .then(function (dbPost) {
            //     console.log('Params call below!');
            //     console.log(dbPost);
            //     res.render('edit', dbPost);
            // });

            console.log('Params call below!');
                // console.log(dbPost);
                res.render('edit');


    });
}

