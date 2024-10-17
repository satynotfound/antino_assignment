const express = require("express");
const cors = require("cors");
const router = require("./components/demo/route");
const connectDB = require("./connect");
const startCronJob = require("./utils/cron");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

const port = 3002;
connectDB();
startCronJob();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});