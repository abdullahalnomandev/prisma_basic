import { Request, Response } from "express";
import { PostService } from "./post.service";

const insertIntoDB = async (req:Request, res:Response) => {

  try {
    const category = await PostService.insertIntoDB(req.body);
    res.status(200).json({
        status: "success",
        message:"Post created successfully",
        category
    })
  } catch (error) {
    res.send(error);
  }
};

const getPosts = async (req: Request, res: Response) => {
      const options = req.query;

  try {
    const users = await PostService.getAllPost(options);
    res.status(200).json({
      status: "success",
      result: users.length,
      users
    });
  } catch (error) {
    res.send(error);
  }
};
export const  PostController ={
    insertIntoDB,
    getPosts
}