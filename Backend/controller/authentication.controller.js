const User = require('../database/Schema/user.schema');
const bcrypt = require('bcryptjs');


module.exports.singUpUser = async (req, res, next) => {
  const { Name, email, password, confirmPassword, phone} = req.body;

  console.log("----->",req.body);
  const user = await User.create({
    Name,
    email,
    password,
    confirmPassword,
    phone,
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    user
  });
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error('Please provide email and password'));
  }

  const user = await User.findOne({
    email,
  }).select('+password');


  if (!user) {
    res.status(400).json({
      user: null,
    })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({
      user: null,
    })
  }

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    user
  });
};


module.exports.glogin = async (req, res) => {
    const { email, Name } = req.body;

    if (!email) {
      return next(new Error('Please provide email'));
    }
  
    const user = await User.findOne({
      email
    }).select('+password');
  
    
    if (!user) {
      user = await User.create({Name, email});
    }

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      user
    });
}

