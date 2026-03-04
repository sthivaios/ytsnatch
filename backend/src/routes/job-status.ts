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

  res.status(200).send(job);
});

export default router;
