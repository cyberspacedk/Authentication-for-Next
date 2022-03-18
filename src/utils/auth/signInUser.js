import bcrypt from 'bcrypt'

export const validateCredentials = async ({user, password}) => {
  if(!user.password) {
    throw new Error('[SIGN_IN]: Type your password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw new Error('[SIGN_IN]: Wrong credentials')
  }
  console.log('[SIGN_IN]: Credentials valid');
  return user;
}