import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Creating the token
  const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Setting JWT as HTTP-Only Cookie in the server
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
};

export default generateToken;
