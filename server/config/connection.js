const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://root:Ducktales52@agl.jufix.mongodb.net/");
//   .then(() => {
//     const connection = mongoose.connection;

//     connection
//       .listCollections()
//       .then((collections) => {
//         console.log(
//           "Collections:",
//           collections.map((collection) => collection.name)
//         );
//       })
//       .catch((err) => console.error("Error listing collections:", err));
//   })
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose.connection;

//users, books, authors