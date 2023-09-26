import React,{useState, useEffect} from 'react'
import useAuth  from "./useAuth"
import axios from "axios"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWApi from "spotify-web-api-node"
import { recommendation } from './recommendation'
const spotifyApi = new SpotifyWApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({code}) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [recommendingTrack, setRecommendingTrack] = useState()
  const [features , setFeatures] = useState([])

  useEffect(() => {
    if (!recommendingTrack) return

    axios
      .post("http://localhost:3001/features", {
        // params: {
          // refreshToken:refreshToken ,
          accessToken:accessToken,
          id: recommendingTrack.id,
        // },
      })
      .then(res => {
        setFeatures(res.data.lyrics)
        console.log(features)
      })
  }, [recommendingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            id: track.id,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  function chooseTrack(track) {
    setRecommendingTrack(track)
    setSearch("")
    // setLyrics("")
  }
  
  const im = "https://api.thefutzbutler.com/storage/418/Spotify-Highlark-Feature-1280x860.gif"
  return (
    
    <Container className="d-flex flex-column py-3" 
      style={{ 
        height: "100vh" ,
        // width: "150",
        // marginLeft: "0px",
        // marginRight: "0px",
        backgroundImage:`linear-gradient(120deg, #1DB954, #191414)`,
        // backgroundImage: `url(${im})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        
      </div>
      
      <div>
        <recommendation accessToken={accessToken} trackUri= 
        {recommendingTrack?.uri}/>
      </div>
    </Container>
    
  )
  return <div>{code}</div>
}
