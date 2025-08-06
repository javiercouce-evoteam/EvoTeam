import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema, ZodError } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidatedRequest<T = any> extends Request {
  validatedData?: T;
}

/**
 * Middleware to validate request data using Zod schemas
 * @param schema - Zod schema to validate against
 * @param source - Which part of the request to validate ('body', 'query', 'params')
 */
export const validateSchema = <T>(
  schema: ZodSchema<T>,
  source: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = req[source];

      // Parse and validate the data
      const validatedData = schema.parse(dataToValidate);

      // Attach validated data to request object
      (req as ValidatedRequest<T>).validatedData = validatedData;

      // Replace the original data with sanitized/validated data
      req[source] = validatedData;

      next();
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        const zodError = error as ZodError;

        const validationErrors: ValidationError[] = zodError.issues.map(
          issue => ({
            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code,
          })
        );

        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validationErrors,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // Handle unexpected errors
      res.status(500).json({
        success: false,
        error: 'Internal validation error',
        timestamp: new Date().toISOString(),
      });
    }
  };
};

/**
 * Utility function to create a validation middleware for request body
 */
export const validateBody = <T>(schema: ZodSchema<T>) =>
  validateSchema(schema, 'body');

/**
 * Utility function to create a validation middleware for query parameters
 */
export const validateQuery = <T>(schema: ZodSchema<T>) =>
  validateSchema(schema, 'query');

/**
 * Utility function to create a validation middleware for route parameters
 */
export const validateParams = <T>(schema: ZodSchema<T>) =>
  validateSchema(schema, 'params');
