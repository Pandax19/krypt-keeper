const router = require("express").Router()


router.get("/", async (req,res) => {
    res.send("The goose needs a login")
})



module.exports = router;