const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {Comment, Author, Post} = require('../models');
const {buildAuthor, buildPost, buildComment, dropTables, seedTestData} = require('./helper');

chai.use(chaiHttp);


describe('Authors API resource', function() {

	beforeEach(function() {
		return dropTables()
		.then(function() { 
			return seedTestData();
		});
	});

	describe('GET endpoints', function() {

		it('should return author by ID', function() {
			let author;
			return Author.findOne()
			.then(function(_author) {
				author = _author;
				return chai.request(app)
				.get(`/authors/${author.id}`)
			})
			.then(function(res) {
				res.should.have.status(200);
				res.body.id.should.equal(author.id);
			});
		});

		it('should return posts by author ID', function() {
			let author;
			return Author.findOne()
			.then(function(_author) {
				author = _author;
				return chai.request(app)
				.get(`/authors/${author.id}/posts`)
			})
			.then(function(res) {
				res.should.have.status(200);
			});
		});

	});

});