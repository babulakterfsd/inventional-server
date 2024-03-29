/* this middleware is used to limit the number of requests to the api to 1 per minute */

const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    message: { 
        success: false,
        message: 'Too many requests, please try again later.'
    },
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = limiter;