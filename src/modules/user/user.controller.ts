import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const insertIntoDB = async (req:Request, res:Response, next:NextFunction) => {

  try {
    const user = await UserService.inSertUser(req.body);
    res.status(200).json({
        status: "success",
        message:"User created successfully",
        user
    })
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdateProfileController = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const userProfile = await UserService.insertOrUpdateProfile(req.body);
    res.status(200).json({
        status: "success",
        message:"User Profile created/updated  successfully",
        userProfile
    })
  } catch (error) {
    res.send(error);
  }
};
const getUsers = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json({
        status: "success",
        users
    })
  } catch (error) {
    res.send(error);
  }
};
const getSingleUser = async (req:Request, res:Response) => {
  try {
    const user = await UserService.getSingleUser(Number(req.params.userId));
    res.status(200).json({
        status: "success",
        user
    })
  } catch (error) {
    res.send(error);
  }
};


export const UserController = {
  insertIntoDB,
  insertOrUpdateProfileController,
  getUsers,
  getSingleUser
};