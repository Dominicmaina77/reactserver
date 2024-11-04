const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs')

const createUser = async(req,res) => {
 const {name,email,password,phone} = req.body;
    try{
        const existingUser = await User.findOne({email:email});
         if(existingUser){
             return res.status(400).json({msg:'User already exists'});
         }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create(
                {name,email,password:hashedPassword,phone}
            )
                
            
         }

    } catch (error){
       res.status(500).json({error:error.message});
       console.log(error);
    }

};

const findUser = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).json(user);
            console.log("User found");
        }else{
            res.status(404).json({msg:'User not found'});
            console.log("User not found");
        }
    } catch(error){
        console.log("User not found", error);
        return res.status(500).json({error: error.message});
    }
};

const updateUser = async(req,res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body)
        if(!user){
           console.log("User not found");
           res.status(404).json({error: error.message})
        }else{
            console.log("User  updated successfully");
            res.status(200).json(user);
        }
    } catch(error){
        res.status(500).json({error: error.message}); 
        console.log("Failed to update user", error);
    }
};

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id , req.body);
        if(!user){
            console.log("User not found");
            res.status(404).json({error: error.message})
        } else{
            console.log("User deleted successsfully");
            res.status(200).json(user);
        }
    } catch(error){
        res.status(500).json({error: error.message}); 
        console.log("Failed to delete user", error);
    }  
};

module.exports ={
    createUser,
    findUser,
    updateUser,
    deleteUser
}
   