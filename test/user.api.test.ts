import request from "supertest";
import app from "../src/config/app";
/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {

    setTimeout(() => {
        import("../src/config/mongoose");
    }, 4000);

    let data = {
        name: 'John'
    }

    await request(app)
    .post("/api/v1/users")
    .send(data)

});



/**
 * Testing health api
 */
describe("GET /api/v1/health", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api/v1/health")
            .expect(200);
    });
});


/**
 * Testing post /users endpoint
 */
describe("POST /api/v1/users", function () {
    let data = {
        // no parameters
    };
    it("It should return 400 BAD REQUEST without name parameter", function (done) {
        request(app)
            .post("/api/v1/users")
            .send(data)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



    let data2 = {
        name: ''
    }
    it("It should return 400 BAD REQUEST with only name parameter", function (done) {
        request(app)
            .post("/api/v1/users")
            .send(data2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data3 = {
        name: 'James',
        hobbies:['asdfasdf']
    }

    it("It should return 500 error with wrong passionLevel type", function (done) {
        request(app)
            .post("/api/v1/users")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let data4 = {
        name: 'John'
    }

    it("It should return 200 OK when the user already exists", function (done) {
        request(app)
            .post("/api/v1/users")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

    let data5 = {
        name: 'Miller'
    }

    it("It should return 201 CREATED when the req.body parameter are correct", function (done) {
        request(app)
            .post("/api/v1/users")
            .send(data5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, data) => {
                if (err) return done(err);
                createdUser=data['body']['data']['_id']
                done();
            });
    });

});



/**
 * Testing get /users endpoint
 */
describe("GET /api/v1/users", function () {


    it("It should return 200 OK", function (done) {
        request(app)
            .get("/api/v1/users")
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});



/**
 * Testing get /users/:id endpoint
 */
describe("GET /api/v1/users/:id", function () {


    let id1 = 'safasfdasdf'

    it("It should return 400 BAD REQUEST with wrong type of id ", function (done) {
        request(app)
            .get("/api/v1/users/" + id1)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let id2 ='5e6e270e0e2d2c0b22f5e3a6';

    it("It should return 200 OK with correct user id ", function (done) {
        request(app)
            .get("/api/v1/users/" + id2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});



/**
 * Testing put /users/:id endpoint
 */
describe("PUT /api/v1/users/:id", function () {


    let id1 = 'safasfdasdf';
    let updateData = {

    }

    it("It should return 400 BAD REQUEST with wrong id ", function (done) {
        request(app)
            .put("/api/v1/users/" + id1)
            .send(updateData)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


/**
 * Testing delete /users/:id endpoint
 */
describe("DELETE /api/v1/users/:id", function () {


    let id1 = 'safasfdasdf'

    it("It should return 400 BAD REQUEST with wrong id ", function (done) {
        request(app)
            .delete("/api/v1/users/" + id1)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let id2 = '5e6e270e0e2d2c0b22f5e3a6';

    it("It should return 200 OK with correct hobby id ", function (done) {
        request(app)
            .delete("/api/v1/users/" + id2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});