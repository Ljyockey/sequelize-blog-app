const express = require('express');
const router = express.Router();

const {Author, Post, Comment} = require('../models');


//get all posts
router.get('/', (req, res) =>
	Post.findAll({
		include: {
			model: Comment,
			as: 'comments'
		}
	})
	.then(posts => 
		res.json({posts: posts.map(post => post.apiRepr())
		})));

//get all comments for post
router.get('/:id/comments', (req, res) => {
	return Post.findById(req.params.id, {
		include: {
			model: Comment,
			as: 'comments'
		}
	})
	.then(post => {
		res.json({comments: post.comments.map(comment => 
			comment.apiRepr())
	});
	});
});

module.exports = router;