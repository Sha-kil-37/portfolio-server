// forgotPassEmailVerify.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
//
test("PATCH http://localhost:5000/portfolio/api/v1/admin/forgot-email-verify should return statusCode(200)", async () => {
  await app.ready();
  const response = await supertest(app.server)
    .post("/portfolio/api/v1/admin/forgot-email-verify")
    .send({
      email: "sakildevmern@gmail.com",
    });
  expect(200);
}, 50000);
