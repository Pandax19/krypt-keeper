const router = require("express").Router()
const User = require("../../models/usermodel")


// Sign up date page - now stores information as object
// Need to have object saved into MySql Data Tabel 

router.post("/signup", async (req, res)=> {
    console.log("See Below for Account Information")
    console.log(req.body)
    console.log(req.session)

    try {
        const userData = await User.create(req.body);
       
        req.session.save(()=>{
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
    try {
        console.log("AHHHHHHHHH")
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: "Username or password incorrect." });
            return
        }
        console.log(userData)
        const goodPw = await userData.checkPassword(req.body.password)
        if (!goodPw) {
            res.status(400).json({ message: "Username or password incorrect." });
            return
        }
        console.log("howdy")
        req.session.save(() => {
            req.session.user_id = userData.user_id
            req.session.logged_in = true
            res.json({ user: userData, message: "Successfully logged in!" })
        });
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;