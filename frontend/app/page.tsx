"use client";

import { NewDownloadDialog } from "@/app/download-dialog";
import { useEffect, useState } from "react";
import { actionRetrieve } from "./action-retrieve";
import { actionStatus } from "@/app/action-status";
import { DownloadsTable } from "@/app/table";

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
    const response = await actionRetrieve(url);
    if (!response.job_id) {
      return;
    }
    setDownloads((prev) => [
      ...prev,
      { jobId: response.job_id, url, status: "pending" },
    ]);
    poll(response.job_id);
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
