// signIn.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
//
test("POST http://localhost:5000/portfolio/api/v1/admin/sign-in should return statusCode(200)", async () => {
  await app.ready();
  const response = await supertest(app.server)
    .post("/portfolio/api/v1/admin/sign-in")
    .send({
      email: "sakildevmern@gmail.com",
      password: "123456",
    });
  expect(200);
},50000);
