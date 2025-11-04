import app from "../app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

(async () => {
  await connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
