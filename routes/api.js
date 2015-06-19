var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var Post        = mongoose.model('Post');


router.use(function (req, res, next) {

  if(req.method === 'GET') {
    // continue to the next middleware or the request handeler
    return next();
  }

  if(!req.isAuthenticated()) {

    // user not authenticated, redirect to login page
    return res.redirect('/#login');
  }

  return next();
});

router.route('/posts')
  // return all the posts
  .get(function (req, res) {

    Post.find( function(err, data) {

      // if stuck in some error
      if (err) {
        return res.send(500, err);
      }

      // if there is not error and we have the data
      return res.send(data);

    });
  })
  // creates a new post
  .post(function (req, res) {

    var newPost         = new Post();
    newPost.text        = req.body.text;
    newPost.username  = req.body.username;

    Post.insert( function(err, newPost) {

      // if stuck in some error
      if (err) {
        return res.send(500, err);
      }

      // if there is not error and we have the data
      return res.json(newPost);

    });
  });

router.route('/posts/:id')
  // return id based posts
  .get(function (req, res) {
    var getPost = new Post();
    getPost.findById(req.params.id, function (err, post) {

      // if stuck in some error
      if (err) {
        return res.send(500, err);
      }

      return res.send(post);
    });
  })

  // modifies the posts
  .put(function (req, res) {

    Post.findById(req.params.id, function (err, post) {

      // if stuck in some error
      if (err) {
        return res.send(500, err);
      }

      getPost.username  = req.body.creadted_by;
      getPost.text      = req.text;
      Post.save(function (err, post) {

        // if stuck in some error
        if (err) {
          return req.send(500, err);
        }
        return res.json(post);
      });
    });
  })

  // delets the posts
  .delete(function (req, res) {

    // call a function to delete the post
    Post.remove(req.params.id, function(err, post) {

      // if stuck in some error
      if (err) {
        return req.send(500, err);
      }

      // if all goes well delete the post
      return res.json('Post delete with id ' + req.params.id);
    });
  });

module.exports = router;
