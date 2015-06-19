var express         = require('express');
var router          = express.Router();

// Get to the home page
router.get('/', function (req, res) {
  return res.render('index', {
    title: 'Mean sample app'
  });
});

module.exports = router;
