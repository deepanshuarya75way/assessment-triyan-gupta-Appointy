import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }

        const jwtSecret = "appointy_secret_key_12345"
        const adminEmail = "admin@gmail.com"
        const adminPassword = "admin123"

        const token_decode = jwt.verify(atoken, jwtSecret)
        
        if (token_decode !== adminEmail + adminPassword) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;
