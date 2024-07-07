const { getUsers, createUser } = require("../utility/helper");

const getUsersController = async (req, res, next) => {
  const users = await getUsers();
  return res.status(200).json(users);
};

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsersController, createUserController };
