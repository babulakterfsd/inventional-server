/*

just get the object from the of_data_raws collection where is_validated is False
then take the ig_url
if profile doesn't exist 
=> set is_validated to True
=> set is_valid to False
if profile exists:
=> set is_validated to True
=> set is_valid to True
=> set the follower_count
=> update the validated_ig_url to the url you have
=> update the ig_bio to the description you have

*/

const { getAllTheUserNameService } = require("../services/Task.services")

module.exports.getAllTheUserNames =  async ( req, res, next ) => {
    const result = await getAllTheUserNameService()

    if(result?.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Usernames fetched successfully',
        })
    } else {
        res.status(404).json({
            success: false,
            message: 'No usernames found',
        })
    }
}