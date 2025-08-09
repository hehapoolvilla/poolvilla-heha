const db = require('./db');
const bcrypt = require('bcrypt');
// create tables
db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, role TEXT, name TEXT)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS villas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, pricePerNight INTEGER, images TEXT)`).run();
(async ()=>{
  const adminEmail = 'admin@poolvilla.com';
  const adminPass = '123456';
  const exists = db.prepare('SELECT * FROM users WHERE email = ?').get(adminEmail);
  if(!exists){
    const hash = await bcrypt.hash(adminPass, 10);
    db.prepare('INSERT INTO users (email,password,role,name) VALUES (?,?,?,?)').run(adminEmail, hash, 'admin', 'Admin PoolVilla');
    console.log('Admin created:', adminEmail, adminPass);
  } else {
    console.log('Admin already exists');
  }
  const count = db.prepare('SELECT COUNT(*) as c FROM villas').get().c;
  if(count===0){
    db.prepare('INSERT INTO villas (title,description,pricePerNight,images) VALUES (?,?,?,?)').run('Villa Sea Breeze','บ้านพักติดทะเล พร้อมสระว่ายน้ำ ส่วนตัว',2500,'[]');
    db.prepare('INSERT INTO villas (title,description,pricePerNight,images) VALUES (?,?,?,?)').run('Villa Mountain View','พูลวิลล่าวิวภูเขา เงียบสงบ',3000,'[]');
    db.prepare('INSERT INTO villas (title,description,pricePerNight,images) VALUES (?,?,?,?)').run('Villa City Escape','บ้านพักใจกลางเมือง สะดวกสบาย',1800,'[]');
    console.log('Sample villas created');
  } else {
    console.log('Villas already present');
  }
  process.exit(0);
})();
