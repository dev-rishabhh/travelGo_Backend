import * as z from "zod/v4";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})
export const registerSchema = z.object({
    name: z.string("Please enter a valid name")
        .min(3, { message: "Name must be at least 3 characters" })
        .max(100, { message: "Name must not be greater than 100 characters" }),
    email: z.email("Please enter a valid email"),
    otp: z.string().regex(/^\d{4}$/, {
        message: "OTP must be 4 digit number "
    }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(12, { message: "Password must not be greater than 12 characters" })
})