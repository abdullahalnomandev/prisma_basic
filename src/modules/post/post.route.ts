import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/", PostController.insertIntoDB);
router.get("/", PostController.getPosts);


export const PostRoutes = router;
