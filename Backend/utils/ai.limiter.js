const rateLimit = require('express-rate-limit');

// Limit each IP to 20 requests per 10 minutes for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = aiLimiter;
