import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");

  try {
    let { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
      const user = await prisma.user.create({ data: req.body });
      res.send({
        message: "User Registered successfully",
        user: user,
      });
    } else {
      res.status(409).send({ message: "User already registered" });
    }
  } catch (error) {
    // Handle the error here
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

