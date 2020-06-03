const router = require('express').Router();
let Startup = require('../models/startup.model'); //mongoose model


//routes for /Users/ get request
router.route('/').get((req,res) =>{ 
    Startup.find() //finds all users in the database and recieves a promise in a json format
    .then(startup => res.json(startup))
    .catch(err => res.statusCode(400).json('Error: ' + err));
});


//post request
router.route('/add').post((req,res)=> { 
    const username = req.body.username; //new username is apart of request body
    const description = req.body.description;
    const evaluation = Number(req.body.evaluation);
    const founding = Date.parse(req.body.founding);

    const newStartup = new Startup({username, description, evaluation, founding,}); //creates a new instance of User

    newStartup.save() //after it is saved
    .then(() => res.json('Startup added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res)=>{ //get request by id
    Startup.findById(req.params.id) //finds by ID using req.params.id
    .then(startup => res.json(startup))
    .catch(err => res.status(400).json('Error: ' + err
    ))
});
router.route('/:id').delete((req, res)=>{ //get request by id
    Startup.findByIdAndDelete(req.params.id)
    .then(() => res.json('Startup deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req,res)=>{ 
    Startup.findById(req.params.id) //finds the startup using req.params.id
    .then(startup =>{
        startup.username = req.body.username;
        startup.description = req.body.description;
        startup.evalutation = Number(req.body.evaluation);
        startup.founding = Date.parse(req.body.founding);
        
        startup.save()
        .then(() => res.json('Startup updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
})


module.exports = router;