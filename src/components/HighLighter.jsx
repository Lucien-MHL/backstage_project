import React from 'react'

function getHighlightedText(regex, str) {
  const parts = str.split(new RegExp(`(${regex})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === regex?.toLowerCase() ? <mark key={i}>{part}</mark> : part
  )
}

const HighLighter = ({ search, text }) => getHighlightedText(search, text)

export default HighLighter
