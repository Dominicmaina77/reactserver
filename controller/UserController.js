const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

if (process.env.Node_ENV !== "production") {
  require("dotenv").config({
    path: "./.env",
  });
}

const jsonwebtoken = process.env.JWT_SECRET;

const html = `
<h1>Email Testing by nodemailer</h1>
<p>Nodemailer is the best</p>

`;

const sendVerificationEmail = async (req,res) =>{
  try {
    const transporter = nodeMailer.createTransport({
      host:'smtp.gmail.com',//if using google
      port:465,
      secure:true,
      auth:{
          user:'',//host username here-could be email
          pass:''//host password here
      }
  });

  const info = await transporter.sendMail({
      from:'',//sender email
      to:'',//receiveremail
      subject:'Testing Nodemailer',
      html:html //this is the defined body
  

  });

  console.log("Email sent successfully!!", info.messageId)
  } catch (error) {
    
  }
}

const createUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log("name", name)
  console.log(name, email, password, phone);
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password");
        return res.status(400).json({ msg: "Invalid password" });
      } else {
        const token = jwt.sign({ email: user.email }, jsonwebtoken);
        console.log(token);
        // return status ok when true
        return res.status(200).json({status:"ok",token:token})
        // return res.status(200).json(user);
      }
    }
  } catch (error) {
     console.log("")
  }
};

const getUserData = async (req, res) => {
  const {token} = req.body
  try {
    const user = await jwt.verify(token, jsonwebtoken);
    console.log("user data collected",user)

    
    const useremail = user.email
    console.log("name from token",user.name)
    const userData = await User.findOne({email: useremail});
    if(!userData){
      return res.status(400).json("User not found");
    } else{
      console.log(userData);
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
    
  }
}

const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
      console.log("User found");
    } else {
      res.status(404).json({ msg: "User not found" });
      console.log("User not found");
    }
  } catch (error) {
    console.log("User not found", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log("userid", id);
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      console.log("User not found");
      res.status(404).json({ error: error.message });
    } else {
      console.log("user", user);
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Failed to update user", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body);
    if (!user) {
      console.log("User not found");
      res.status(404).json({ error: error.message });
    } else {
      console.log("User deleted successsfully");
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Failed to delete user", error);
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  login,
  getUserData
};
