### Graphql Apollo sample

### Installation

`npm install`

### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

## NestJS Server

Server is configured and bootstrapped in `src/main.ts`

## App module


- Authentication: `AuthController, AuthModule, AuthOptions, AuthService, JwtModule`
- User - `UserModule, UserService`
- GraphQL API `GraphQLModule`
- OGM (Object Graph Mapper) `OgmService`

## User Service

The User Service uses OGM Service

- `validateFreeUserEmail` validate if email is free/available for use
- `validateEmail` validate if email is valid
- `create` create new user
- `findAll` find all users
- `findOneByField` find one user by field
- `update` update user
- `delete` delete user
- `updatePassword` update user password
- `updateProfile` update user profile

### User Resolver

`UserResolver` is a GraphQL resolver which uses the `UserService` to resolve user actions

Queries

- `users`
- `userProfile`
- `userById`
- `userByUsername`

Mutations

- `userRegister`
- `userUpdate`
- `userDelete`
- `userUpdatePassword`
- `userUpdateProfile`

Subscriptions

- `userAdded`
- `userUpdated`
- `userPasswordUpdated`
- `userProfileUpdated`
- `userCitizenCardUpserted`

### In-memory user model

`UserStore` is an in-memory list of users
`UserInMemory` is a User model for in-memory use

## Domain model

The current domain model is cats and owners
### Owners model

The `OwnersService` can find an owner by Id

```ts
export class OwnersService {
  private readonly owners: Owner[] = [{ id: 1, name: 'Jon', age: 5 }];

  findOneById(id: number): Owner {
    return this.owners.find(owner => owner.id === id);
  }
}
```

### Cats model

The `CatsResolver` is a GraphQL resolver which uses the `CatsService` to resolve cats.

- `cats` - `getCats`
- `cat` - `findOneById`
- `createCat` - `create`
- `catCreated` (subscription)

The `CatOwnerResolver` can find the owner of a cat by using the `OwnersService`

- `owner` find owner of the cat

The `CatsService` can create, list and find a single cat by Id.

```ts
export class CatsService {
  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: 'Cat', age: 5, ownerId: 1 },
  ];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }
}
```

## GraphQL Schema

Cats and Owners schema is defined in `cats/cats.graphql`
## Generated Typings from GraphQL Schemas

Generated types in `src/graphql.schema.ts` via `src/generate-typings.ts` generator

```ts
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  outputAs: 'class',
  watch: true,
}
```

```ts
export class Owner {
    id: number;
    name: string;
    age?: number;
    cats?: Cat[];
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
    owner?: Owner;
}
```

## Koakh

Standalone package with GraphQL JWT authentication, where we can inject a `UserService` that implements the `UserServiceAbstract` contract, this way we can use different `UserService` implementations like inMemory users, used to test or quick start, and other kind data base/orm implementations like `TypeOrm`, `Mongoose`, `Neo4J`, `Postgres` etc