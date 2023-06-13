const AccountModel = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");
const Location = require("../models/location");
const { generateAccessToken } = require("../ultis/generateToken")
const jwt = require("jsonwebtoken")
const Image = require("../models/images")
//skapa ett objekt innehåller olika metoder för att hantera användaråtgärder som registrering, inloggning, uppdatering, radering, utloggning och hantering av användarplats och bilder.
const userController = {
  //REGISTER
  userRegister: async (req, res) => {
    const { username, password } = req.body;
    try {
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      //check for existing user
      const user = await AccountModel.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username aldready exists" });
      }
      //create new user
      const newUser =  await AccountModel.create({ username, password: hashed });
      if (newUser) {
        const token = generateAccessToken(newUser._id);
        res.status(200).json({
          admin:newUser.admin,
          token: token,
          _id: newUser._id,
          success: true,
          message: "Your account has been created successfully.",
        })
      }

    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  //LOGIN
  userLogin: async (req, res) => {
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
        const token = generateAccessToken(user._id);
        return res.status(200).json({
          token,
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
  //LOGOUT

  userLogout: async (req, res) => {
    res.cookie("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
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
  // Retrieve all locations from MongoDB
  getAllLocations: async (req, res) => {
    try {
      const locations = await Location.find();
      return res.json({ locations });
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  //Upload-file
  userLoadFile: async (req,res) =>{
    const {base64,address} = req.body;
    try {
      await Image.create({image:base64 , address:address});
      res.send({Status:"ok"});
    } catch (error) {
      res.sendStatus(500);
    }
  },
  //get user
  getUser: async (req,res) =>{
    const {_id} = req.body;
    try {
      await AccountModel.findOne({_id});
      res.send({Status:"ok"});
    } catch (error) {
      res.sendStatus(500);
    }
  },
  //get all images
  getAllImages: async (req,res) =>{
    try {

      const data = await Image.find();
      return res.json({data});
    } catch (error) {
      res.sendStatus(500);
    }
  },
  //get address
  saveAddressToDatabase: async (req,res) => {
      const { address } = req.body;
      try {
      const newLocation = new Location({ address });
      await newLocation.save();
      console.log("Address saved to the database successfully.");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  }
};

module.exports = userController;
