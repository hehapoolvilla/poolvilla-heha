const express = require('express');
const router = express.Router();
const db = require('../db');
// bookings table
db.prepare(`CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, villaId INTEGER, userId INTEGER, checkIn TEXT, checkOut TEXT, guests INTEGER, total INTEGER, status TEXT)`).run();
router.post('/', (req,res)=>{
  const { villaId, userId, checkIn, checkOut, guests, total } = req.body;
  const info = db.prepare('INSERT INTO bookings (villaId,userId,checkIn,checkOut,guests,total,status) VALUES (?,?,?,?,?,?,?)').run(villaId,userId,checkIn,checkOut,guests,total,'pending');
  res.json({ id: info.lastInsertRowid });
});
router.get('/', (req,res)=>{
  const rows = db.prepare('SELECT b.*, v.title as villaTitle FROM bookings b LEFT JOIN villas v ON v.id = b.villaId').all();
  res.json({ data: rows });
});
module.exports = router;
