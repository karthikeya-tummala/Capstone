import express from "express";
import { routes } from "./routes/index.js";
import serverless from "serverless-http";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use("/api/v1", routes);

app.use('/health-check', (req, res) => {
  let time = process.uptime();
  let uptime;
  if (time <= 60) {
    uptime = `${time.toFixed(0)} seconds`;
  }
  else if (time < 3600) {
    uptime = `${(time / 60).toFixed(1)} minutes`;
  } else {
    uptime = `${(time / 3600).toFixed(2)} hours`;
  }

  return res.status(200).json({
    message: "Server Online",
    status: "ok",
    uptime: uptime,
    timestamp: new Date().toISOString(),
  })
})

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export const handler = serverless(app);