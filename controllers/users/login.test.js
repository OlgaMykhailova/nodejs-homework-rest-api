const mongoose = require("mongoose");
const request = require("supertest");
const { User } = require("../../models");

const app = require("../../app");

require("dotenv").config();

mongoose.set("strictQuery", true);

const { DB_HOST } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  it("status code must be 200", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(res.statusCode).toBe(200);
  });
  it("token must exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(res.body.data.token).not.toBe(undefined);
  });
  it("token must be string", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(typeof res.body.data.token).toBe("string");
  });
  it("token must be valid", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    const user = await User.findOne({ email: "test@mail.com" });
    expect(res.body.data.token).toBe(user.token);
  });
  it("user must exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(res.body.data.user).not.toBe(undefined);
  });
  it("user must be object", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(typeof res.body.data.user).toBe("object");
  });
  it("email must exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(res.body.data.user.email).not.toBe(undefined);
  });
  it("subscription must exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(res.body.data.user.subscription).not.toBe(undefined);
  });
  it("email must be string", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(typeof res.body.data.user.email).toBe("string");
  });
  it("subscription must be string", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@mail.com",
      password: "password",
    });
    expect(typeof res.body.data.user.subscription).toBe("string");
  });
});
