const express = require('express');
const router = express.Router();
// Omise placeholder - in .env put OMISE_SECRET_KEY etc.
router.post('/charge', async (req,res)=>{
  // This is a placeholder. In production use omise library to create charge:
  // const omise = require('omise')({publicKey:..., secretKey:...});
  // omise.charges.create({...})
  console.log('charge request', req.body);
  res.json({ ok:true, message:'charge simulated (test mode)' });
});
router.post('/webhook', (req,res)=>{
  console.log('webhook', req.body);
  res.json({ ok:true });
});
module.exports = router;
