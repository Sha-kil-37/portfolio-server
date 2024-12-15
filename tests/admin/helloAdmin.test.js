const app = require("../../app");
//
test("GET http://localhost:5000/portfolio/api/v1/admin/ should return statusCode(200)", async () => {
  try {
    const response = app.inject({
      method: "GET",
      url: "http://localhost:5000/portfolio/api/v1/admin/",
    });
    console.log(response.statusCode);
  } catch (error) {
    console.log(error);
  }
});
