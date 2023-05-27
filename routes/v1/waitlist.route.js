const express = require('express');
const WaitListController = require('../../controllers/Waitlist.controller');
const router = express.Router();

router.route('/').post(WaitListController.addANewEmail)

module.exports = router;
