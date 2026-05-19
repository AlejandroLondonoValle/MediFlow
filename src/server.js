import app from "./app.js";
import config from "./config.js";

app.listen(config.port, () => {
  console.log(`${config.appName} escuchando en el puerto http://localhost:${config.port}/api/docs`);
});
