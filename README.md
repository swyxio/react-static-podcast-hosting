# React Static Podcast hosting

use this to build your next free podcast site! see it live at https://reactstaticpodcast.netlify.com/

## Make Your Own

```bash
git clone --depth 1 https://github.com/sw-yx/react-static-podcast-hosting
```

The builds for this have been cobbled together so they are a little messy. Here's a quick guide to the npm scripts:

- `build:stylus`: the player was taken from Syntax.fm, which was written in .styl. We use `stylus` to compile to a single css file which we simply import into `Player`. So run this script whenever you change the .styl file.

We've put it into the `build` script so that you don't forget to run them but you should just know whats going on in case you need to debug stuff.

Markdown content goes in the `content` folder, and should have a `mp3URL` field pointing to its associated sound file. In this example I have put that inside `public/episodes/` to avoid file copying on build, but you are welcome to modify this once you are comfortable with the code. See the [podcats documentation](https://github.com/sw-yx/podcats) for an example of the kind of markdown + mp3 pairing that is expected.

## Feed validators for testing

- https://castfeedvalidator.com/
- https://podba.se/validate/?url=https://reactstaticpodcast.netlify.com/rss/index.xml
- https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Freactstaticpodcast.netlify.com%2Frss%2Findex.xml

more RSS tips

- https://resourcecenter.odee.osu.edu/digital-media-production/how-write-podcast-rss-xml
- https://github.com/gpodder/podcast-feed-best-practice/blob/master/podcast-feed-best-practice.md
- https://jackbarber.co.uk/blog/2017-02-14-podcast-rss-feed-template

## More Resources that helped me make this

- RS-TS starter: https://github.com/sw-yx/react-static-typescript-starter
- Apple podcast feed requirements
  - https://help.apple.com/itc/podcasts_connect/#/itc1723472cb
  - https://feedforall.com/itune-tutorial-tags.htm#category
  - NOTE: NEW TAGS introduced in 2017: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
  - NOTE: NEW PODCAST CATEGORIES: https://castos.com/itunes-podcast-category-list/
- Podcast RSS Feed and Content Generator: https://github.com/sw-yx/podcats
  - xml utility https://www.npmjs.com/package/xml
  - source: https://github.com/jpmonette/feed
  - from: https://benmccormick.org/2017/06/03/rss-atom-json-gatsby/
- in-browser player https://github.com/wesbos/Syntax/blob/26040ba07dd247ac7cc35eb69428f31ef5863b9e/components/Player.js
- i did not know this existed until too late but doesnt have TS anyway https://github.com/maxnowack/node-podcast

## Free podcast music

- https://www.instantmusicnow.com/
- http://freemusicarchive.org/
- https://www.weeditpodcasts.com/11-resources-for-royalty-free-music/
