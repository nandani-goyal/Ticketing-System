// This middleware:
// ✅ checks token
// ✅ verifies token
// ✅ extracts user info
// ✅ protects routes

const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

   try {

      const authHeader = req.headers.authorization

      // CHECK TOKEN EXISTS
      if (!authHeader || !authHeader.startsWith("Bearer")) {

         return res.status(401).json({
            message: "No token provided"
         })
      }

      // GET TOKEN
      const token = authHeader.split(" ")[1]

      // VERIFY TOKEN
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      )

      // SAVE USER DATA IN REQUEST
      req.user = decoded

      next()

   } catch (error) {

      return res.status(401).json({
         message: "Invalid token"
      })
   }
}

module.exports = authMiddleware