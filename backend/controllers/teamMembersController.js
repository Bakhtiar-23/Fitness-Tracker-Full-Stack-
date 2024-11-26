const TeamMember = require("../models/teamMembers");
const multer = require("multer");

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = {
  index: (req, res, next) => {
    TeamMember.find({})
      .then((teamMembers) => {
        console.log('Team members found', teamMembers);
        res.locals.teamMembers = teamMembers;
        next();
      })
      .catch((error) => {
        console.error(`Error fetching team members: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("teamMembers/index", { teamMembers: res.locals.teamMembers });
  },

  new: (req, res) => {
    res.render("teamMembers/new");
  },

  create: (req, res, next) => {
    const teamMemberParams = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      experience: req.body.experience,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };
  
    TeamMember.create(teamMemberParams)
      .then((teamMember) => {
        console.log('New team member created:', teamMember);  // Add logging here
        res.locals.redirect = "/team-member";
        res.locals.teamMember = teamMember;
        next();
      })
      .catch((error) => {
        console.error(`Error creating team member: ${error.message}`);
        next(error);
      });
  },
  

  show: (req, res, next) => {
    const teamMemberId = req.params.id;
    TeamMember.findById(teamMemberId)
      .then((teamMember) => {
        res.locals.teamMember = teamMember;
        next();
      })
      .catch((error) => {
        console.error(`Error fetching team member by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res, next) => {
    const teamMemberId = req.params.id; // Get the ID from the URL
    TeamMember.findById(teamMemberId)   // Find team member by ID
      .then((teamMember) => {
        if (!teamMember) {
          return res.status(404).send("Team member not found.");
        }
        res.locals.teamMember = teamMember;
        res.render("teamMembers/show", { teamMember }); // Ensure the path is correct
      })
      .catch((error) => {
        console.error(`Error fetching team member by ID: ${error.message}`);
        next(error);
      });
  },

  edit: (req, res, next) => {
    const teamMemberId = req.params.id;
    TeamMember.findById(teamMemberId)
      .then((teamMember) => {
        if (!teamMember) {
          return res.status(404).send("Team member not found.");
        }
        res.render("teamMembers/edit", { teamMember });
      })
      .catch((error) => {
        console.error(`Error fetching team member for editing: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    const teamMemberId = req.params.id;
    const teamMemberParams = {
      name: req.body.name,
      role: req.body.role,         // Added role field
      email: req.body.email,       // Added email field
      experience: req.body.experience, // Added experience field
      image: req.file ? `/uploads/${req.file.filename}` : undefined, // Keep previous image if not updated
    };

    // If no new image is uploaded, remove the `image` property
    if (!teamMemberParams.image) {
      delete teamMemberParams.image;
    }

    TeamMember.findByIdAndUpdate(teamMemberId, { $set: teamMemberParams })
      .then((teamMember) => {
        res.locals.redirect = `/team-member/${teamMemberId}`;
        res.locals.teamMember = teamMember;
        next();
      })
      .catch((error) => {
        console.error(`Error updating team member: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    const teamMemberId = req.params.id;
    TeamMember.findByIdAndDelete(teamMemberId)
      .then(() => {
        res.locals.redirect = "/team-member";
        next();
      })
      .catch((error) => {
        console.error(`Error deleting team member: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },
};
