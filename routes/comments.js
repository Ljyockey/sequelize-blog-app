const express = require('express');
const router = express.Router();

const {Author, Comment, Post} = require('../models');

//post new comment
router.post('/', (req, res) => {
	const requiredFields = ['commentText', 'author_id', 'post_id'];
	for (let i = 0; i< requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	return Comment.create({
		commentText: req.body.commentText,
		author_id: req.body.author_id,
		post_id: req.body.post_id
	})
	.then(comment => res.status(201).json(comment.apiRepr()))
	.catch(err => res.status(500).send('internal server error'));
});


module.exports = router;