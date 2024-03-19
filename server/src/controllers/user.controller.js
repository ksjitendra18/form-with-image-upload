const User = require("../models/user.model");
const cloudinary = require("cloudinary");

const register = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const inputFile = req.file.path;

  if (
    !firstName ||
    firstName.length < 1 ||
    !lastName ||
    lastName.length < 1 ||
    !email ||
    email.length < 1 ||
    !phone ||
    phone.length < 1 ||
    !inputFile
  ) {
    return res.status(500).json({
      error: "validation_error",
      message: "Please input valid details",
    });
  }
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(inputFile);

    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      profilePic: cloudinaryResponse.secure_url,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("error while register", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Error while saving user" });
  }
};

module.exports = { register };
