import bcrypt from 'bcrypt';

import User from '../../src/models/UserModel';

export default async function handler(req, res){
  const {email, password} = req.body;

  const isUserExist = await User.findOne({email});

  if(isUserExist){
    res.status(200).json({ message: '[REGISTER]: User already exist', success: false});
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({email, password: hashedPassword});
  await newUser.save();
  
  res.status(201).send({message: '[REGISTER]: User created', success: true});
}