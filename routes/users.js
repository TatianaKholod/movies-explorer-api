const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaUser } = require('../utils/celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate(ShemaUser), updateUser);
module.exports = router;
