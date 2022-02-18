import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import { errors } from "celebrate";
import routes from "@shared/infra/http/routes";
import AppError from "@shared/errors/AppError";

const app = express();

/**
 * Enable Cors Policy
 */
app.use(cors());

/**
 * Allowed express to use json
 */
app.use(express.json());

/**
 * Intance of routes
 */
app.use(routes);

/**
 * Init celebrate validation
 */
app.use(errors());

/**
 * Format callback erros
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Print errors on console when code start in development mode
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  return response
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `🚀 Server running on port ${process.env.PORT || 3333} in ${
      process.env.NODE_ENV
    } mode`
  );
});
