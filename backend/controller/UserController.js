import User from "../model/UserModel.js"; // Corrected import
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let refreshtokens = [];

export const UserRegister = async (req, res) => {
  console.log(req.body);
  console.log("back awoo");

  try {
    console.log(req.body.email);

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(!existingUser);

    if (existingUser) {
      res.status(404).json({
        message: "User already registered!",
      });
    } else {
      const prefix = "UID";
      const USER_ID = prefix + Date.now();

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        user_id: USER_ID,
        firstname: req.body.firstName,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
      });

      console.log(newUser);
      const newAcct = await newUser.save();

      if (newAcct) {
        res.status(201).json({
          message: "Registration successful!",
          payload: newAcct,
        });
      } else {
        res.status(401).json({
          message: "Something went wrong while creating the account!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

// Sign in a user
export const Signin = async (req, res) => {
  try {
    const registeredUser = await User.findOne({ email: req.body.email });

    if (registeredUser) {
      const enteredPwd = req.body.password;
      const dbPwd = registeredUser.password;

      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(enteredPwd, dbPwd);

      if (isPasswordMatch) {
        const token = jwt.sign(
          { email: req.body.email },
          process.env.JWT_TOKEN_KEY1,
          { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
          { email: req.body.email },
          process.env.REFRESH_TOKEN_KEY1,
          { expiresIn: "24h" }
        );

        refreshtokens.push(refreshToken);

        res.status(201).json({
          message: "Login successful!",
          token,
          refreshToken,
          user: {
            UID: registeredUser.user_id,
            firstname: registeredUser.firstname,
            lastname: registeredUser.lastname,
            email: registeredUser.email,
            phone: registeredUser.phone,
        },
        });
      } else {
        res.status(401).json({
          message: "Incorrect password!",
        });
      }
    } else {
      res.status(404).json({
        message: "User not registered!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error!",
      error: error,
    });
  }
};

export const tokenRefresh = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).json({
      message: "Unauthorized!",
    });
  } else if (!refreshtokens.includes(refreshToken)) {
    res.status(403).json({
      message: "Forbidden!",
    });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY1, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden!",
        });
      } else {
        const token = jwt.sign(
          { email: req.body.email },
          process.env.JWT_TOKEN_KEY1,
          { expiresIn: "1h" }
        );
        res.status(201).json({
          message: "Session extended!",
          token,
        });
      }
    });
  }
};

export const Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter((token) => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};
