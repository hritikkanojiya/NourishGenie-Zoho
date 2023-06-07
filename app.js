require("dotenv").config();
const express = require("express");
const attendenceBackendApp = express();
const httpServer = require("http").createServer(attendenceBackendApp);
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const httpErrors = require("http-errors");
const cookieParser = require("cookie-parser");
const momentTimezone = require("moment-timezone");
const connectToMongoDB =require('./helpers/common/init_monodb')
const {
  logBackendError,
} = require("./helpers/common/backend.functions");

momentTimezone.tz.setDefault("Asia/Kolkata");

// Activate Middlewares
attendenceBackendApp.use(helmet());
attendenceBackendApp.use(
  compression({
    level: 6,
    threshold: 50 * 1000,
    filter: (req, res) => {
      return req.headers["genie-no-compression"]
        ? false
        : compression.filter(req, res);
    },
  })
);
attendenceBackendApp.use(express.json());
attendenceBackendApp.use(express.urlencoded({ extended: true }));
attendenceBackendApp.use(cookieParser(process.env.APP_COOKIE_SECRET));
attendenceBackendApp.use(
  cors({
    credentials: true,
    origin: process.env.APP_FRONTEND,
  })
);

attendenceBackendApp.set("trust proxy", true);

// Enable Service Request Logging
attendenceBackendApp.use(
  morgan("combined", {
    stream: fs.createWriteStream(`./access.log`, {
      flags: "a",
    }),
  })
);



// Displaying Service Request in Console
if (process.env.NODE_ENV !== "production") {
  attendenceBackendApp.use(morgan("dev"));
}

// Log Agent Events Timeline
attendenceBackendApp.use(async (req, res, next) => {
  try {
    await logAppActivity(req, res);
  } catch (error) {
    logBackendError(__filename, error?.message);
  } finally {
    next();
  }
});

// Import Route Modules
const userRoutes = require("./routes/users/users.route");
attendenceBackendApp.use("/users", userRoutes);


// Setup Error Handler for unhandled Route Requests.
attendenceBackendApp.use(async (req, res, next) => {
  next(httpErrors.NotFound(`Route not Found for [${req.method}] ${req.url}`));
});

// Common Error Handler
attendenceBackendApp.use((err, req, res, next) => {
  const responseStatus = err.status || 500;
  const responseMessage =
    err.message || `Cannot resolve request [${req.method}] ${req.url}`;
  if (res.headersSent === false) {
    res.status(responseStatus);
    res.send({
      error: {
        status: responseStatus,
        message: responseMessage,
      },
    });
  }
});

connectToMongoDB();

// Start Express Application
((attendenceBackendAppPort) => {
  try {
    httpServer.listen(attendenceBackendAppPort, () => {
      console.log(
        `Express Application Running on Port : ${attendenceBackendAppPort}`
      );
    });
  } catch (error) {
    logBackendError(
      __filename,
      error?.message,
      null,
      null,
      "Unable to start Express Server."
    );
    console.error(`Unable to start Express Server. Error : ${error}`);
    process.exit(0);
  }
})(process.env.APP_PORT || 3600);

process.on("SIGINT", () => {
  setTimeout(() => {
    console.error("Application terminated successfully.");
    process.exit(0);
  }, 500);
});

process.on("uncaughtException", (error) => {
  logBackendError(
    __filename,
    error?.message,
    null,
    null,
    "Unable to start Express Server."
  );
  console.error(`Uncaught Exception Occured\n${error}`);
});
