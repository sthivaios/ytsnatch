import express from "express";
import {downloadVideo} from "../lib/download-process";

const router = express.Router();

router.post("", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "malformed request! it appears that there is no request body at all?" });
    return;
  }

  const { url } = req.body;

  if (!url || !url.match(/^https?:\/\//)) {
    res.status(400).send({ error: "the url you provided isnt a string, or you didnt give one at all" });
    return;
  }

  const jobId = await downloadVideo(req.body.url);

  res.status(200).send({ job_id: jobId });
});

export default router;