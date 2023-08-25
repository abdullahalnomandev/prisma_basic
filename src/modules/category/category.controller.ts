import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertIntoDB = async (req:Request, res:Response) => {

  try {
    const category = await CategoryService.insertIntoDB(req.body);
    res.status(200).json({
        status: "success",
        message:"Category created successfully",
        category
    })
  } catch (error) {
    res.send(error);
  }
};

export const  CategoryController ={
    insertIntoDB
}