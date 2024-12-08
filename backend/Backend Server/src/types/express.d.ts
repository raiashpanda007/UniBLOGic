import "express"; // Ensure you import the original Express types

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // Adjust the type to match your application's `decoded` JWT payload
        email: string;
        role: string;
      }
      files?: {
        [fieldname: string]: Express.Multer.File[]; // Handle multiple file fields
      };
    }
  }
}
