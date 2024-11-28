const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); 
const bcrypt = require('bcrypt'); 

// Create an Admin
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check if a user is an admin by email
router.get('/isadmin', async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      const admin = await Admin.findOne({ email });
  
      if (admin) {
        return res.json({ isAdmin: true });
      }
  
      res.json({ isAdmin: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get All Admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Admin by ID
router.get('/admins/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an Admin
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updates = { name, email };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an Admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
