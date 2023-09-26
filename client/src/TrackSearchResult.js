import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="card bg-transparent text-white m-2 "
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <div className="card-body d-flex align-items-cente mt-0">
        <img src={track.albumUrl} style={{ height: "74px", width: "74px"}} />
        <div className="ml-2" >
          <div>{track.title}</div>
          <div className="text-muted-white ">{track.artist}</div>
        </div>
      </div>
    </div>
  )
}