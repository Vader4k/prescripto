import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const addDoctorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  experience: z.string().min(1, "Experience is required"),
  fees: z.number().min(1, "Fees is required"),
  about: z.string().min(1, "About is required"),
  address: z.object({
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    addressLine2: z.string().min(1, "Address Line 2 is required"),
  }),
  speciality: z.string().min(1, "Speciality is required"),
  image: z.preprocess((files) => {
    if (files instanceof FileList) {
      return files[0];
    }
    return files;
  }, z.instanceof(File, { message: "Image is required" })),
  degree: z.string().min(1, "Degree is required"),
});

export const updateDoctorProfileSchema = z
  .object({
    fees: z
      .preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number().optional().nullable()
      )
      .refine((val) => val !== undefined && (val === null || val >= 0), { // Added check for undefined
        message: "Fees must be greater than or equal to 0",
      }),
    availability: z.boolean().optional().nullable(),
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
      //check if at least one data is available to be sent for change
      return (
        data.fees ||
        data.availability ||
        (data.address &&
          (data.address.line1 || data.address.line2))
      );
    },
    {
      message: "Please provide at least one field to update",
    }
  );
