"use client";

import { NewDownloadDialog } from "@/app/download-dialog";
import { useEffect, useState } from "react";
import { actionRetrieve } from "./action-retrieve";
import { actionStatus } from "@/app/action-status";
import { DownloadsTable } from "@/app/table";
import { tryCatch } from "@/lib/try-catch";
import { toast } from "sonner";

export type DownloadEntry = {
  jobId: string;
  url: string;
  status: "pending" | "done" | "error";
};

export default function Page() {
  const [downloads, setDownloads] = useState<DownloadEntry[]>([]);

  const poll = async (jobId: string) => {
    console.log("firing");
    const data = await actionStatus(jobId);

    if (data.status === "pending") {
      setTimeout(() => poll(jobId), 3000);
    } else {
      setDownloads((prev) =>
        prev.map((d) =>
          d.jobId === jobId ? { ...d, status: data.status } : d,
        ),
      );
    }
  };

  const newDownload = async (url: string) => {
    const isValidUrl =
      /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/.test(
        url,
      );
    if (!isValidUrl) {
      toast.info("Enter a valid YouTube URL", {
        description: `You entered "${url}" which isn't valid. A YouTube URL looks something like "https://youtube.com/watch?v=xxxx" where xxxx is the ID of the video.`,
      });
      return;
    }

    const { data, error } = await tryCatch(actionRetrieve(url));

    if (error) {
      toast.warning(
        "Download failed. Something is wrong with the server. Try again later.",
      );
      return;
    }

    if (!data.job_id) {
      return;
    }
    setDownloads((prev) => [
      ...prev,
      { jobId: data.job_id, url, status: "pending" },
    ]);
    poll(data.job_id);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col items-center gap-10 ">
        <NewDownloadDialog callback={newDownload} />
        <DownloadsTable downloads={downloads} />
      </div>
    </div>
  );
}
