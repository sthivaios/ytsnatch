import express from "express";
import { downloadVideo } from "../lib/download-process";

const router = express.Router();

router.post("", async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      error:
        "malformed request! it appears that there is no request body at all?",
    });
    return;
  }

  const api_token = req.headers["Authorization"];
  if (!api_token || api_token !== process.env.API_KEY) {
    res.status(401).send({ error: "Unauthorized! Wrong or no API key" });
    return;
  }

  const { url } = req.body;

  if (!url || !url.match(/^https?:\/\//)) {
    res.status(400).send({
      error: "the url you provided isnt a string, or you didnt give one at all",
    });
    return;
  }

  const jobId = await downloadVideo(req.body.url);

  res.status(200).send({ job_id: jobId });
});

export default router;
