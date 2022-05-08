import { getDbConnection } from "../db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export const todosRoute = {
  path: "/api/todos/:userId",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    const { userId } = req.params;

    const { todos } = req.body;
    //console.log(...todos);
    const db = getDbConnection("private-todos");
    // const user = await db.collection("users").findOne({ email });

    // const result = await db.collection("users").findOne({
    //   _id: ObjectId(userId),
    // });
    const update = await db
      .collection("users")
      .updateOne({ _id: ObjectId(userId) }, { $push: { todos: todos } });

    return res.status(200).json(update);
  },
};
