const User = require("../models/user");

// Helper function to extract user parameters from the request body
const getUserParams = (body) => ({
  name: {
    first: body.first,
    last: body.last
  },
  email: body.email,
  password: body.password,
  zipCode: body.zipCode,
  phoneNumber: body.phoneNumber
});

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index", {
      flashMessages: { success: "Loaded all users!" }
    });
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    const userParams = getUserParams(req.body);

    User.create(userParams)
      .then(user => {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        req.flash("error", `Failed to create user account: ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
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

  show: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", { user });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    const userId = req.params.id;
    const userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, { $set: userParams }, { new: true })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next(error);
      });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          user.passwordComparison(req.body.password)
            .then(passwordsMatch => {
              if (passwordsMatch) {
                // Password matches, redirect to the user profile page
                res.locals.redirect = `/users/${user._id}`;
                req.flash("success", `${user.fullName}'s logged in successfully!`);
                res.locals.user = user;
              } else {
                // Password mismatch
                req.flash("error", "Incorrect password.");
                res.locals.redirect = "/users/login";
              }
              next();
            })
            .catch(error => {
              console.error("Error comparing password:", error);
              req.flash("error", "An error occurred while comparing passwords.");
              res.locals.redirect = "/users/login";
              next();
            });
        } else {
          // User not found
          req.flash("error", "User not found.");
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch(error => {
        console.error("Error during login authentication:", error);
        next(error);
      });
  },

  validate: (req, res, next) => {
    req.sanitizeBody("email").normalizeEmail({ all_lowercase: true }).trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("zipCode", "Zip code is invalid")
      .notEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 })
      .equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();

    req.getValidationResult().then(errors => {
      if (!errors.isEmpty()) {
        const messages = errors.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  }
};
