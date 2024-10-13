import { z } from "zod";

export const RegistrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password should be at least 5 characters long"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "password should be at least 5 characters lonng"),
});

export const UpdateUserInfoSchema = z
  .object({
    name: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || val.length >= 3, {
        message: "Username should be at least 3 characters",
      }),
    phone: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || val.length >= 10, {
        message: "Phone number too short",
      }),
    image: z.preprocess((files) => {
      if (files instanceof FileList && files.length > 0) {
        return files[0];
      }
      return null; // Handle the case where no image is provided
    }, z.instanceof(File).optional().nullable()), // Optional image validation
    gender: z.enum(["Male", "Female"]).optional().nullable(),
    dob: z.string().optional().nullable(),
    address: z
      .object({
        line1: z.string().optional().nullable(),
        line2: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      // Check if at least one field has been provided/updated
      return (
        data.name ||
        data.phone ||
        data.image ||
        data.gender ||
        data.dob ||
        (data.address && (data.address.line1 || data.address.line2))
      );
    },
    {
      message: "At least one field must be updated",
    }
  );
