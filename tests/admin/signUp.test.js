const app = require("../../app");
//
test("POST http://localhost:5000/portfolio/api/v1/admin/sign-up should return statusCode(201)", async () => {
  try {
    const response = app.inject(
      {
        method: "POST",
        url: "http://localhost:5000/portfolio/api/v1/admin/sign-up",
        payload: {
          name: "shakil",
          email: "sakildevmern@gmail.com",
          password: "123456",
        },
      },
      1000
    );
    console.log(response.statusCode);
  } catch (error) {
    console.log(error);
  }
});
