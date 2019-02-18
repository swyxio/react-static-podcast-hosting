import React from 'react'
import { Episode } from '../../types'
import { withRouteData } from 'react-static'
import styled from 'styled-components'
import DownloadBar from './DownloadBar'
const SNDiv = styled('div')`
  width: 62%;
  font-size: 1.25rem;
  padding: 2rem;
  h2 {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 1rem;
    margin-bottom: 0;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`
type Props = { content?: Episode; mostRecentEpisode?: Episode }
export default withRouteData(({ content, mostRecentEpisode }: Props) => {
  const curEp = content || mostRecentEpisode
  if (!curEp) return 'no content'
  const titleHead = curEp.frontmatter.episode
    ? `Ep ${curEp.frontmatter.episode}: ${curEp.frontmatter.title}`
    : curEp.frontmatter.title
  return (
    <SNDiv>
      <h2>{titleHead}</h2>
      <DownloadBar curEp={curEp} />
      <div dangerouslySetInnerHTML={{ __html: curEp.body }} />
    </SNDiv>
  )
})
