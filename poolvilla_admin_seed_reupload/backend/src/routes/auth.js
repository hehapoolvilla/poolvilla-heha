const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if(!user) return res.status(400).json({error:'invalid'});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({error:'invalid'});
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, {expiresIn:'7d'});
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});
router.post('/register', async (req,res)=>{
  const { email, password, name } = req.body;
  if(!email||!password) return res.status(400).json({error:'missing'});
  const exists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if(exists) return res.status(400).json({error:'exists'});
  const hash = await bcrypt.hash(password,10);
  db.prepare('INSERT INTO users (email,password,role,name) VALUES (?,?,?,?)').run(email,hash,'user',name||'');
  res.json({ ok:true });
});
module.exports = router;
