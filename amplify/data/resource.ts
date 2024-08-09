import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Class: a.model({
    id: a.id(),
    name: a.string(),
    description: a.string(),
    image: a.string(),
    class_flag: a.int(),
    courseId: a.id().index("byCourse"),
    url: a.string(),
    comments: a.hasMany("Comment", "classId", "byClass"),
    author: a.string(),
  }).authorization((allow) => [allow.private()]),

  Course: a.model({
    id: a.id(),
    name: a.string(),
    classes: a.hasMany("Class", "courseId", "byCourse"),
  }).authorization((allow) => [allow.private()]),

  Comment: a.model({
    id: a.id(),
    classId: a.id().index("byClass"),
    content: a.string().optional(),
    owners: a.array(a.string()),
  }).authorization((allow) => [allow.owner(), allow.private().read()]),

  Track: a.model({
    classId: a.string().primaryKey("userId"),
    userId: a.id(),
    completion: a.boolean(),
    played: a.string().optional(),
  }).authorization((allow) => [allow.owner()]),

  Reward: a.model({
    id: a.id(),
    classId: a.string(),
    userId: a.string(),
    point: a.string(),
  }).authorization((allow) => [allow.owner()]),

  Profile: a.model({
    id: a.string().primaryKey(),
    point: a.int(),
    userId: a.string(),
    name: a.string().optional(),
    organization: a.string().optional(),
  }).authorization((allow) => [allow.owner()]),

  Survey: a.model({
    classId: a.string().primaryKey("userId"),
    userId: a.id(),
    questionnaireVersion: a.string(),
    scores: a.array(a.int()),
  }).authorization((allow) => [allow.owner()]),

  Channel: a.model({
    id: a.id(),
    name: a.string(),
    icon: a.string(),
    messages: a.hasMany("Message", "channelId", "byChannel"),
  }).authorization((allow) => [allow.owner(), allow.private().read()]),

  Message: a.model({
    id: a.id(),
    channelId: a.id().index("byChannel"),
    content: a.string(),
  }).authorization((allow) => [allow.owner(), allow.private().read()]),

  Todo: a.model({
    content: a.string(),
  }).authorization((allow) => [allow.owner()]),
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
