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

//create new post
router.post('/', (req, res) => {
	const requiredFields = ['author_id', 'title'];
	for (let i=0; i< requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			return res.status(400).send(message);
		}
	}
	return Post.create({
		author_id: req.body.author_id,
		title: req.body.title,
		content: req.body.content
	})
	.then(post => res.status(201).json(post.apiRepr()))
	.catch(err => res.status(500).json({message: 'internal server error'}));
});

module.exports = router;