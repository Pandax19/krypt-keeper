// Routing and rendering page
const router = require("express").Router()


router.get("/", async (req,res) => {
    res.render("home");
   
})


router.get("/login", async (req,res) => {
    res.render("login");
  
})


// Specific attraction example 

router.get("/singleAttraction/:id", async (req, res) => {
    try {
        res.render("singleAttraction", {
            title: "SpookyZone", 
            description: "It's Spooky!",
            price: "$3,00000",
            address: "nowhere",
            date: "June 30"
        })
    } catch (error) {
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

// Path to models folder   


module.exports = router;