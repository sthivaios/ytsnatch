import express from "express";
import {downloadVideo} from "../lib/download-process";

const router = express.Router();

router.post("", async (req, res) => {
  downloadVideo(req.body.url);

  res.status(200).send({ message: "test" })
});

export default router;