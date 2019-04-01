const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");

module.exports = restricted;

async function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    try {
      const user = await Users.findUserByUsername(username);

      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "invalid creds" });
  }
}
