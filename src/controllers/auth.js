const response = require('../helpers/standardResponse');
const authModel = require('../models/auth');
const errResponse = require('../helpers/errResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.register = (req, res)=>{
  authModel.register(req.body, (err, result) => {
    if(err){
      return errResponse(err, res);
    }
    return response(res, 'Register succesfully', result);
  });
};

// aa
exports.login = (req, res)=>{
  console.log(req.body);
  const {email, password} = req.body;
  authModel.getUserByEmail(email, (err, results) => {
    if(results.rows.length < 1){
      return response(res, 'User Not Found', null, null, 400);
    }
    const user = results.rows[0];
    const id = user.id;
    // const pin = user.pin;
    bcrypt.compare(password, user.password)
      .then((cpRes)=>{
        if(cpRes){
          console.log();
          const token = jwt.sign({id: user.id}, APP_SECRET || 'D3f4uLt');
          return response(res, 'Login Success', {id, token});
        }
        return response(res, 'Check your email and pasword', null, null, 400);

      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        return response(res, 'Check your email and pasword', null, null, 400);
      });
  });
};

