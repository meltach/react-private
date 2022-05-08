import { getDbConnection } from "../db.js";
import { ObjectId } from "mongodb";

export const getTodosRoute = {
  path: "/api/todos/:userId",
  method: "get",
  handler: async (req, res) => {
    const { userId } = req.params;

    const db = getDbConnection("private-todos");
    const result = await db.collection("users").findOne({
      _id: ObjectId(userId),
    });

    return res.status(200).json(result);
  },
};
