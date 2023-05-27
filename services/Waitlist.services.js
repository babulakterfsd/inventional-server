const Waitlist = require('../models/Waitlist.model');

module.exports.addANewEmailToWaitList = async (email) => {
    const mail = new Waitlist({email: email});
    const savedMail = await mail.save()
    return {
        email: savedMail?.email ? savedMail.email : ''
    }
}