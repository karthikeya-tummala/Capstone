import express from "express";
import { routes } from "./routes/index.js";
import serverless from "serverless-http";

const app = express();

app.use("/api/v1", routes);

app.use('/health-check', (req, res) => {
  return res.status(200).json({
    message: "Server Online",
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const handler = serverless(app);