import axios from 'axios'
import path from 'path'
import { mkDir, mkFile } from './fs'
const fs = require('fs')
import { buildFeed, grabContents } from 'podcats'

/// config
const myURL = 'https://reactstaticpodcast.netlify.com'

const description =
  'a podcast feed and blog generator in React and hosted on Netlify'
const image = 'https://placekitten.com/g/1400/1400' // TODO: itunes cover and opengraph image. you should customise this!
const ghURL = 'https://github.com/sw-yx/react-static-podcast-hosting'
const rss = myURL + '/rss/index.xml'
const itURL =
  'https://itunes.apple.com/us/podcast/this-week-in-r-reactjs/id1448641675?mt=2&uo=4'
const netlifyURL = 'https://app.netlify.com/sites/reactstaticpodcast'
const spotifyURL = 'https://open.spotify.com/show/3zkaO56g7xAQAemOCFWHc0'
const googlepodURL =
  'https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84NTMwNWNjL3BvZGNhc3QvcnNz'
const overcastURL =
  'https://overcast.fm/itunes1448641675/this-week-in-r-reactjs'
const redditURL = 'https://www.reddit.com/r/reactjs/'
const contentFolder = 'content'
const author = {
  name: 'This Week in r/Reactjs',
  email: 'REACTSTATICPODCAST_AUTHOR_EMAIL@foo.com',
  link: 'https://REACTSTATICPODCAST_AUTHOR_LINK.com',
}
const feedOptions = {
  // blog feed options
  title: 'This Week in r/Reactjs',
  description,
  link: myURL,
  id: myURL,
  copyright: 'copyright REACTSTATICPODCAST_YOURNAMEHERE',
  feedLinks: {
    atom: safeJoin(myURL, 'atom.xml'),
    json: safeJoin(myURL, 'feed.json'),
    rss: safeJoin(myURL, 'rss'),
  },
  author,
}
const iTunesChannelFields = {
  // itunes options
  summary: 'This Week in r/Reactjs',
  author: author.name,
  keywords: ['Technology'],
  categories: [
    { cat: 'Technology' },
    { cat: 'Technology', child: 'Tech News' },
  ],
  image,
  explicit: false,
  owner: author,
  type: 'episodic',
}

// preprocessing'
const filenames = fs.readdirSync(contentFolder).reverse() // reverse chron
const filepaths = filenames.map(file =>
  path.join(process.cwd(), contentFolder, file),
)
const contents = grabContents(filepaths, myURL)
const frontmatters = contents.map(c => c.frontmatter)
mkDir('/public/rss/')

// generate HTML
export default {
  plugins: [
    'react-static-plugin-styled-components',
    'react-static-plugin-typescript',
  ],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  siteRoot: myURL,
  getSiteData: async () => {
    // generate RSS
    let feed = await buildFeed(
      contents,
      myURL,
      author,
      feedOptions,
      iTunesChannelFields,
    )
    mkFile('/public/rss/index.xml', feed.rss2())
    return {
      title: 'This Week in r/Reactjs',
      description,
      rss,
      frontmatters,
      ghURL,
      myURL,
      image,
      mostRecentEpisode: contents[0], // necessary evil to show on '/'
      subscribeLinks: [
        { type: 'iTunes', url: itURL },
        { type: 'RSS', url: rss },
        { type: 'GitHub', url: ghURL },
        { type: 'Netlify', url: netlifyURL },
        { type: 'Spotify', url: spotifyURL },
        { type: 'GooglePlay', url: googlepodURL },
        { type: 'Overcast', url: overcastURL },
        { type: 'Reddit', url: redditURL },
      ],
    }
  },
  getRoutes: async () => {
    return [
      {
        path: 'episode',
        getData: () => ({
          contents,
        }),
        children: contents.map(content => ({
          path: `/${content.frontmatter.slug}`,
          component: 'src/pages/episode',
          getData: () => ({
            content,
            myURL,
          }),
        })),
      },
    ]
  },
}

function safeJoin(a, b) {
  /** strip starting/leading slashes and only use our own */
  let a1 = a.slice(-1) === '/' ? a.slice(0, a.length - 1) : a
  let b1 = b.slice(0) === '/' ? b.slice(1) : b
  return `${a1}/${b1}`
}
