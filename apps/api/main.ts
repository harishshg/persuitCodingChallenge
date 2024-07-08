import express from "express";
import cors from "cors"
import data from "./requests-data.json"

const app = express();
const port = 3001;

// Middlewares
app.use(cors())

// Routes
app.get("/", (_, res) => {
  res.send("Hello world!")
});

app.get("/requests", (req, res) => {

  const {
    pageNumber = 1,
    pageSize = 5,
  }: {
    pageNumber?: number;
    pageSize?: number;
  } = req.query;
  const sortedData = data.sort((a,b) => b.createdAt - a.createdAt)
  const filteredData = sortedData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  res.send(filteredData)
});

// App start
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});