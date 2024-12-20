// changePass.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
//
test("PATCH http://localhost:5000/portfolio/api/v1/admin/change-pass should return statusCode(200)", async () => {
  await app.ready();
  const response = await supertest(app.server)
    .patch("/portfolio/api/v1/admin/change-pass")
    .set(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNha2lsZGV2bWVybkBnbWFpbC5jb20iLCJpYXQiOjE3MzQzNDU2NDAsImV4cCI6MTczNDM0NzQ0MH0.EGLp8vsl2XTpS42U5VfvjvzecjdTqiLbtYXP1sSzLbo"
    )
    .send({
      password: "111111",
    });
  expect(200);
}, 50000);
