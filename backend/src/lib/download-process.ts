import child_process from "child_process";
import { v4 as uuidv4 } from "uuid";
import { jobs } from "../index";

export function downloadVideo(url: string) {
  const jobId = uuidv4();

  jobs.set(jobId, { status: "pending" });

  const newJob = child_process.spawn("yt-dlp", [
    "--js-runtimes",
    "node",
    "-o",
    `/tmp/ytsnatch/${jobId}.%(ext)s`,
    "--merge-output-format",
    "mp4",
    url,
  ]);

  newJob.on("close", (code) => {
    if (code !== 0) {
      jobs.set(jobId, { status: "error" });
    } else {
      jobs.set(jobId, { status: "done", filename: `${jobId}.mp4` });
    }
  });

  newJob.stderr.on("data", (data) => {
    console.error(`yt-dlp: ${data}`);
  });

  return jobId;
}
