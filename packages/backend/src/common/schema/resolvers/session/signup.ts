import { SignUpInput } from '../../input-type/sign-up.input';
import { UserRoles } from '../../enums/user-roles.enum';
import { Model } from "@neo4j/graphql-ogm";

interface SignUpOpts {
    User: Model
    createJWT: (data: any) => Promise<string>
    hashPassword: (password: string) => Promise<string>
}

export const createSignUp = ({User, createJWT, hashPassword}: SignUpOpts) => async (_source, { signUpInput }: { signUpInput: SignUpInput }) => {
    const [existing] = await User.find({
      where: {
        username: signUpInput.username,
      },
    });

    if (existing) {
      throw new Error(`User with username ${signUpInput.username} already exists!`);
    }
    // [user] don't work may be a typo in documentation, now seems that return a array of created users
    // else error occur `TypeError: (intermediate value) is not iterable`
    const data = await User.create({
      input: [
        {
          ...signUpInput,
          password: await hashPassword(signUpInput.password),
          roles: [UserRoles.ROLE_USER],
          metaData: JSON.stringify(signUpInput.metaData),
        }
      ]
    });

    return await createJWT({
      sub: data.users[0].id,
      username: data.users[0].username,
      roles: data.users[0].roles,
    });
  }
