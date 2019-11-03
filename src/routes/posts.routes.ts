import express from "express";

import * as PostController from "../controllers/PostController";

const router = express.Router();

router.get("/", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.post("/", PostController.createPost);

// router.put("/:id", PostController.updatePost);

// router.delete("/:id", PostController.deletePost);

export { router };
