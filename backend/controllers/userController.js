const AccountModel = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const Location = require("../models/location");

const userController = {
  //REGISTER
  userRegister: async (req, res) => {
    const { username, password } = req.body;
    try {
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //check for existing user
      const user = await AccountModel.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username aldready exists" });
      }
      //create new user
      const newUser = new AccountModel({ username, password: hashed });
      //save to database
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "Your account has been created successfully.",
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  //LOGIN

  userlogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await AccountModel.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid username or password" });
      }

      if (user && user.password) {
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid username or password" });
        }

        return res.status(200).json({
          user,
          success: true,
          message: "Your account has been logged in successfully.",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  //UPDATE

  userUpdate: async (req, res) => {
    const userId = req.params.id;
    const updatedUsername = req.body.username;
    const updatedPassword = req.body.password;
    //validation
    if (!updatedUsername || !updatedPassword)
      return res.status(400).json({ error: "Missing username or password" });
    try {
      const user = await AccountModel.findByIdAndUpdate(userId, {
        username: updatedUsername,
        password: updatedPassword,
      });
      if (user) {
        return res.json({
          success: true,
          message: "User uppdated succcessfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  //DELETE
  userDelete: async (req, res) => {
    try {
      const user = await AccountModel.findByIdAndDelete(req.params.id);
      if (user) {
        return res.json({
          success: true,
          message: "User deleted succcessfully",
        });
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  //GET USER LOCATION
  userLocation: async (req, res) => {
    try {
      const { lat, lng } = req.body;
      const location = await Location.create({ lat, lng });
      res.json(location);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = userController;
