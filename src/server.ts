import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedEmployerAdmin } from "./app/utils/seedEmployerAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL as string);
    console.log("Connected to DB");

    server = app.listen(envVars.PORT || 5000, () => {
      console.log(`Server is listening to post ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async ()=>{
  await startServer();
  await seedEmployerAdmin()
})()

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
