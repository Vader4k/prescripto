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
  image: z.preprocess(
    (files) => {
      if (files instanceof FileList) {
        return files[0];
      }
      return files;
    },
    z.instanceof(File, { message: "Image is required" })
  ),
  education: z.string().min(1, "Education is required"),
});

