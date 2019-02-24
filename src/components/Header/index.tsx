import React from 'react'
import styled from 'styled-components'
import HeaderRight from './HeaderRight'
import SubscribeBar from './SubscribeBar'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import { Episode } from 'podcats'

export default withRouteData(Header)

type Props = { content?: Episode; mostRecentEpisode?: Episode }
type SiteData = {
  title: string
  description: string
  myURL: string
  image: string
}

const HLDiv = styled('div')`
  width: 70%;
  text-align: center;
  display: grid;
  align-items: center;
  font-size: 1.5rem;
`
const AHeader = styled('header')`
  flex-wrap: wrap;
  display: flex;
`
function Header({
  siteData,
  content,
  mostRecentEpisode,
}: { siteData: SiteData } & Props) {
  const { title, description, myURL, image } = siteData
  const curEp = content || mostRecentEpisode
  const titleHead = curEp.frontmatter.episode
    ? `Ep ${curEp.frontmatter.episode}: ${curEp.frontmatter.title}`
    : curEp.frontmatter.title
  const desc = content ? description : mostRecentEpisode.frontmatter.description
  return (
    <AHeader>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titleHead}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={titleHead} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={myURL} />
        <meta property="og:site_name" content={titleHead} />
        <meta name="twitter:title" content={titleHead} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@swyx" />
        <meta name="twitter:creator" content="@swyx" />
      </Helmet>
      <HLDiv>
        <h1>
          <a href={myURL}>{title}</a>
        </h1>
        {/* <img src="https://sw-yx.tinytake.com/media/952085?filename=1548652201152_27-01-2019-19-10-00.png&sub_type=thumbnail_preview&type=attachment&width=282&height=207&&salt=MzI2MjE2OV85NzczMTg5" /> */}
      </HLDiv>
      <HeaderRight />
      <SubscribeBar />
    </AHeader>
  )
}
