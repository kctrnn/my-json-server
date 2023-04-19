require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userApi = require('../api/user-api');
const { loginSchema, registerSchema } = require('../models/auth-model');

const authController = {
  login: async (req, res) => {
    try {
      await loginSchema.validate(req.body);
    } catch (error) {
      const message = error.errors?.[0] || 'Invalid username or password';
      return res.status(400).json({ message });
    }

    // validate username and password
    const userList = await userApi.getAll();
    const { username, password } = req.body;

    const user = userList.find((x) => x.username === username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) return res.status(400).json({ message: 'Wrong password' });

    // if valid, generate a JWT and return
    const accessToken = jwt.sign({ sub: user.id }, process.env.PRIVATE_KEY);
    res.json({ accessToken });
  },

  register: async (req, res) => {
    try {
      await registerSchema.validate(req.body);
    } catch (error) {
      const message = error.errors?.[0] || 'Invalid username or password';
      return res.status(400).json({ message });
    }

    // validate username and password
    const userList = await userApi.getAll();
    const { username, password } = req.body;

    const user = userList.find((x) => x.username === username);
    if (user) return res.status(400).json({ message: 'User already exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userApi.create({
      ...req.body,
      password: hashPassword,
    });

    // if valid, generate a JWT and return
    const accessToken = jwt.sign({ sub: newUser.id }, process.env.PRIVATE_KEY);
    res.json({ accessToken });
  },

  getProfile: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const [tokenType, accessToken] = authHeader.split(' ');
      const payload = jwt.decode(accessToken);

      const user = await userApi.getById(payload.sub);
      delete user['password'];

      return res.json({ user });
    } catch (error) {
      return res.status(400).json({ message: 'Failed to get profile' });
    }
  },
};

module.exports = authController;
