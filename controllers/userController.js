const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {

    try {
        const { name, email, password, role, phone } = req.body;
        if (req.body===null) {
            return res.status(400).json({ message: 'Please provide user details' });
        }

        //check existing email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with email already exists' });
        }

        const existingUserByPhone = await User.findOne({ phonenumber: phone });
        if (existingUserByPhone) {
            return res.status(400).json({ message: 'User with phone number already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create ({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
        });

        // Save the user
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

//LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        

        // You can also generate a JWT token here and send it in the response for authentication purposes
        const token = jwt.sign(
            { 
                userId: user._id 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
