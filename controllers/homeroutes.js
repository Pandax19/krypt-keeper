// Routing and rendering page
const router = require("express").Router()


router.get("/", async (req,res) => {
    console.log("home route")
    res.render("home");
//    res.send("The goose is watching")
})


router.get("/login", (req,res) => {
    console.log("INSIDE ROUTE!")
    res.render("login.handlebars");
   // res.send("The goose is watching")
})


// Specific attraction example 

router.get("/singleAttraction/:id", async (req, res) => {
    try {
        const attractionData = await Event.findByPk(req.params.id)
        const attraction = attractionData.get({plain:true})
        console.log(attraction)
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