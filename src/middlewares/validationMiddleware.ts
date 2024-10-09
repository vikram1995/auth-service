import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validate the request body
      next(); // If valid, continue to the next middleware/controller
    } catch (err: any) {
      res.status(400).json({
        message:
          err.errors?.map((e: any) => e.message) || "Invalid request data",
      });
    }
  };

export default validate;
