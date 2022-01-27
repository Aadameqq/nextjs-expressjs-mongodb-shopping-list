import next from "next";

import * as config from "./config.json";
import createApp from "./app";
import createDatabaseConnection from "./database";

const nextApp = next({
  dev: config.NODE_ENV === "development",
  dir: config.NEXT_DIR,
});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = createApp(handle);

  await createDatabaseConnection();

  app.listen(config.PORT, () => {
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
});
