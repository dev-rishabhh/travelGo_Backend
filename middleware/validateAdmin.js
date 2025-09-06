export default async function validateAdmin(req, res, next) {
    const  user = req.user;
    
    if (user.role ==='user') {
        return res.status(403).json({ error: "Permission denied " })
    }

    next()
}