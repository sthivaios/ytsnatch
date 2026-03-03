import child_process from "child_process";
import { v4 as uuidv4 } from 'uuid';
import {jobs} from "../index";

export async function downloadVideo(url: string) {
  const jobId = uuidv4();

  jobs.set(jobId, { status: "pending" });

  const newJob = child_process.spawn("yt-dlp", [
    "-o", `/tmp/ytsnatch/${jobId}.%(ext)s`,
    "--merge-output-format", "mp4",
    url
  ]);

  console.log(newJob);

  newJob.on("close", (code) => {
    jobs.set(jobId, { status: "done", filename: `${jobId}.mp4` });
  });
}