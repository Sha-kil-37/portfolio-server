const app = require("../../app");
//

test("test should return hello admin", async () => {
  const response = await app.inject({
    method: "GET",
    url: "http://localhost:5000/portfolio/api/v1/admin/",
  });
  expect(response.statusCode).toBe(200);
});
