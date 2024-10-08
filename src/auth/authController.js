const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {Users, Roles, UserRoles } = require('../data/models/index');

const registerUser = async (req, res) => {
   /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign up a specific user' */
  try {
    const { username, email, password, role } = req.body;

    if ((!username || !email) || !password) {
      return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    const newUser = await Users.create({
      username,
      email,
      password,
    });

    const userRole = await Roles.findOne({ where: { name: role || 'user' } });
    if (userRole) {
      await UserRoles.create({ userId: newUser.id, roleId: userRole.id });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


const loginUser = async (req, res) => {
  /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to sign in a specific user' */
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({ token: token, userID: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};