import React,{useState, useEffect} from 'react'
import useAuth  from "./useAuth"
import axios from "axios"
import TrackSearchResult from "./TrackSearchResult"
// import fs;
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
  const [finalList , setFinalList] = useState([])


  useEffect(() => {
    if (!recommendingTrack) return;

    // First Axios call
    axios
      .post("http://localhost:3001/features", {
        accessToken: accessToken,
        id: recommendingTrack.id,
      })
      .then(res => {
        setFeatures(res.data.body);
      })
      .catch((err) => {
        let message =
          typeof err.response !== "undefined"
            ? err.response.data.message
            : err.message;
        console.warn("error", message);
      });
  }, [recommendingTrack]);

  // Use useEffect to handle the side effect of making the second request
  useEffect(() => {
    if (features) {
      // Second Axios call
      axios
        .post("http://localhost:3001/recomend", { feat: features })
        .then(res2 => {
          console.log(res2.data.body);
          setFinalList(res2.data.body);
        })
        .catch((err) => {
          let message =
            typeof err.response !== "undefined"
              ? err.response.data.message
              : err.message;
          console.warn("error", message);
        });
    }
  }, [features]);
  

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
