let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require("../index");


chai.should();

chai.use(chaiHttp);

describe("Task Tweet API", () => {

	describe("GET /api/tweet/list/:id", () => {
		it("It should get all tweets by user id", (done) => {

			const user_id = 1;

			chai.request(server)
				.get("/api/tweet/list/" + user_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('data');
					res.body.code.should.be.eq(200);
					res.body.data.should.be.a('array');
					done();
				});
		});

		it("It should not get any tweet when the user id is not existed", (done) => {

			const user_id = 99999;
			chai.request(server)
				.get("/api/tweet/list/" + user_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('User is not exsited');
					done();
				});
		});
	});


	describe("GET /api/tweet/:id", () => {
		it("It can get the tweet by tweet id", (done) => {

			const tweet_id = 4;

			chai.request(server)
				.get("/api/tweet/" + tweet_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('data');
					res.body.code.should.be.eq(200);
					res.body.data.should.be.a('object');
					res.body.data.should.be.property('id');
					res.body.data.should.be.property('poster_id');
					res.body.data.should.be.property('content');
					res.body.data.should.be.property('img_src');
					res.body.data.should.be.property('gif_src');
					res.body.data.should.be.property('emoji_src');
					res.body.data.should.be.property('like_count');
					res.body.data.should.be.property('unlike_count');
					res.body.data.should.be.property('retweet_count');
					res.body.data.should.be.property('createdAt');
					res.body.data.should.be.property('updatedAt');
					done();
				});
		});

		it("It cannot get the tweet when tweer id is not existed", (done) => {

			const tweet_id = 199999;

			chai.request(server)
				.get("/api/tweet/" + tweet_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Tweet id is not existed');
					done();
				});
		});
	});


	describe("POST /api/tweet/create", () => {
		it("It can create the tweet", (done) => {

			const tweet = {
				poster_id: 1,
				content: 'hi'
			}

			chai.request(server)
				.post("/api/tweet/create")
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('data');
					res.body.code.should.be.eq(200);
					res.body.data.should.be.a('object');
					res.body.data.should.be.property('id');
					res.body.data.should.be.property('poster_id');
					res.body.data.should.be.property('content');
					res.body.data.should.be.property('like_count');
					res.body.data.should.be.property('unlike_count');
					res.body.data.should.be.property('retweet_count');
					res.body.data.should.be.property('createdAt');
					res.body.data.should.be.property('updatedAt');
					done();
				});
		});

		it("It cannot create the tweet when poster_id property is not existed", (done) => {

			const tweet = {
				content: 'hi'
			}

			chai.request(server)
				.post("/api/tweet/create")
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Poster id or content cannot be null or empty');
					done();
				});
		});

		it("It cannot create the tweet when content property is not existed", (done) => {

			const tweet = {
				poster_id: 1
			}

			chai.request(server)
				.post("/api/tweet/create")
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Poster id or content cannot be null or empty');
					done();
				});
		});

		it("It cannot create the tweet when poster_id (User) is not existed", (done) => {

			const tweet = {
				poster_id: 9999,
				content: 'hi'
			}

			chai.request(server)
				.post("/api/tweet/create")
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('User is not exsited');
					done();
				});
		});

	});


	describe("PATCH /api/tweet/update", () => {
		it("It can update the tweet", (done) => {

			const tweet = {
				user_id: 1,
				content: 'changed'
			};

			const tweet_id = 13;

			chai.request(server)
				.patch("/api/tweet/update/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('data');
					res.body.code.should.be.eq(200);
					res.body.data.should.be.a('object');
					res.body.data.should.be.property('id');
					res.body.data.should.be.property('poster_id');
					res.body.data.should.be.property('content');
					res.body.data.should.be.property('like_count');
					res.body.data.should.be.property('unlike_count');
					res.body.data.should.be.property('retweet_count');
					res.body.data.should.be.property('createdAt');
					res.body.data.should.be.property('updatedAt');
					res.body.data.should.be.property('img_src');
					res.body.data.should.be.property('gif_src');
					res.body.data.should.be.property('emoji_src');
					done();
				});

		});

		it("It cannot update the tweet when content property is not existed", (done) => {

			const tweet = {
				user_id: 1
			};

			const tweet_id = 13;

			chai.request(server)
				.patch("/api/tweet/update/" + tweet_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Content or user id cannot be empty or null');
					done();
				});
		});

		it("It cannot update the tweet when user_id property is not existed", (done) => {

			const tweet = {
				content: "changed"
			};

			const tweet_id = 3;

			chai.request(server)
				.patch("/api/tweet/update/" + tweet_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Content or user id cannot be empty or null');
					done();
				});
		});

		it("It cannot update the tweet when tweet is not existed", (done) => {

			const tweet = {
				user_id: 1,
				content: 'changed'
			};

			const tweet_id = 19999;

			chai.request(server)
				.patch("/api/tweet/update/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Tweet is not existed');
					done();
				});
		});

		it("It cannot update the tweet when tweet poster_id is not equal to user_id", (done) => {

			const tweet = {
				user_id: 1999999,
				content: 'changed'
			};

			const tweet_id = 13;

			chai.request(server)
				.patch("/api/tweet/update/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq("You don't have the permission to update the tweet");
					done();
				});
		});

	});


	describe("DELETE /api/tweet/delete", () => {
		it("It can delete the tweet", (done) => {

			const tweet = {
				user_id: 1
			};

			const tweet_id = 1;

			chai.request(server)
				.delete("/api/tweet/delete/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('data');
					res.body.code.should.be.eq(200);
					res.body.data.should.be.a('object');
					res.body.data.should.be.property('id');
					res.body.data.should.be.property('poster_id');
					res.body.data.should.be.property('content');
					res.body.data.should.be.property('like_count');
					res.body.data.should.be.property('unlike_count');
					res.body.data.should.be.property('retweet_count');
					res.body.data.should.be.property('createdAt');
					res.body.data.should.be.property('updatedAt');
					res.body.data.should.be.property('img_src');
					res.body.data.should.be.property('gif_src');
					res.body.data.should.be.property('emoji_src');
					done();
				});
		});

		it("It cannot update the tweet when user_id property is not existed", (done) => {

			const tweet_id = 4;

			chai.request(server)
				.delete("/api/tweet/delete/" + tweet_id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq("You don't have the permission to delete the tweet");
					done();
				});
		});

		it("It cannot delete the tweet when user_id property is not equal to the poster_id", (done) => {


			const tweet_id = 13;
			const tweet = {
				user_id: 199999
			};

			chai.request(server)
				.delete("/api/tweet/delete/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq("You don't have the permission to delete the tweet");
					done();
				});
		});

		it("It cannot delete the tweet when tweet is not existed", (done) => {

			const tweet = {
				user_id: 1
			};

			const tweet_id = 19999;

			chai.request(server)
				.delete("/api/tweet/delete/" + tweet_id)
				.send(tweet)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('code');
					res.body.should.have.property('error');
					res.body.code.should.be.eq(400);
					res.body.error.should.be.eq('Tweet id is not existed');
					done();
				});
		});

	});


});
