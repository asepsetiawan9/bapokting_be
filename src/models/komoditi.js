const db = require('../helpers/db.js');

exports.getAllKomoditi = (cb) => {
  db.query('SELECT * FROM komoditi ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.komoditiPrice = (data, tanggal, guntur, kadungora, cikajang, pamengpeuk, samarang, malangbong,
  rata_minggu_ini, cb) =>{
  db.query('BEGIN', err=>{
    if(err){
      cb(err);
    }else{
      const querSelectByIdKom = 'SELECT * FROM price where id_komoditi = $1'
      const id_komoditi = [data.id_komoditi]
      db.query(querSelectByIdKom,id_komoditi,(err,resAll)=>{
        if(err){
          cb(err);
        }else{
          const querSelectPrev = 'SELECT * FROM price where id_komoditi = $1 order by id  LIMIT 1 OFFSET $2';
          const id_komoditi = data.id_komoditi
          const dataOffset = resAll.rowCount - 1
          db.query(querSelectPrev, [id_komoditi, dataOffset],(err,resPrev)=>{
            if(err){
              cb(err);
            }else{
              const rata_minggu_lalu = parseInt(resPrev.rows[0].med_minggu_ini);
              const rata_minggu = rata_minggu_ini;
              let keterangan;
              if (rata_minggu > rata_minggu_lalu) {
                keterangan = 'Naik';
              } else if (rata_minggu < rata_minggu_lalu) {
                keterangan = 'Turun';
              } else if (rata_minggu === rata_minggu_lalu) {
                keterangan = 'Tetap';
              }
              const queryPrice = 'INSERT INTO price (id_komoditi, satuan, tanggal, p_guntur, p_kadungora, p_cikajang, p_pamengpeuk, p_samarang, p_malangbong, med_minggu_ini, med_minggu_lalu, keterangan ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
              const valPrice = [id_komoditi, data.satuan, tanggal, guntur, kadungora, cikajang, pamengpeuk, samarang, malangbong,
              rata_minggu_ini, rata_minggu_lalu, keterangan];
              db.query(queryPrice,valPrice,(err, resFnnal)=>{
                if(err){
                  cb(err);
                }else{
                  cb(err,resFnnal.rows);
                  db.query('COMMIT',err=>{
                    if(err){
                      cb(err);
                    }
                  });
                }
              })
            }
          })
        }
      })
    }
  });
};


exports.addKomoditi=(data,cb)=>{
  const que='INSERT INTO komoditi_kat (komoditi_name) VALUES ($1) RETURNING*';
  const val=[data.komoditi_name];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err, res.rows);
    }
  });
};
