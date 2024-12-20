// signUp.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
//
test("POST http://localhost:5000/portfolio/api/v1/admin/sign-up should return statusCode(201)", async () => {
  await app.ready();
  const response = await supertest(app.server)
    .post("/portfolio/api/v1/admin/sign-up")
    .send({
      name: "shakil",
      email: "sakildevmern@gmail.com",
      password: "123456",
    });
  expect(201)
}, 50000);
