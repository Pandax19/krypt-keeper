// Routing and rendering page
const router = require("express").Router()
const {Event, User} = require("../models")


//main route, or homepage. 

router.get("/", async (req,res) => {
    console.log('Testing Home Page');
    res.render("home", {
        logged_in: req.session.logged_in
    })})

//login/signup routes

router.get("/login", (req, res) => {
    res.render("login")    
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/attractions", async (req, res) => {
    res.render("attractions")})

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Specific attraction example 

router.get("/singleAttraction/:id", async (req, res) => {
    try {
        const attractionData = await Event.findOne({where:{id:req.params.id}})
        console.log(req.params.id)
        const attraction = attractionData.get({plain:true})
        let logged_in = req.session.logged_in ? req.session.logged_in : false

        res.render("singleAttraction", {

            ...attraction,
            logged_in: logged_in
        })

        // res.render("singleAttraction", {
        //     title: "SpookyZone", 
        //     description: "It's Spooky!",
        //     price: "$3,00000",
        //     address: "nowhere",
        //     date: "June 30"
        //})
    } catch (error) {
        console.log("HELP")
        res.status(500).json(error)
    }
})

//login/signup routes


// Path to models folder   


module.exports = router;