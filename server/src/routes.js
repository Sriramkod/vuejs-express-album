const AuthenticationController = require('./controllers/AuthenticationController.js')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js')
const albums = require("./controllers/album.controller.js");
module.exports = (app) => {
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register
    )
    app.post('/login', 
        AuthenticationController.login
    )

  // Create a new album
  app.post("/album", albums.create);

  // Retrieve all albums
  app.get("/album", albums.findAll);

  // Retrieve a single album with id
  app.get("/album/:id", albums.findOne);

  // Update a album with id
  app.put("/album/:id", albums.update);

  // Delete a album with id
  app.delete("/album/:id", albums.delete);

  // Delete all albums
  app.delete("/album", albums.deleteAll);
}
