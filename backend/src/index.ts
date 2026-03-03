import "dotenv/config"
import express from 'express';
import retrieve from "./routes/retrieve";
import status from "./routes/job-status";
import retrieve_file from "./routes/retrieve-file"

const app = express();
const PORT = process.env.PORT || 3000;

type Job = {
  status: "pending" | "done" | "error";
  filename?: string;
}

export const jobs = new Map<string, Job>();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.use("/retrieve", retrieve);
app.use("/status", status);
app.use("/retrieve_file", retrieve_file);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
