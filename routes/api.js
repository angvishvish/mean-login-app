var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route('/posts')
  // return all the posts
  .get(function (req, res) {
    res.send({ message: "Todo: return all post"});
  })
  // creates a new post
  .post(function (req, res) {
    res.send({ message: "Todo: Create a new post"});
  });

router.route('/posts/:id')
  // return id based posts
  .get(function (req, res) {
    res.send({ message: "Todo return post with ID " + req.params.id});
  })

  // modifies the posts
  .put(function (req, res) {
    res.send({ message: "Todo Update post with ID " + req.params.id});
  })

  // delets the posts
  .delete(function (req, res) {
    res.send({ message: "Todo Delete post with ID " + req.params.id});
  });

module.exports = router;
