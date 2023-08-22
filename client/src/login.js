import React from 'react'
import 'bootstrap'
import{Container} from 'react-bootstrap'

// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=1b5b553697174e23a83cd38b903f97ff&response_type=code&redirect_uri=http://localhost:4000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
const AUTH_URL ="https://accounts.spotify.com/authorize?client_id=1b5b553697174e23a83cd38b903f97ff&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {

  return (
    // <Container>
    <Container 
      className="s-felx justify-content-center align-items-center" 
      style={{minHeight: '300vh'}}
    >
      <a className='btn btn-success btn-lg' 
      script={{innerHeight:'100px',}} 
      href={AUTH_URL}>Login with Spotify</a>
    </Container>
  )
}
