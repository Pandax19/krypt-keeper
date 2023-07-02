// Routing and rendering page
const router = require("express").Router()
const {Event, User} = require("../models")


router.get("/", async (req,res) => {
    console.log("home route")
    res.render("home.handlebars", {logged_in: true});
//    res.send("The goose is watching")
})


router.get("/login", (req,res) => {
    res.render("login.handlebars");
   // res.send("The goose is watching")
})


// Specific attraction example 

router.get("/singleAttraction/:id", async (req, res) => {
    try {
        const attractionData = await Event.findOne({where:{id:req.params.id}})
        console.log(req.params.id)
        const attraction = attractionData.get({plain:true})
       

        res.render("singleAttraction", {
            ...attraction
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

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home")
        return
    }
    res.render("login")    
})

router.get("/signUp", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home")
        return
    }
    res.render("signUp")
})

// path to models folder   


module.exports = router;