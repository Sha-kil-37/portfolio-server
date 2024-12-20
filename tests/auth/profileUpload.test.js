// profileUpload.test.js
const supertest = require("supertest");
const app = require("../../app");
afterAll(() => app.close());
const path = require("path");
//
test("PATCH http://localhost:5000/portfolio/api/v1/admin/profile-upload should return statusCode(200)", async () => {
  const filePath = path.join(__dirname, "../files/images/animal-9156395_1280.jpg");
  await app.ready();
  const response = await supertest(app.server)
    .patch("/portfolio/api/v1/admin/profile-upload")
    .set(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNha2lsZGV2bWVybkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ0NDg5OTQsImV4cCI6MTczNDQ1MDc5NH0.gSL2RKFoW4XdIbvKeHBM2ezKEy9sS71ObX_ftMMStZc"
    )
    .set("Content-Type", "multipart/form-data") // Set the correct content type
    .attach("profiles", filePath); // Attach the file with the key expected by the backend
  expect(200);
}, 100000);
