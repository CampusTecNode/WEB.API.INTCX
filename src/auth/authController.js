const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const { sendPasswordResetEmail } = require('../helpers/emailService');
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

    console.log(username, password);

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

    res.json({ token: token, 
      userID: user.id, 
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      imageURL:  user.imageURL,
      customerID: 'cus_R0u5BxAeykbbZm' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const sendResetEmail = async (req, res) => {
  /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to send reset email' */
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    const resetToken = bcrypt.genSaltSync(10);
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // Guardar el token en la base de datos con un tiempo de expiración
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const resetURL = `https://web-api-intcx.onrender.com?reset-password?token=${hashedToken}`;

    await sendPasswordResetEmail(user.email, resetURL);
    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return res.status(500).json({ message: 'Failed to send password reset email' });
  }
};

const resetPassword = async (req, res) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to reset password' */
  const { token, newPassword } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Actualizar la contraseña y limpiar el token
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password has been updated' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
    /* 	#swagger.tags = ['Auth']
        #swagger.description = 'Endpoint to send change email' */
  const { userID } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await Users.findByPk(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar que la contraseña actual proporcionada es correcta
    const isMatch = currentPassword === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from the current password' });
    }

    // Actualizar la contraseña en la base de datos (la contraseña ya viene hasheada desde el frontend)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: 'Password has been updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  sendResetEmail,
  resetPassword,
  changePassword
};