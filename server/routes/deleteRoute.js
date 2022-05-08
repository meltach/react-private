import { getDbConnection } from "../db.js";
import { ObjectId } from "mongodb";

export const deleteRoute = {
  path: "/api/todos/:userId",
  method: "put",
  handler: async (req, res) => {
    const { userId } = req.params;
    const { todoId } = req.body;
    console.log(userId, todoId);
    //  _id: ObjectId(userId),
    const db = getDbConnection("private-todos");
    const result = await db.collection("users").updateOne(
      {
        _id: ObjectId(userId),
      },
      { $pull: { todos: { todoId } } }
    );
    console.log(result);
    res.status(200).json(result);
  },
};
