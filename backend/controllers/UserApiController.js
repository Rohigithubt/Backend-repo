const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const global = require('../helper/GlobalHelper');

module.exports = {
  // index,
  // login,
  index,
  register,
  login,
  editprofile,
  updateprofile,
  destroy,

};

async function register(req, res) {
  const { name, email, password, phoneno, role, location, type } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ status: false, message: "Name, email, and password are required." });
    }

    if (type === "full" || role === "volunteer") {
      if (!phoneno || !role) {
        return res.status(400).json({ status: false, message: "Phone number and role are required." });
      }

      if (role === "volunteer" && !location) {
        return res.status(400).json({ status: false, message: "Location is required for volunteers." });
      }
    }
    if (phoneno.length !== 10) {
      return res.status(400).json({ status: false, message: "Invalid phone number. Must be a 10 digits number." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ status: false, message: "Email is already in use" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    req.body.password = await bcrypt.hash(password, 10);
    await User.create(req.body);

    return res.status(200).json({ status: true, message: "User registered successfully." });
  } catch (err) {
    console.log("Registration Error:", err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}


async function index(req, res) {
  try {
    const users = await User.find({ isDeleted: false });
    if (!users || users.length == 0) {
      return res.status(404).json({ status: false, message: "No user found" });
    }
    res.status(200).json({ status: true, data: users });
  }
  catch (error) {
    console.log('User fetch failed:', error);
    res.status(500).send("Internal server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({ status: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: 'Incorrect Email ID or Password!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ status: false, message: 'Incorrect Email ID or Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: 'Login failed' });
  }
}

async function editprofile(req, res) {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ status: false, message: "Data not found" })
    }

    res.status(200).json({ status: true, data: user })

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "editprofile failed" });
  }
}

async function updateprofile(req, res) {
  console.log(req.body, "body")
  const { userId, email, phoneno, name, location } = req.body;
  const updateData = { ...req.body };

  try {
    delete updateData.userId;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(401).json({ status: false, error: 'user not found' });
    }
    res.status(200).json({ status: true, user });
  }
  catch(error){
    console.log(error);
    res.status(500).json({error: 'profile update failed'});
  }
}

async function destroy(req,res) {
  try{
      let {userId} = req.body;
      console.log(req.body)
      let result= await User.findByIdAndDelete(userId);
      res.status(200).json({status:true,message: "user deleted successfully"});
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:"delete data failed"})
  }
  
}

