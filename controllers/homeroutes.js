// Routing and rendering page
const router = require("express").Router()
const {Event, User, Favs} = require("../models")
const withAuth = require("../utils/auth")



router.get("/myfaves", withAuth, async (req, res) => {
    console.log(req.session)
    try {
        const user = await User.findByPk(req.session.user_id, {

            include: [{model: Event, through: Favs}]
        })
        console.log(user)
        const userInfo = user.get({plain: true })
        const faves = userInfo.events
        console.log(faves)

        
        // const faveIds = JSON.parse(user.dataValues.favorited_events)
        // console.log(faveIds)
        // const favePromises = faveIds.map(async function (id) {
        //     console.log(id)
        //     return await Event.findByPk(id)
        // })
        // const faves = await Promise.all(favePromises)
        // console.log('Favs array')
        // console.log(faves)
        res.render("favorites", { faves })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


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
        console.log(attractionData)
        const attraction = attractionData.get({plain:true})
        let logged_in = req.session.logged_in ? req.session.logged_in : false
        console.log(attraction)
        res.render("singleAttraction", {

            ...attraction,
            logged_in: logged_in,
            user_id: req.session.user_id
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