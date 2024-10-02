const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:Ducktales52@agl.jufix.mongodb.net/');

module.exports = mongoose.connection;