const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  return res.json({
    success: true,
    message: 'Backend is running wellllll'
  });
});

app.use('/', require('./src/routes'));

app.use('*',(req,res)=>{
  return res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});


app.listen(process.env.PORT, ()=>{
  console.log(`aplication is running in port ${process.env.PORT}`);
});