const request = require("supertest");
const dotenv = require("dotenv").config();
const app = require("../app");

describe("testing authentication", () => {
  it("it should just pass", async () => {
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
});
