import React from 'react'
import axios from 'axios'

const Anchor = async () => {
    const response = await axios(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`()
    )
  return (
    <div>Anchor</div>
  )
}

export default Anchor