const Waitlist = require('../models/Waitlist.model');

module.exports.addANewEmailToWaitList = async (email) => {

    const isEmailExists = await Waitlist.find({email: email})
    if(isEmailExists.length > 0) {
        return {
            success: false,
            message: 'Email already exists',
            email: email
        }
    }

    const mail = new Waitlist({email: email});
    const savedMail = await mail.save()

    return {
        success: true,
        message: 'Empowering the future together',
        email: savedMail.email
    }
}