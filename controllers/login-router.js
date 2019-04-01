const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");

router.post("/", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findUserByUsername(username);
    console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
