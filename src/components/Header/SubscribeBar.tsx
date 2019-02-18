import React from 'react'
import styled from 'styled-components'
import { withSiteData } from 'react-static'

const SubDiv = styled('ul')`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: space-around;

  a {
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
    font-size: 1.5rem;
    padding: 0.7rem 1rem;
    text-align: center;
    border-radius: 3px;
    font-family: sans-serif;
    font-weight: 100;
    transition: all 0.2s;
    display: flex;
    align-items: center;
  }

  @media (max-width: 650px) {
    a {
      font-size: 1.25rem;
    }
  }
  .iTunes {
    background: linear-gradient(
      to bottom,
      #cd66f6 0%,
      #9a3dd1 80%,
      #8e34c9 100%
    );
  }
  .RSS {
    background: linear-gradient(
      to bottom,
      #4366f6 0%,
      #433dd1 80%,
      #4334c9 100%
    );
  }

  .GitHub {
    color: white;
    background: linear-gradient(to bottom, #333 0%, #999 80%, #767676 100%);
  }

  .Netlify {
    background: linear-gradient(
      to bottom,
      #18bea8 0%,
      #18bea8 80%,
      #18bea8 100%
    );
  }
  .iTunes {
    background: linear-gradient(
      to bottom,
      #9796f0 0%,
      #fb00d4 80%,
      #fbc7d4 100%
    );
  }
  .Spotify {
    color: #1db954;
    background: #ffffff;
  }
  .GooglePlay {
    background: linear-gradient(
      to bottom,
      #bbd2c5 0%,
      #536976 80%,
      #292e49 100%
    );
  }
  .Overcast {
    background: linear-gradient(
      to bottom,
      #f96a0d 0%,
      #f96a0d 80%,
      #f96a0d 100%
    );
  }
  .Reddit {
    background: linear-gradient(
      to bottom,
      #9494ff 0%,
      #ff4500 80%,
      #ed001c 100%
    );
  }
`
type Props = {
  subscribeLinks: {
    type: string
    url: string
  }[]
}
function SubscribeBar({ subscribeLinks }: Props) {
  return (
    <SubDiv>
      {subscribeLinks.map(link => (
        <li key={link.type}>
          <a
            className={link.type}
            target="_blank"
            href={link.url}
            rel="noopener noreferrer"
          >
            {link.type}
          </a>
        </li>
      ))}
    </SubDiv>
  )
}

export default withSiteData(SubscribeBar)
