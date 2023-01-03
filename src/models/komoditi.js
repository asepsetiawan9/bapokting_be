const db = require('../helpers/db.js');

exports.getPrevId = (cb) => {
  const quer = 'SELECT id FROM komoditi ORDER BY id DESC LIMIT 1;';
  db.query(quer, (err, res)=>{
    cb(err, res.rows[0]);
  });
};
exports.getPricePrev = (id, cb) => {
  const quer = 'SELECT med_minggu_ini FROM komoditi WHERE id = (SELECT id FROM komoditi WHERE id = $1) - 1 ORDER BY id DESC LIMIT 1';
  const value = [id]
  db.query(quer, value, (err, res)=>{
    cb(err, res.rows[0]);
  });
};

exports.komoditiAdd = (data, tanggal, guntur, kadungora, cikajang, pamengpeuk, samarang, malangbong,
  rata_minggu_ini, rata_minggu_lalu, ket, cb)=>{
  const quer = 'INSERT INTO komoditi(nama_komoditi, tanggal, satuan, p_guntur, p_kadungora, p_cikajang, p_pamengpeuk, p_samarang, p_malangbong, med_minggu_ini, med_minggu_lalu, keterangan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
  const value = [data.nama_komoditi, tanggal, data.satuan, guntur, kadungora, cikajang, pamengpeuk, samarang, malangbong,
    rata_minggu_ini, rata_minggu_lalu, ket];
  db.query(quer, value, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.getAllKomoditi = (cb) => {
  db.query('SELECT * FROM komoditi ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

