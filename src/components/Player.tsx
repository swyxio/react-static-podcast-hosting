import React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
// import { formatTime } from '../utils/formatTime'
import './player.css'
import { Episode } from '../types'

import { withRouteData } from 'react-static'

function usePrevious<T>(value: T) {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
type ShowProps = {
  number: number
  displayNumber: string
  title: string
  /** url of the mp3 of the show */
  url: string
}

export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
  const Comp = withRouteData(Player(mostRecentEpisode))
  return <Comp />
}

type Props = { content?: Episode }
const Player = (mostRecentEpisode: Episode) => ({ content }: Props) => {
  const curEp = content || mostRecentEpisode
  if (!curEp) return 'no content'
  const show: ShowProps = {
    number: curEp.frontmatter.episode,
    displayNumber: '' + curEp.frontmatter.episode,
    title: curEp.frontmatter.title,
    url: `/${curEp.frontmatter.mp3URL}`,
  }
  let lastPlayed = 0
  // // for SSR
  // if (typeof window !== 'undefined') {
  //   const { show } = this.props
  //   const lp = localStorage.getItem(`lastPlayed${show.number}`)
  //   // eslint-disable-next-line
  //   if (lp) lastPlayed = JSON.parse(lp).lastPlayed
  // }
  const [state, _setState] = React.useState({
    progressTime: 50,
    playing: false,
    duration: 1,
    currentTime: lastPlayed,
    playbackRate: 1,
    timeWasLoaded: lastPlayed !== 0,
    showTooltip: false,
    tooltipPosition: 0,
    tooltipTime: '0:00',
  })
  const {
    playing,
    playbackRate,
    progressTime,
    currentTime,
    duration,
    showTooltip,
    tooltipPosition,
    tooltipTime,
  } = state

  const setState = (obj: Partial<typeof state>) =>
    _setState({ ...state, ...obj })
  let audio = React.createRef<HTMLAudioElement>()
  let progress = React.createRef<HTMLDivElement>()
  let prevShow = usePrevious(show)
  React.useEffect(() => {
    audio.current.playbackRate = state.playbackRate
    if (show.number !== prevShow.number) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`)
      if (lp) {
        const data = JSON.parse(lp)
        // eslint-disable-next-line
        setState({
          currentTime: data.lastPlayed,
        })
        audio.current.currentTime = data.lastPlayed
      }
      audio.current.play()
    } else {
      localStorage.setItem(
        `lastPlayed${show.number}`,
        JSON.stringify({ lastPlayed: currentTime }),
      )
    }
  })

  const timeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const { timeWasLoaded } = state
    // Check if the user already had a current time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`)
      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed
      }
      setState({ timeWasLoaded: false })
    } else {
      const { currentTime = 0, duration = 1 } = e.currentTarget

      const progressTime = (currentTime / duration) * 100
      if (Number.isNaN(progressTime)) return
      setState({ progressTime, currentTime, duration })
    }
  }

  const togglePlay = () => {
    const method = playing ? 'pause' : 'play'
    audio.current[method]()
  }

  const scrubTime = (eventData: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    (eventData.nativeEvent.offsetX / progress.current.offsetWidth) *
    audio.current.duration

  const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    audio.current.currentTime = +scrubTime(e)
  }

  const seekTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(scrubTime(e)),
    })
  }

  const playPause = () => {
    setState({ playing: !audio.current.paused })
    // const method = audio.current.paused ? 'add' : 'remove'
    // document.querySelector('.bars').classList[method]('bars--paused') // 💩
  }

  const volume: React.ChangeEventHandler<HTMLInputElement> = e => {
    audio.current.volume = +e.currentTarget.value
  }

  const speed = (change: number) => {
    const playbackRateMax = 2.5
    const playbackRateMin = 0.75
    // eslint-disable-next-line
    let playbackRate = state.playbackRate + change

    if (playbackRate > playbackRateMax) {
      playbackRate = playbackRateMin
    }

    if (playbackRate < playbackRateMin) {
      playbackRate = playbackRateMax
    }

    setState({ playbackRate })
  }
  const speedUp = () => speed(0.25)

  const speedDown = () => speed(-0.25)

  // // currently this is a bug only in produciton - duration is always infinity in git LFS
  // const playerTime = `${formatTime(currentTime)}`
  const playerTime = `${formatTime(currentTime)} / ${formatTime(duration)}`
  return (
    <div className="player">
      <div className="player__section player__section--left">
        <button
          onClick={togglePlay}
          aria-label={playing ? 'pause' : 'play'}
          type="button"
        >
          <p className="player__icon">{playing ? <FaPause /> : <FaPlay />}</p>
          <p>{playerTime}</p>
        </button>
      </div>

      <div className="player__section player__section--middle">
        {/* eslint-disable */}
        <div
          className="progress"
          onClick={scrub}
          onMouseMove={seekTime}
          onMouseEnter={() => {
            setState({ showTooltip: true })
          }}
          onMouseLeave={() => {
            setState({ showTooltip: false })
          }}
          ref={progress}
        >
          {/* eslint-enable */}
          <div
            className="progress__time"
            style={{ width: `${progressTime}%` }}
          />
        </div>
        <h3 className="player__title">
          {show.displayNumber}: {show.title}
        </h3>
        `
        <div
          className="player__tooltip"
          style={{
            left: `${tooltipPosition}px`,
            opacity: showTooltip ? 1 : 0,
          }}
        >
          {tooltipTime}
        </div>
      </div>

      <div className="player__section player__section--right">
        <button
          onClick={speedUp}
          onContextMenu={speedDown}
          className="player__speed"
          type="button"
        >
          <p>SPEED</p>
          <span className="player__speeddisplay">{playbackRate} &times; </span>
        </button>

        <div className="player__volume">
          <p>VOLUME</p>
          <div className="player__inputs">
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.1"
              id="vol10"
              className="sr-only"
            />
            <label htmlFor="vol10">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 10/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.2"
              id="vol20"
              className="sr-only"
            />
            <label htmlFor="vol20">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 20/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.3"
              id="vol30"
              className="sr-only"
            />
            <label htmlFor="vol30">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 30/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.4"
              id="vol40"
              className="sr-only"
            />
            <label htmlFor="vol40">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 40/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.5"
              id="vol50"
              className="sr-only"
            />
            <label htmlFor="vol50">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 50/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.6"
              id="vol60"
              className="sr-only"
            />
            <label htmlFor="vol60">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 60/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.7"
              id="vol70"
              className="sr-only"
            />
            <label htmlFor="vol70">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 70/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="0.8"
              id="vol80"
              className="sr-only"
            />
            <label htmlFor="vol80">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 80/100</span>
            </label>
            <input
              onChange={volume}
              defaultChecked
              type="radio"
              name="volume"
              value="0.9"
              id="vol90"
              className="sr-only"
            />
            <label htmlFor="vol90">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 90/100</span>
            </label>
            <input
              onChange={volume}
              type="radio"
              name="volume"
              value="1"
              id="vol100"
              className="sr-only"
            />
            <label htmlFor="vol100">
              {' '}
              {/* eslint-disable-line */}
              <span className="sr-only">Volume Level 100/100</span>
            </label>
          </div>
        </div>
      </div>
      {/* eslint-disable */}
      <audio
        ref={audio}
        onPlay={playPause}
        onPause={playPause}
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        onDurationChange={
          e => console.log('duration', e.currentTarget.duration)
          // this never seems to get called
        }
        src={show.url}
        preload="auto"
      />
      {/* eslint-enable */}
    </div>
  )
}

function formatTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  timeInSeconds -= hours * 60 * 60
  const minutes = Math.floor(timeInSeconds / 60)
  timeInSeconds -= minutes * 60

  // left pad number with 0
  const leftPad = (num: number) => `${num}`.padStart(2, '0')
  const str =
    (hours ? `${leftPad(hours)}:` : '') +
    // (minutes ? `${leftPad(minutes)}:` : '00') +
    `${leftPad(minutes)}:` +
    leftPad(Math.round(timeInSeconds))
  return str
}
