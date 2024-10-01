import {z} from 'zod'

export const RegistrationSchema = z.object({
    fullname: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password should be at least 5 characters long")
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "password should be at least 5 characters lonng")
})