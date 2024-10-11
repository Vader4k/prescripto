import { z } from "zod";

export const RegistrationSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password should be at least 5 characters long"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "password should be at least 5 characters lonng"),
});

export const UpdateUserInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .optional()
    .nullable(), // Allow null values
  phone: z.string().min(10, "Phone number too short").optional().nullable(), // Allow null values
  image: z
    .preprocess((files) => {
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return files;
    }, z.instanceof(File, { message: "Image is required" }))
    .optional()
    .nullable(),
  gender: z.enum(["Male", "Female"]).optional().nullable(),
  dob: z.string().optional().nullable(),
  address: z
    .object({
      line1: z.string().optional(),
      line2: z.string().optional(),
    })
    .optional()
    .nullable(),
});
