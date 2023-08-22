import React from 'react'
import useAuth  from "./useAuth"


export default function Dashboard({code}) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  return <div>{code}</div>
}
