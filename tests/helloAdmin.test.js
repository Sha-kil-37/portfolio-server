// helloAdmin.test.js
const supertest = require("supertest");
const app = require("../app");
afterAll(() => app.close());
//
test("GET http://localhost:5000/portfolio/api/v1/admin/ should return hello admin", async () => {
  try {
    await app.ready();
    const response = await supertest(app.server)
      .get("/portfolio/api/v1/admin/")
      .expect(200);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
