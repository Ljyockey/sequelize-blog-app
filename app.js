const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const authorsRouter = require('./routes/authors');
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/authors', authorsRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

app.use('*', function(req, res) {
	res.status(404).json({message: 'Not found'});
});

module.exports = app;