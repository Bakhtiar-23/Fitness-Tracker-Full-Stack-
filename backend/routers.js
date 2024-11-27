// router.js
const express = require('express');
const usersController = require('./controllers/usersController');
const homeController = require('./controllers/homeController');
const subscribersController = require('./controllers/subscribersController');
const coursesController = require("./controllers/coursesController");
const videoController = require('./controllers/videoController'); // Adjust the path based on your file structure
const errorController = require('./controllers/errorController');
const teamMembersController = require("./controllers/teamMembersController");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { ensureAuthenticated } = usersController;
const router = express.Router();

// Route for the home page

router.get('/', videoController.showHomepage);
router.get('/dashboard', homeController.getDashboardPage);
router.get('/contact', homeController.getSubscriptionPage);
router.get('/team-members', homeController.getTeamMembersPage);
// Route for adding a video
router.get('/add-video', videoController.showAddVideoPage);
router.post('/add-video', videoController.addVideo);

// Delete video routes
router.get('/video/:id/delete', videoController.showDeleteVideoPage);
router.delete('/video/:id', videoController.deleteVideo);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView); // Handle POST request for login
router.get("/users/:id/profile", ensureAuthenticated, usersController.showProfile);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);


router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);

router.get("/team-member", teamMembersController.index, teamMembersController.indexView); // List all team members
router.get("/team-member/new", teamMembersController.new); // Form to create a new team member
router.post("/team-member", upload.single("image"), teamMembersController.create, teamMembersController.redirectView); // Handle new team member creation
router.get('/team-member/:id', teamMembersController.showView);
router.get("/team-member/:id/edit", teamMembersController.edit); // Form to edit a specific team member
router.post("/team-member/:id", upload.single("image"), teamMembersController.update, teamMembersController.redirectView); // Handle updates to a team member
router.post("/team-member/:id/delete", teamMembersController.delete, teamMembersController.redirectView); // Handle team member deletion

router.post('/subscribe', subscribersController.saveSubscriber);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);



module.exports = router;
