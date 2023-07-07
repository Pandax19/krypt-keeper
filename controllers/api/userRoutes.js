const router = require("express").Router()
const {User, Event} = require("../../models")



router.post("/signup", async (req, res) => {
    console.log("See Below for Account Information")
    console.log(req.body)
    console.log(req.session)

    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log(userData)
            res.json(userData);
        })
    } catch (error) {
        res.json(error)
    }
})

//logout

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

//login

router.post("/login", async (req, res) => {
    console.log("AHHHHHHHHH")
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: "Username or password incorrect." });
            return
        }
        const goodPw = await userData.checkPassword(req.body.password)
        if (!goodPw) {
            res.status(400).json({ message: "Username or password incorrect." });
            return
        }
        console.log("howdy")
        console.log(userData)
        // req.session.save(() => {
            req.session.user_id = userData.dataValues.id
            req.session.logged_in = true
            res.json({ user: userData, message: "Successfully logged in!" })
        // });
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get("/myfaves", async (req, res) => {
    console.log(req.session)
    try {
        const user = await User.findByPk(req.session.user_id)
        const faveIds = JSON.parse(user.dataValues.favorited_events)
        const favePromises = faveIds.map(async function (id) {
            return await Event.findByPk(id)
        })
        const faves = await Promise.all(favePromises)
        res.render("favorites", { faves })
    } catch (error) {
        console.log(error)
        res.render("login")
    }
})

router.post("/myfaves", (req, res) => {
    console.log("post faves!")
    try {
        User.findByPk(req.body.userId)
            .then(user => {
                if (user) {
                    const favoritedEvents = JSON.parse(user.favorited_events)
                    if (!favoritedEvents.includes(req.body.eventId)) {
                        favoritedEvents.push(req.body.eventId)
                    }
                    user.favorited_events = JSON.stringify(favoritedEvents)
                    return user.save({fields:["favorited_events"]})
                } else {
                    throw new error ("user not found")
                }
            })
            .then(updatedUser => {
                res.sendStatus(200)
            })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;