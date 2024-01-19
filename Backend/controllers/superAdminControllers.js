// import { hashPassword } from "../helpers/authHelper.js";
// import userModel from "../models/userModel.js";

// // async function eligible(request())

// //create User
// export const createUserController = async (req, res) => {
//   try {
//     var { name, reg, email, password, role } = req.body;

//     if (
//       !name ||
//       !reg ||
//       !email ||
//       !password ||
//       !role ||
//       !["student", "admin", "faculty", "SuperAdmin"].includes(role)
//     ) {
//       return res.status(400).send({
//         success: false,
//         message: "All the fields are mandatory!",
//       });
//     }

//     email = email.toLowerCase();

//     const hashedPassword = await hashPassword(password);

//     const user = new userModel({
//       name,
//       reg,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await user.save();

//     res.status(200).send({
//       success: true,
//       message: "User created successfully!",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error creating user!",
//       error,
//     });
//   }
// };

// export const updateUserRoleController = async (req, res) => {
//   try {
//     const { role } = req.body;

//     if (!["student", "admin", "faculty", "SuperAdmin"].includes(role))
//       return res.status(400).send({
//         success: false,
//         message: "You'r trying to assign invalid role!",
//       });

//     const userData = await userModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         role,
//       },
//       { new: true }
//     );

//     res.status(200).send({
//       success: true,
//       message: "User Role Updated successfully!",
//       userData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Failed to update user role!",
//       error,
//     });
//   }
// };

// // get userList
// export const getUsersListController = async (req, res) => {
//   try {
//     const users = await userModel.find({}).sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       message: "Users Fetched Successfully",
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr in fetching users!",
//       error: error.message,
//     });
//   }
// };

// //delete user
// export const deleteUserController = async (req, res) => {
//   try {
//     await userModel.findByIdAndDelete(req.params.id);
//     res.status(200).send({
//       success: true,
//       message: "User deleted successfully!",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting user!",
//       error,
//     });
//   }
// };

// export const getSingleUserController = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     if (!userId)
//       return res.status(404).send({
//         success: false,
//         message: "No id is there!",
//       });

//     // console.log(userId);

//     const userData = await userModel.findById(userId);

//     res.status(200).send({
//       success: true,
//       message: "User data fetched successfully!",
//       userData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in fetching User data!",
//     });
//   }
// };

// export const updateUserController = async (req, res) => {
//   try {
//     const updatedUser = {
//       ...req.body,
//     };

//     const user = await userModel.findByIdAndUpdate(req.params.id, updatedUser, {
//       new: true,
//     });

//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found!",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "User updated successfully!",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in updating user!",
//     });
//   }
// };
