import React, { useState, useEffect, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Unsplash from 'react-unsplash-wrapper'
import ContentEditable from 'react-contenteditable'
import { Button } from '@supabase/ui'
import { exportComponentAsJPEG } from 'react-component-export-image';
import UnsplashImage from '../components/UnsplashImage'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


export default function Home() {
  /*
   * HOOKS BASE
  */

  //Customs
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    onStartSpeaking,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'id-ID',
      interimResults: true, // Allows for displaying real-time speech results
    }
  });

  // Refs
  let contentEditable = React.createRef()
  let componentRef = useRef();

  // State
  const [count, setCount] = useState(1)
  const [keyword, setKeyword] = useState()
  const [transcript, setTranscript] = useState([])
  const [isStop, setStop] = useState(false)
  const [quoteEl, setEl] = useState(`<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-60">Start record button or click this area to add and edit quotes.</p>`)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof results[0] === 'object' && results[0] !== null) {
      const transcriptData = results.map((res, idx) => {
        if (idx == 0) {
          return (`${res.transcript.charAt(0).toUpperCase() + res.transcript.slice(1)},`).trim()
        } if (idx == results.length - 1 ) {
          return (`${res.transcript}.`).trim()
        } else {
          return (`${res.transcript},`).trim()
        }
      }).join(' ').trim()

      setTranscript(transcriptData)
      setTranscript(data => {
        return data
      })
      setEl(`<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-60">${transcriptData}</p>`)
      setEl(data => {
        return data
      })
    }
  }, [results])

  useEffect(() => {
    setStop(!isStop)
    return () => {
      setStop(!isStop)
    }
  }, [stopSpeechToText && results])
  /*
   * METHODS ZONE
  */

  const handleClearAudio = () => {
    results.splice(0, results.length)
  }
  const handleChange = (evt) => {
    setEl(evt.target.value)
    console.log(evt.target.value)
  }

  const handleRandom = () => {
    setCount(count + 1)
    if(count > 10) {
      setCount(0)
    }
  }

  const handleShare = () => {
    toJpeg(document.getElementById('quotes'), { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        console.log(link.href)
    });
  }

  return (
    <section className="justify-center mx-auto items-center flex flex-col space-y-4 mt-4 container">
      <div className="flex flex-row space-x-6">
        <p className="text-lg opacity-80 rounded text-white text-center p-2 font-bold bg-black">Recording: {isRecording.toString() == 'true' ? <span className="text-red-600">true</span> : <span className="text-green-600">false</span>}</p>
        <div className="flex flex-row space-x-2 bg-green-200 rounded-md">
          <button className="transition duration-500 font-bold bg-green-600 p-2 text-white rounded-lg hover:opacity-70 hover:opacity-70 shadow-lg w-full">
          Sign In
          </button>
          <button className="transition duration-500 font-bold bg-black p-2 text-white rounded-lg hover:opacity-70 w-full">
          Sign Up
          </button>
        </div>
      </div>
      <div className="flex flex-row space-x-8">
      <div ref={componentRef} id="quotes" >
         <UnsplashImage imgId={count}>
          <ContentEditable
            className="quotes_text"
            innerRef={contentEditable}
            html={quoteEl} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={handleChange} // handle innerHTML change
            tagName='div' // Use a custom HTML tag (uses a div by default)
          />
          {interimResult && <div className="text-lg text-red-600 font-medium italic bg-white p-1 m-4">{interimResult}...</div>}
        </UnsplashImage>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <button className="transition text-base duration-500 font-bold bg-black p-2 text-white rounded-lg hover:opacity-70 w-full flex flex-row space-x-2 items-center justify-center" onClick={handleShare}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629         8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
            fill="currentColor"
          />
        </svg>
        <span>Share Quotes</span>
        </button>
        <button className="transition duration-500 font-bold bg-black p-2 text-white rounded-lg hover:opacity-70" onClick={()  => exportComponentAsJPEG(componentRef)}>
          Download Quotes
        </button>
      </div>
      </div>
      <div className="flex flex-row space-x-4 items-center justify-center">
      <button className="transition duration-500 font-bold bg-green-600 p-2 text-white rounded-lg hover:opacity-70"onClick={handleRandom}>Change Background</button>
      <button className={`transition duration-500 font-bold ${isRecording ? 'bg-red-600': 'bg-yellow-600'} p-2 text-white rounded-lg hover:opacity-70`} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? 'Stop Recording' : (isStop ? 'Start Recording': 'Reset Recording')}
      </button>
      </div>
    </section>
  )
}