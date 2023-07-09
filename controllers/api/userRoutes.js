const router = require("express").Router()
const {User, Event, Favs} = require("../../models")




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




router.post("/myfaves", async (req, res) => {
    console.log("post faves!")
    try {
        console.log(req.body)
        const favData = await Favs.create({

            user_id: req.session.user_id,
            event_id: req.body.eventId
        })
        console.log(favData)
        res.status(200).json(favData)

        // User.findByPk(req.body.userId)
        //     .then(user => {
        //         console.log(user)
        //         if (user) {
        //             const favoritedEvents = JSON.parse(user.favorited_events)
        //             console.log(favoritedEvents)
        //             if (!favoritedEvents.includes(req.body.eventId)) {
        //                 favoritedEvents.push(req.body.eventId)
        //             }
        //             user.favorited_events = JSON.stringify(favoritedEvents)
        //             return user.save({fields:["favorited_events"]})
        //         } else {
        //             throw new error ("user not found")
        //         }
        //     })
        //     .then(updatedUser => {
        //         console.log(updatedUser)
        //         res.sendStatus(200)
         //   })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;