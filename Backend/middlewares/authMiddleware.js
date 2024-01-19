import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
// export const protect = async (req, res, next) => {
//   try {
//     const tokenHeader = req.headers.token || req.headers.authorization;

//     if (!tokenHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not found in headers!",
//       });
//     }

//     // console.log(tokenHeader);

//     // const tokenParts = tokenHeader.split(" ");

//     // console.log(tokenParts.length);

//     // if (tokenParts.length !== 2) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Invalid token format!",
//     //   });
//     // }

//     const token = tokenHeader.replace("Bearer", "").trim();

//     const decode = JWT.verify(token, process.env.JWT_SECRET);

//     let ud = await userModel.findById(decode._id);

//     // req.user = { ...decode, ...ud };
//     req.user = decode;

//     if (req.baseUrl.includes("SuperAdmin")) {
//       if (ud.role == "SuperAdmin") {
//         next();
//       } else {
//         res.status(401).send({
//           success: false,
//           error,
//           message: "Not Enough Permisiion!",
//         });
//       }
//     } else {
//       next();
//     }
//     // console.log(decode);
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Token not found!",
//     });
//   }
// };

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not found!",
      });
    }

    // console.log(token);

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    // console.log(decode);

    const user = await userModel.findById(decode._id).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found!",
      });
    }

    user._id = user._id.toString();

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Token verification failed!",
      error,
    });
  }
};
