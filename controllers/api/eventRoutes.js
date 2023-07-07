const router = require("express").Router();
const Event = require("../../models/eventmodel");


// create event route to create event, post method


router.get('/' , async(req, res ) => {
    try {
        const eventsDB = await Event.findAll(
        //     {
        //     include: [
        //         {
        //             // model: Event,
        //             attributes: [ "name", "address", "cost"]
        //         }
        //     ]
        // }
        )

        
        const events = eventsDB.map((event1) => 
        event1.get({ plain: true }));
        res.render("attractions", {
            events, 
            loggedIn: req.session.loggedIn
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});



router.get("/:zipCode", async (req,res) => {
    // res.send(req.params.zipCode)
    try {
        
    
    const eventData = await Event.findAll({ WHERE: {
        zip: req.params.zipCode
        
    }})
    res.json(eventData)
    } catch (error) {
        
    }
})





module.exports = router
