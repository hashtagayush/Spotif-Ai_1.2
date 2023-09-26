// require("dotenv").config()
const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node")
const PORT = 3001;
const cors = require("cors")  
const bodyParser = require('body-parser')

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  console.log("request arrived at refresh section")
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "1b5b553697174e23a83cd38b903f97ff",
    clientSecret: "ec43a6477b4b4a989e4bcf32c428352e",
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      // console.log(err)
      res.sendStatus(401)
    })
})


app.post('/login', (req,res) =>{
  console.log('request recieved')
  const code = req.body.code
  // var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
  const spotifyApi = new SpotifyWebApi({
    clientId:"1b5b553697174e23a83cd38b903f97ff",
    clientSecret: "ec43a6477b4b4a989e4bcf32c428352e",
     redirectUri:"http://localhost:3000",
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data =>{
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
        // accessToken: data.body['access_token'],
        // refreshToken: data.body['refresh_token'],
        // expiresIn: data.body['expires_in'],
      })
  }).catch(err =>{
    // console.log(err)
    res.sendStatus(400)
  }) 
})

app.post('/features', (req,res) =>{
  console.log("req recieved for features");
  const id = req.body.id;
  const accessToken = req.body.accessToken
  const refreshToken = req.body.refreshToken
  
  const spotifyApi = new SpotifyWebApi({})
  spotifyApi.setAccessToken(accessToken)
  spotifyApi.setRefreshToken(refreshToken)

  spotifyApi
    .getAudioFeaturesForTrack(id)
    .then(data => {
      // console.log(data.body);
      res.json(data)
    }).catch(err =>{
      console.log(err)
    }) 
})
app.listen(PORT, ()=>{console.log(`server started at port ${PORT}`)});