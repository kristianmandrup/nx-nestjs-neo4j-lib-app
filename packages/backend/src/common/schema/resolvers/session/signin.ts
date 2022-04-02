import { Model } from '@neo4j/graphql-ogm';
import { SignInInput } from '../../input-type';

type JWTdata = {
  [key: string]: any
}

interface SignInOpts {
    User: Model
    createJWT: (data: JWTdata) => Promise<string>
    comparePassword: (password: string, passwordHash: string) => Promise<boolean>
}

export const createSignIn = ({User, comparePassword, createJWT }: SignInOpts) => async (_source, { signInInput }: { signInInput: SignInInput }) => {
    const [user] = await User.find({
      where: {
        username: signInInput.username,
      },
    });

    if (!user) {
      throw new Error(`User with username ${signInInput.username} not found!`);
    }

    const correctPassword = await comparePassword(signInInput.password, user.password);

    if (!correctPassword) {
      throw new Error(`Incorrect password for user with username ${signInInput.username}!`);
    }

    return await createJWT({
      sub: user.id,
      username: user.username,
      roles: user.roles,
    });
}