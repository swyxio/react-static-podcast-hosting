import React from 'react'
import { FMType } from '../types'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { Location } from '@reach/router'

type A = { isActive: boolean }
const LI = styled('div')`
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  border-left: 10px solid #e4e4e4;
  background: ${({ isActive }: A) => (isActive ? '#fff' : '#f9f9f9')};
  ${({ isActive }: A) =>
    isActive &&
    `
  border-right-color: #fff;
  border-left: 0;
  padding-left: 1rem;
  :before {
    display: block;
    background: linear-gradient(30deg, #d2ff52 0%, #03fff3 100%);
    width: 10px;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }

  `};
  position: relative;
  display: flex;
  a {
    flex: 1 1 auto;
    padding: 10px;
  }
  .playbutton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    flex-shrink: 0;
    padding: 1rem;
    button {
      background: none;
      border: 0;
      outline-color: #f1c15d;
    }
  }
  strong {
    color: #1d1d1d;
    font-size: 1.25rem;
    margin: 0;
  }
  p {
    text-transform: uppercase;
    margin: 0;
    color: #666;
  }
`
type Props = {
  frontmatter: FMType
  isActive: boolean
}
function ListItem({ frontmatter, isActive }: Props) {
  return (
    <LI isActive={isActive}>
      <Link to={`/episode/${frontmatter.slug}`}>
        <p>Episode {frontmatter.episode}</p>
        <strong>{frontmatter.title}</strong>
      </Link>
      <div className="playbutton">
        <button type="button" title="play button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
          >
            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        </button>
      </div>
    </LI>
  )
}

const UL = styled('div')`
  width: 38%;
  display: flex;
  flex-direction: column;
  padding: 0;
  @media (max-width: 650px) {
    height: 300px;
    width: 100%;
    overflow-x: auto;
    overflow-y: scroll;
  }
`

type MyProps = {
  frontmatters: FMType[]
  setSelected?: Function
}

export default function ShowList({ frontmatters }: MyProps) {
  return (
    <Location>
      {props => {
        let activeEpisodeSlug = frontmatters[0].slug
        if (props.location.pathname !== '/') {
          activeEpisodeSlug = props.location.pathname
            .split('/episode/')
            .slice(-1)[0] // just grab the slug at the end. pretty brittle but ok
        }
        // console.log('propslocation', props.location.pathname)
        return (
          <UL>
            {frontmatters.map(fm => (
              <ListItem
                key={fm.slug}
                frontmatter={fm}
                isActive={fm.slug === activeEpisodeSlug}
              />
            ))}
          </UL>
        )
      }}
    </Location>
  )
}
