const { addANewEmailToWaitList } = require("../services/Waitlist.services")

module.exports.addANewEmail =  async ( req, res, next ) => {
    try {
        const result = await addANewEmailToWaitList(req.body.email)

        if(!result?.email || result?.email === '') {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            })
        }
        if(result?.email) {
            res.status(409).json({
                success: true,
                message: 'Email added to waitlist successfully',
                email: result.email
            })
        }
    } catch (error) {
        next(error)
    }
}