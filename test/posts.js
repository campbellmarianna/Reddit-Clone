// test/posts.js
const router = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we can use it in our tests
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

// Post that we'll use for testing purposes
const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
};

describe('Posts', function() {
    const agent = chai.request.agent(server);
    it("should create with valid attributes at POST /posts/new", function (done) {
        // Check how many posts there are now
        const initialDocCount = Post.estimatedDocumentCount();
            chai.request(router)
                .post("/posts/new")
                // This line fakes a form post,
                // since we're not actually filling out a form
                .set("content-type", "application/x-www-form-urlencoded")
                // Make a request to create another
                .send(newPost)
                .then(function (res) {
                    const newDocCount = Post.estimatedDocumentCount()
                    .then(function (newDocCount) {
                        // Check that the database has one more post in it
                        expect(res).to.have.status(200);
                        // Check that the database has one more post in it
                        expect(newDocCount).to.be.equal(initialDocCount + 1)
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })

        });
    });
});

after(function () {
    Post.findoneAndDelete(newPost);
});
