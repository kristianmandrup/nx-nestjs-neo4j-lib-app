import { comparePassword, createJWT, hashPassword } from '../../../utils';
import { User } from '../ogm'
import { createSignIn } from './signin';
import { createSignUp } from './signup';

// init ogm
const signUp = createSignUp({User, createJWT, hashPassword })
const signIn = createSignIn({User, createJWT, comparePassword })

export const sessionResolvers = {
  signUp,
  signIn
};
