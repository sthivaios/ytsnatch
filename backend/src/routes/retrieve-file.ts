import express from "express";
import { downloadVideo } from "../lib/download-process";
import { jobs } from "../index";

const router = express.Router();

router.get("", async (req, res) => {
  const job_id = req.query.job_id;
  if (!job_id || typeof job_id !== "string") {
    res.status(400).send({ error: "check the job id you provided" });
    return;
  }

  const job = jobs.get(job_id);

  if (!job) {
    res
      .status(404)
      .send({ error: "job not found!", job_id: job_id, jobs: jobs });
    return;
  }

  if (!job.filename) {
    res
      .status(400)
      .send({
        error: "the download is still pending; cannot get the file yet",
      });
    return;
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${job.filename}"`,
  );
  res.status(200).sendFile(`/tmp/ytsnatch/${job.filename}`);
});

export default router;
