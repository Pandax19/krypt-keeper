const Event = require("./eventmodel");
const User = require ("./usermodel");

Event.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Event, {
    foreignKey: "user_id"
})

module.exports = {Event, User}