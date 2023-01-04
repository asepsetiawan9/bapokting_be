const response = require('../helpers/standardResponse');
const komoditiModel = require('../models/komoditi');
const errResponse = require('../helpers/errResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.komoditiList= (req, res)=>{
  komoditiModel.getAllKomoditi((results)=>{
    return response(res, 'Get All Data success', results);
  });
};

exports.komoditiAdd= (req, res)=>{
  komoditiModel.addKomoditi(req.body, (err, results)=>{
    return response(res, 'Post Komoditi Data success', results);
  });
};

exports.komoditiPrice= (req, res)=>{
  const p_guntur = req.body.p_guntur
  const p_kadungora = req.body.p_kadungora
  const p_cikajang = req.body.p_cikajang
  const p_pamengpeuk = req.body.p_pamengpeuk
  const p_samarang = req.body.p_samarang
  const p_malangbong = req.body.p_malangbong

  const guntur      = parseInt(p_guntur)
  const kadungora   = parseInt(p_kadungora)
  const cikajang    = parseInt(p_cikajang)
  const pamengpeuk  = parseInt(p_pamengpeuk)
  const samarang    = parseInt(p_samarang)
  const malangbong  = parseInt(p_malangbong)

  const total = guntur + kadungora + cikajang + pamengpeuk + samarang + malangbong;
  const average = total / 6;
  const sendAverage = Math.floor(average)

  const rata_minggu_ini = sendAverage

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; 
  const year = today.getFullYear();

  const tanggal = `${day}/${month}/${year}`;

  komoditiModel.komoditiPrice(req.body, tanggal, guntur, kadungora, cikajang, pamengpeuk, samarang, malangbong,
        rata_minggu_ini, (err, results)=>{
    return response(res, 'Create Data success', results);
  });
};

