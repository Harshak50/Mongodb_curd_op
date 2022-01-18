const express = require('express');
const user_op = require('../Controllers/users');
const router = express.Router();
router.get('/',user_op.getUsers);
router.get('/:username',user_op.getSpecUser);
router.post('/:username',user_op.createUser);
router.patch('/:username',user_op.updateUser);
router.delete('/:username',user_op.deleteUser);
module.exports=router;