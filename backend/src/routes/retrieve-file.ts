import express from "express";
import { jobs } from "../index.js";

const router = express.Router();

router.get("", async (req, res) => {
  const job_id = req.query.job_id;
  if (!job_id || typeof job_id !== "string") {
    res.status(400).send({ error: "check the job id you provided" });
    return;
  }

  const job = jobs.get(job_id);

  if (!job) {
    res.status(404).send({ error: "job not found!" });
    return;
  }

  if (!job.filename) {
    res.status(400).send({
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
