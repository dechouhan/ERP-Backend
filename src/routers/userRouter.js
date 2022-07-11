const express = require("express");
const userTable = require('../model/users')
const userRouter = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/user/signup", async (req, res) => {
    const { name, mobile, email, password, city } = req.body;
    try {
      const userExist = await userTable.findOne({ email: email });
      if (userExist) {
        return res.status(403).json({ message: "Email is Taken" });
      }
      const hash = await bcrypt.hash(password, 10);
  
      const user = await new userTable({
        name: name,
        mobile: mobile,
        email: email,
        password: hash,
        city: city,
      });
      await user.save();
      res.status(201).json({ user, message: "success" });
    } catch (err) {
      res.status(500).json("already rigestered!!!");
    }
  });

  userRouter.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const fetchUser = await userTable.findOne({ email: email });
    if (!fetchUser) {
      return res.status(401).json({
        message: "Auth failed no such user",
      });
    }
    const checkPassword = await bcrypt.compare(password, fetchUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Auth failed inccorect password",
      });
    }
    const token = jwt.sign(
      { email: fetchUser.email, userId: fetchUser._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      _id: fetchUser._id,
      email: fetchUser.email,
      name: fetchUser.name,
      message: "Login Successfully",
    });
  });


  module.exports = userRouter;