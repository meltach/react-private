import { getDbConnection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("private-todos");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // const startingInfo = {
    //   todos: "",
    // };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      todos: [],
      isVerfied: false,
    });

    console.log(result);
    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        email,
        todos: [],
        isVerfied: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).json({ token });
      }
    );
  },
};
