import "dotenv/config"
import express from 'express';
import retrieve from "./routes/retrieve";

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

app.use("/test", retrieve);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
