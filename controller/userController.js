
import { z } from "zod/v4"
import User from "../models/userModel.js"
import { loginSchema, registerSchema } from "../validators/authValidators.js"


export async function getAllUser(req, res) {
    const data = await User.find()
    res.status(200).json(data)
}

export async function handleRegister(req, res, next) {

    const { success, data, error } = registerSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({ error: z.flattenError(error).fieldErrors })
    }
    const { name, email, password } = data
    try {
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(409).json({
                error: "User already exists",
                message: "A user with this email address already exists. Please try logging in or use a different email."
            })
        }
        await User.insertOne({
            name,
            email,
            password
        })
        res.status(200).json({ message: "registration sucessfull" })
    } catch (err) {
        if (err.code === 121) {
            res.status(400).json({ error: "Invalid input please enter a valid input" })
        } else if (err.code === 11000) {
            res.status(409).json({ error: "Email already please enter a valid input" })
        }
        next(err)
    }

}

export async function handleLogin(req, res) {
    const { success, data, error } = loginSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({ error: "Invalid Credentials", })
    }
    const { email, password } = data
    try {
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            return res.status(400).json({
                error: "Invalid Credentials",
            })
        }
        const isValidPassword = await foundUser.comparePassword(password)

        if (!isValidPassword) {
            return res.status(400).json({
                error: "Invalid Credentials",
            })
        }
        const cookiePayload = JSON.stringify({
            id: foundUser._id.toString(),
            expiry: Math.round(Date.now() / 1000 + 100000),
        });


        res.cookie("token", Buffer.from(cookiePayload).toString("base64url"), {
            httpOnly: true,
            signed: true,
            maxAge: 60 * 1000 * 60 * 24 * 7,
            SameSite:"None",
            secure:true
        });

        return res.status(200).json({
            message: "login sucessfull"
        })

    } catch (err) {
        next(err)
    }
}

export async function setUser(req, res) {
    res.status(200).json({
        name: req.user.name,
        email: req.user.email
    })
}
export function handleLogout(req, res) {
    res.clearCookie("token")
    res.status(204).end()
}


