This is a forked version of [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
$ yarn install
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Realm Custom Auth Example

1. Setup a Linked Data Source, it will link up with a collection, e.g. 'users'. The `Realm Service Name` will be important later on for creating a custom auth function.
2. Create a custom auth function at the Build-->Function tab, below is an example.

```
  exports = async(loginPayload) => {
    const REALM_SERVICE_NAME = "mongodb-atlas";
    const DATABASE_NAME = "vercel-realm-email-link-auth";
    const COLLECTION_NAME = "users";
    const users = context.services
    .get(REALM_SERVICE_NAME)
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAME);

    // Parse out custom data from the FunctionCredential
    const { email,secrete } = loginPayload;
    // Query for an existing user document with the specified username


    const user = await users.findOne({
      email,secrete
    });
    console.log(JSON.stringify(context.user.custom_data))
        console.log("context.user.custom_data")
    return Object.assign(user,{id:user._id.toString()});
    // return user;
  };
```

3. Integrating this function into the next.js backend. This is done by setting up the `REALM_FUNC_ID`, here is the simple tutorial: https://docs.mongodb.com/realm/get-started/find-your-project-or-app-id/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
