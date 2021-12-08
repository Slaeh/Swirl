const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { body } = request;

  let user = await User.findOne({ email: body.email });

  if (user) {
    return response.status(401).json({
      error: "email is taken",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  user = new User({
    email: body.email,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.json(savedUser);
});

module.exports = usersRouter;
