import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/", PostController.insertIntoDB);
router.get("/", PostController.getPosts);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/learn-query", PostController.learnAggregateAndGrouping);


export const PostRoutes = router;
