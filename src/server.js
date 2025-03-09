import { createServer } from "http";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const server = createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});