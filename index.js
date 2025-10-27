import express from "express";
import routes from "./routes";
import serverless from "serverless-http";

const app = express();

app.use("/api/v1", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const handler = serverless(app);