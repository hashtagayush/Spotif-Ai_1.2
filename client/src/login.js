import React from 'react'
import 'bootstrap'
import{Container} from 'react-bootstrap'

// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=1b5b553697174e23a83cd38b903f97ff&response_type=code&redirect_uri=http://localhost:4000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
const AUTH_URL ="https://accounts.spotify.com/authorize?client_id=1b5b553697174e23a83cd38b903f97ff&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
const img = "https://w.forfun.com/fetch/12/129a2b0c9a5d091c1799e3dae4a82680.jpeg"
const logo = "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
const img2 = "https://w.forfun.com/fetch/cd/cd3076a50f0c2b99b443f0d8170b47b1.jpeg"
  return (
    <div 
      class="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '10vh',
        backgroundImage:`url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '15vh',
        paddingLeft: '5.5vh'

    }}
    >
      <a className='btn btn-success btn-lg' 
      style={{
        background: 'transparent',
        // backgroundImage:`url(${logo})`,
        color: 'white',
        border: '2px solid white'
    }}

      script={{
        innerHeight:'80px',
      }} 
      href={AUTH_URL}>Login with Spotify</a>
    </div>
  )
}
