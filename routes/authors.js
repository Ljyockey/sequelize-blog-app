const express = require('express');
const router = express.Router();

const {Author, Comment, Post} = require('../models');

//get author by ID
router.get('/:id', (req, res) => Author.findById(req.params.id)
.then(author => res.json({
	authors: author.apiRepr()
}))
);

//get author's posts by author ID
router.get('/:id/posts', (req, res) => {
	Author.findById(req.params.id, {
		include: [{
			model: Post,
			as: 'posts'
		}]
	})
	.then(author => 
		res.json({posts: author.posts.map(post => post.apiRepr())
		}));
});

//gets all comments from author
router.get('/:id/comments', (req, res) => {
	Author.findById(req.params.id, {
		include: [{
			model: Post,
			as: 'posts'
		},
		{
			model: Comment,
			as: 'comments'
		}]
	})
	.then(author =>
		res.json({comments: author.comments.map(comment => comment.apiRepr())
		}));
});

//post new author
router.post('/', (req, res) => {
	return Author.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username
	})
	.then(author => res.status(201).json(author.apiRepr()))
	.catch(err => res.status(500).send(err));
});


//update author
router.put('/:id', (req, res) => {
	if (req.params.id !== req.body.id.toString()) {
		const message = 'IDs in req.params and req.body must match';
		console.error(message);
		return res.status(400).send(message);
	}
	const toUpdate = {}
	const possibleFields = ['firstName', 'lastName', 'username'];
	possibleFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});
	return Author.update(toUpdate, {
		where: {
			id: req.params.id
		}
	})
	.then(author => res.status(204).end())
	.catch(err => res.status(500).json({message: 'internal server error'}));
});


module.exports = router;