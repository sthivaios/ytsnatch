import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadEntry } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Check, TriangleAlert } from "lucide-react";

function DownloadStatus(props: { status: string }) {
  if (props.status === "pending") {
    return <Spinner height={10} />;
  } else if (props.status === "error") {
    return <TriangleAlert />;
  } else if (props.status === "done") {
    return <Check height={15} />;
  }
}

export function DownloadsTable(props: { downloads: DownloadEntry[] }) {
  return (
    <Table>
      {props.downloads.length < 1 ? (
        <TableCaption>There are no downloads</TableCaption>
      ) : null}
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Job ID</TableHead>
          <TableHead className="font-bold">Video URL</TableHead>
          <TableHead className="font-bold">Status</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.downloads.length > 0
          ? props.downloads.map((download) => (
              <TableRow key={download.jobId}>
                <TableCell>{download.jobId}</TableCell>
                <TableCell>
                  <a
                    className="text-pink-400 hover:text-pink-600 underline"
                    href={download.url}
                    target="_blank"
                  >
                    {download.url}
                  </a>
                </TableCell>
                <TableCell>
                  <DownloadStatus status={download.status} />
                </TableCell>
                <TableCell>
                  {download.status === "done" ? (
                    <div>
                      <a
                        href={`http://localhost:4000/retrieve_file?job_id=${download.jobId}`}
                        download
                      >
                        <Button className="hover:cursor-pointer max-h-6.5">
                          Download
                        </Button>
                      </a>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
}
