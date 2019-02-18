import React from 'react'
import styled from 'styled-components'

export default styled(Footer)`
  text-align: center;
`

function Footer(props: any) {
  return (
    <footer {...props}>
      <p>React-Static Podcast</p>
      <p>
        Your copyright here? Design thanks to{' '}
        <a href="https://syntax.fm">Syntax</a>
      </p>
      <p>
        <a href="https://twitter.com/swyx">Report issues here</a>
      </p>
      <p>
        <a
          href="https://github.com/sw-yx/react-static-podcast-hosting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fork and contribute on GitHub
        </a>
      </p>
    </footer>
  )
}
