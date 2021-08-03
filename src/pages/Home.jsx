import React, { useState, useEffect, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Unsplash from 'react-unsplash-wrapper'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import { Button } from '@supabase/ui'
import { exportComponentAsJPEG } from 'react-component-export-image';


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
  const componentRef = useRef();

  // State
  const [randCount, setCount] = useState(0)
  const keywords = ['spirit', 'energetic', 'sea', 'forest', 'sky', 'night']
  const [keyword, setKeyword] = useState("")
  const [transcript, setTranscript] = useState([])
  const [isClear, setClear] = useState(false)
  const [quoteEl, setEl] = useState(`<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-60">Start record button or click this area to add quotes.</p>`)
  const [isLoading, setLoading] = useState(false)

  // Effects
  useEffect(async () => {
    if(randCount < keywords.length - 1) {
      setKeyword(keywords[randCount])
    } else if(randCount > keywords.length - 1) {
      setCount(0)
    }
  }, [randCount])

  useEffect(() => {
    setLoading(!isLoading)
  }, [Unsplash])

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

  return (
    <main>
    <section className="justify-center mx-auto items-center flex flex-col space-y-4 mt-4 container">
      <p className="text-lg opacity-80 rounded text-white text-center p-2 font-bold mb-2 bg-black">Recording: {isRecording.toString() == 'true' ? <span className="text-red-600">true</span> : <span className="text-green-600">false</span>}</p>
      <div ref={componentRef}>
         <Unsplash height="500" width="500" keywords={keyword} alt="img-loading">
          <ContentEditable
            className="text-xl font-bold text-white p-4 w-3/4 m-2 bg-black opacity-60 quotes_text"
            innerRef={contentEditable}
            html={quoteEl} // innerHTML of the editable div
            disabled={false}       // use true to disable editing
            onChange={handleChange} // handle innerHTML change
            tagName='div' // Use a custom HTML tag (uses a div by default)
          />
          {interimResult && <div className="text-lg text-red-600 font-medium italic bg-white p-1 m-4">{interimResult}...</div>}
        </Unsplash>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-center">
        <button className="transition duration-500 font-bold bg-green-600 p-2 text-white rounded-lg hover:opacity-70"onClick={() => setCount(randCount + 1)}>Change Background</button>
        <button className="transition duration-500 font-bold bg-black p-2 text-white rounded-lg hover:opacity-70" onClick={() => exportComponentAsJPEG(componentRef, {fileName : 'quotes-kicaw'})}>
          Download Quotes
        </button>
        <button className="transition duration-500 font-bold bg-red-600 p-2 text-white rounded-lg hover:opacity-70" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
    </section>
    </main>
  )
}