import React from 'react'
import { useState, useEffect } from "react"

export default function recommendation({ accessToken, trackUri }) {
  // const [play, setPlay] = useState(false)
  // useEffect(() => setPlay(true), [trackUri])
  if (!accessToken) return null
  return (
    <div>
      <h1>this is resommendation section</h1>
    </div>
  )
}