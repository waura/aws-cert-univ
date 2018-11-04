var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});
router.get('/', function(req, res) {
  res.json({ message: 'welcome to our api!'});
});

router.route('/questions').post(function(req, res) {
  var question = new Question();
  question.name = req.body.name;

  // save the bear and check for errors
  question.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Question created!' });
  });
});

module.exports = router;
