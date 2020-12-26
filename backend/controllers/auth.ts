import { Request, Response } from "express";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }

    if(!(username == "cnyapp" && password == "uukZ!AC8@!V%B+mG"))
    {
        res.status(401).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }
    
    // const token = jwt.sign(
    //   { userId: 1, username: username }, "2)3K_T@88YBfTSyT",
    //   { expiresIn: "30d" }
    // );

    //Send the jwt in the response
    res.send({
        "message": "Login Success", "success": true});

  };
}