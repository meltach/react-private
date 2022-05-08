import { getDbConnection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("private-todos");
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);
    const { _id: id, isVerified, passwordHash, todos } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, todos },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }

          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
