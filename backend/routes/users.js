const router = require('express').Router();
let User = require('../models/user.model'); //mongoose model


//routes for /Users/ get request
router.route('/').get((req,res) =>{ 
    User.find() //finds all users in the database and recieves a promise in a json format
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post request
router.route('/add').post((req,res)=> { 
    const username = req.body.username; //new username is apart of request body
    const newUser = new User({username}); //creates a new instance of User

    newUser.save() //after it is saved
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;