import app from "./src/app.js";
import { config } from "./src/config/config.js";
import ConnectDB from "./src/config/db.js";
const startServer = async () => {
  await ConnectDB();

  const port = config.port || 3000;

  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
};

startServer();
