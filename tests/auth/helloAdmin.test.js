// helloAdmin.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
//
test("GET http://localhost:5000/portfolio/api/v1/admin/ should return statusCode(200)", async () => {
  await app.ready();
  const response = await supertest(app.server)
    .get("/portfolio/api/v1/admin/")
    .expect(200);
});
