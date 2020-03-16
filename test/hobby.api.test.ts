import request from "supertest";
import app from "../src/config/app";



/**
 * Connecting with database before running test cases
 */
beforeAll(async () => {

    setTimeout(() => {
        import("../src/config/mongoose");
    }, 4000);

    let data= {
        name: 'Running',
        passionLevel: 'high'
    };

    let createdHobby = await request(app)
    .post("/api/v1/hobbies")
    .send(data);

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
 * Testing post /hobbies endpoint
 */
describe("POST /api/v1/hobbies", function () {
    let data = {
        // no parameters
    };

    
    it("It should return 400 BAD REQUEST without name parameter", function (done) {
        request(app)
            .post("/api/v1/hobbies")
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
        name: 'swimming'
    }
    it("It should return 400 BAD REQUEST with only name parameter", function (done) {
        request(app)
            .post("/api/v1/hobbies")
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
        name: 'swimming',
        passionLevel: 'no data'
    }

    it("It should return 400 BAD REQUEST with wrong passionLevel type", function (done) {
        request(app)
            .post("/api/v1/hobbies")
            .send(data3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, data) => {
                if (err) return done(err);
                done();
            });
    });

    let data4 = {
        name: 'Running',
        passionLevel: 'low'
    }

    it("It should return 200 OK when hobby already exists", function (done) {
        request(app)
            .post("/api/v1/hobbies")
            .send(data4)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let data5 = {
        name: 'reading',
        passionLevel: 'low'
    }

    it("It should return 201 CREATED when the req.body parameter are correct", function (done) {
        request(app)
            .post("/api/v1/hobbies")
            .send(data5)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

});



/**
 * Testing get /hobbies endpoint
 */
describe("GET /api/v1/hobbies", function () {


    it("It should return 200 OK", function (done) {
        request(app)
            .get("/api/v1/hobbies")
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
 * Testing get /hobbies/:id endpoint
 */
describe("GET /api/v1/hobbies/:id", function () {


    let id1 = 'safasfdasdf'

    it("It should return 400 BAD REQUEST with wrong type of id ", function (done) {
        request(app)
            .get("/api/v1/hobbies/" + id1)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



    let id2 = '5e6e3bbe93ddaf21a272ba19';

    it("It should return 200 OK with correct hobby id ", function (done) {
        request(app)
            .get("/api/v1/hobbies/" + id2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let id3 = '5e6e3c8e9723322324fed10e';
    it("It should return 404 OK with valid but incorrect hobby id ", function (done) {
        request(app)
            .get("/api/v1/hobbies/" + id3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

});



/**
 * Testing put /hobbies/:id endpoint
 */
describe("PUT /api/v1/hobbies/:id", function () {


    let id1 = 'safasfdasdf';
    let updateData = {

    }

    it("It should return 400 BAD REQUEST with wrong id ", function (done) {
        request(app)
            .put("/api/v1/hobbies/" + id1)
            .send(updateData)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let id3 = '5e6e3c8e9723322324fed10e';
    let updateData3 = {

    }
    it("It should return 404 OK with valid but incorrect hobby id ", function (done) {
        request(app)
            .put("/api/v1/hobbies/" + id3)
            .send(updateData3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


/**
 * Testing delete /hobbies/:id endpoint
 */
describe("DELETE /api/v1/hobbies/:id", function () {


    let id1 = 'safasfdasdf'

    it("It should return 400 BAD REQUEST with wrong id ", function (done) {
        request(app)
            .delete("/api/v1/hobbies/" + id1)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let id3 = '5e6e3c8e9723322324fed10e';

    it("It should return 404 OK with valid but incorrect hobby id ", function (done) {
        request(app)
            .delete("/api/v1/hobbies/" + id3)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });



    let id2 ='5e6e3bbe93ddaf21a272ba19';

    it("It should return 200 OK with correct hobby id ", function (done) {
        request(app)
            .delete("/api/v1/hobbies/" + id2)
            .set("Content-Type", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


});
