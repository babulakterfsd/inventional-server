const { addANewEmailToWaitList } = require("../services/Waitlist.services")

module.exports.addANewEmail =  async ( req, res, next ) => {
    try {
        const result = await addANewEmailToWaitList(req.body.email)

        if(result.success) {
            return res.status(201).json({
                success: true,
                message: result.message,
                email: result.email
            })
        } else {
            return res.status(403).json({
                success: false,
                message: result.message,
                email: result.email
            })
        }
        
    } catch (error) {
        next(error)
    }
}