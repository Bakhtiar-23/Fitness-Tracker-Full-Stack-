const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("./subscriber"),
  bcrypt = require('bcryptjs'),
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: Number,
        min: [100000000, "Phone number too short"],
        max: 99999999999
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true
    }
  );

// Virtual for full name
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    // Check and set subscriber if not set
    if (!this.subscribedAccount) {
      const subscriber = await Subscriber.findOne({ email: this.email });
      if (subscriber) {
        this.subscribedAccount = subscriber;
      }
    }
    next();
  } catch (error) {
    console.log(`Error in hashing password: ${error.message}`);
    next(error);
  }
});

// Method to compare password
userSchema.methods.passwordComparison = function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password)
    .then(result => {
      if (!result) {
        console.log("Password mismatch");
      } else {
        console.log("Password matched");
      }
      return result;
    });
};

module.exports = mongoose.model("User", userSchema);
