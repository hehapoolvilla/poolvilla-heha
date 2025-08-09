const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', (req,res)=>{
  const rows = db.prepare('SELECT * FROM villas').all();
  res.json({ data: rows });
});
router.get('/:id', (req,res)=>{
  const row = db.prepare('SELECT * FROM villas WHERE id = ?').get(req.params.id);
  res.json({ data: row });
});
module.exports = router;
