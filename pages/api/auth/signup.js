import connectMongo from "../../../database/dbconnect";
import Users from "../../../model/userSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed!!" }));

  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ message: "No form Data" });
    const { username, email, password } = req.body;

    const checkExisting = await Users.findOne({ email });
    if (checkExisting)
      return res.status(422).json({ message: "User Already Exist!!" });

    Users.create(
      { username, email, password: await hash(password, 10) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted" });
  }
}
