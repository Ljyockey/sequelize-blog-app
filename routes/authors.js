const express = require('express');
const router = express.Router();

const {Author, Comment, Post} = require('../models');

//get author by ID
router.get('/:id', (req, res) => Author.findById(req.params.id, {
	include: [{
		model: Post,
		as: 'posts'
	},
	{
		model: Comment,
		as: 'comments'
	}]
})
.then(author => res.json({
	authors: author.apiRepr()
}))
);

//get author's posts by author ID
router.get('/:id/posts', (req, res) => {
	return Author.findById(req.params.id, {
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

module.exports = router;