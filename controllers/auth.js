const {
  createUser,
  loginUser,
  logoutUser,
} = require("../db/services/authServices");
const { tryCatch } = require("../helpers");

const register = async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const userUpdated = await loginUser(req.body);
  res.json({
    token: userUpdated.token,
    user: {
      email: userUpdated.email,
      subscription: userUpdated.subscription,
    },
  });
};

const logout = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
};

module.exports = {
  register: tryCatch(register),
  login: tryCatch(login),
  logout: tryCatch(logout),
};
