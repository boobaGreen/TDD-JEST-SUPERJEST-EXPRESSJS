const request = require("supertest");
const dotenv = require("dotenv").config();
const app = require("../app");
const users = require("./data/users");

describe("testing authentication", () => {
  it("it should get list of users", async () => {
    const { body, statusCode } = await request(app).get("/api/auth/register");
    expect(statusCode).toBe(200);

    expect(body.length).toBeGreaterThan(0);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
        }),
      ])
    );
  });

  it("should create user properly", async () => {
    const userData = {
      name: "ancoraTest",
      email: "ancoratest@yahoo.it",
      password: "ciaoancora123",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(statusCode).toBe(201);
    expect(body.name).toBe(userData.name);
    expect(body.email).toBe(userData.email);
    expect(body.password).not.toBe(userData.password);
  });

  it("should not create user with invalid-empty data", async () => {
    const userData = {
      name: "",
      email: "",
      password: "",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(userData);
    expect(body.error).toBeTruthy();
  });

  it("should login user properly", async () => {
    const userData = users[0];
    const { body, statusCode, headers } = await request(app)
      .post("/api/auth/login")
      .send(userData);

    const token = headers["set-cookie"][0].split("=")[1];
    //estrai jwt dal cookie

    expect(token).toBeTruthy();
    expect(token).toBeDefined();
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      })
    );
    expect(body.email).toBe(userData.email);
    expect(body.name).toBe(userData.name);
  });

  it("should not login user with invalid credentials", async () => {
    const userData = { email: "nonvalidemail@gmail.com", password: "invalid" };
    const { body, statusCode } = await request(app)
      .post("/api/auth/login")
      .send(userData);

    expect([404]).toContain(statusCode);

    expect(body.error).toBeTruthy();
    expect(body.error).toBe("User not found");
  }, 10000); // Increased timeout for this test

  it("it should check for authentication", async () => {
    //login user
    const userData = users[0];
    const loginUser = await request(app).post("/api/auth/login").send(userData);
    const token = loginUser.headers["set-cookie"][0].split("=")[1];
    // make a request with the token to check if the user is authenticated
    const { body, statusCode } = await request(app)
      .get("/api/auth")
      .set("Cookie", `jwt=${token}`);
    console.log("status code", statusCode);
  });
});
