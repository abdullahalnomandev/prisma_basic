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
      result: users.total,
      users:users.data
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {

  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const post = await PostService.updatePost(id,data);
    res.status(200).json({
      status: "success",
      post
    });
  } catch (error) {
    res.send(error);
  }
};
const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const post = await PostService.deletePost(id);
    res.status(200).json({
      status: "success",
      post
    });
  } catch (error) {
    res.send(error);
  }
};


const learnAggregateAndGrouping = async (req: Request, res: Response) => {
  try {
    const result = await PostService.learnAggregateAndGrouping();
    res.status(200).json({
      status: "success",
      data:result
    });
  } catch (error) {
    res.send(error);
  }
};
export const PostController = {
  insertIntoDB,
  getPosts,
  updatePost,
  deletePost,
  learnAggregateAndGrouping
};