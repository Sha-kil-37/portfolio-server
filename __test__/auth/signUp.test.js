const tap = require('tap');
const { faker } = require('@faker-js/faker');
const { build } = require('../../app');
const Admin = require('../../src/model/admin/admin.model');
require("dotenv").config();
tap.test('signup tests', async (t) => {
  const app = await build();

  t.teardown(async () => {
    await app.close();
    await Admin.deleteMany({});
  });

  await t.test('should create new admin successfully', async (t) => {
    const payload = {
      name: faker.person.fullName(),
      email: process.env.OWNER_GMAIL,
      password: faker.internet.password()
    };

    const response = await app.inject({
      method: 'POST',
      url: 'http://localhost:8000/portfolio/api/v1/admin/sign-up',
      payload
    });

    t.equal(response.statusCode, 201);
    t.same(JSON.parse(response.payload), {
      success: true,
      msg: 'Admin Created Successfully'
    });
  });

  await t.test('should return error if admin already exists', async (t) => {
    const payload = {
      name: faker.person.fullName(),
      email: process.env.OWNER_GMAIL,
      password: faker.internet.password()
    };

    // First signup
    await app.inject({
      method: 'POST',
      url: 'http://localhost:8000/portfolio/api/v1/admin/sign-up',
      payload
    });

    // Try to signup again with same email
    const response = await app.inject({
      method: 'POST',
      url: 'http://localhost:8000/portfolio/api/v1/admin/sign-up',
      payload
    });

    t.equal(response.statusCode, 400);
    t.same(JSON.parse(response.payload), {
      success: false,
      msg: 'Admin Already  Exist'
    });
  });

  await t.test('should return error for invalid email', async (t) => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await app.inject({
      method: 'POST',
      url: 'http://localhost:8000/portfolio/api/v1/admin/sign-up',
      payload
    });

    t.equal(response.statusCode, 400);
    t.same(JSON.parse(response.payload), {
      success: false,
      msg: 'Invalid Credential'
    });
  });
});



