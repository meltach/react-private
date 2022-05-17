import express from "express";
import "dotenv/config";
import { routes } from "./routes/index.js";

import { initializeDbConnection } from "./db.js";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

initializeDbConnection().then((err) => {
  if (err) {
    console.log("Unable to connect to Mongo.");
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
});
