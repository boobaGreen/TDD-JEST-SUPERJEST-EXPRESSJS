const { createUser } = require("../../utility/helper");

describe("it should test all utility functions", () => {
  it("should create user properly", async () => {
    const userData = {
      name: "test",
      email: "test@gmail.com",
      password: "test123",
    };

    const user = await createUser(userData);

    expect(user).toEqual(
      expect.objectContaining({
        _id: expect.any(Object),
        name: expect.any(String),
      })
    );

    expect(user.name).toBe(userData.name);

    expect(user.email).toBe(userData.email);

    expect(user.password).not.toBe(userData.password);
  });
});
