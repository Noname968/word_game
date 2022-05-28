const PORT = 8000
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const axios = require("axios")

const app = express();
app.use(cors())

app.get('/',(req,res)=>{
    res.json("hi")
})

app.get('/result',(req,res)=>{
    // console.log(req.query.level)
    const levelselect = req.query.level

    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: { level: levelselect, area: 'sat' },
        headers: {
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        }
      };
  
      axios.request(options).then((response) => {
        // console.log(response.data);
        res.json(response.data)
      }).catch((error) => {
        console.error(error);
      });
})

app.listen(PORT,()=>console.log(`Running on port ${PORT}`))

