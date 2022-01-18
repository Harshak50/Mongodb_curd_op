const express = require("express");
const User = require("../Model/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSpecUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const username = req.params.username;
  // console.log(req.body);
  const newuser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });
  try {
    const currentUser = await User.findOne({ username: username });
    if (currentUser !== null) {
      if (currentUser.email == newuser.email) {
        res.status(403).json({ message: "Email already exists" });
      } else {
        res.status(403).json({ message: "Username already exists" });
      }
    } else {
      await newuser.save();
      res.status(201).json(newuser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const username = req.params.username;
  try {
    await User.findOneAndUpdate(
      {
        username: username,
      },
      {
        name: req.body.name,
        email: req.body.email,
      }
    );
    res.status(202).json({ username: username });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const username = req.params.username;
  try {
    await User.findOneAndRemove({ username: username });
    res.status(203).json({ username: username });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

module.exports.getUsers = getUsers;
module.exports.getSpecUser = getSpecUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
