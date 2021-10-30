import React, { useState, useEffect, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Unsplash from 'react-unsplash-wrapper';
import ContentEditable from 'react-contenteditable';
import { Button } from '@supabase/ui';
import { exportComponentAsJPEG } from 'react-component-export-image';
import UnsplashImage from '@/components/UnsplashImage';
import NavBar from '@/components/NavBar';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { nanoid } from 'nanoid';
import Hiw from '@/components/Hiw'
import { isChrome } from 'react-device-detect'

export default function Home() {
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
    },
  });

  // Refs
  let contentEditable = React.createRef();
  let componentRef = useRef();

  // State
  const [count, setCount] = useState(1);
  const [keyword, setKeyword] = useState();
  const [transcript, setTranscript] = useState([]);
  const [isStop, setStop] = useState(false);
  const [quoteEl, setEl] = useState(
    `<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-80">Click this area to add and edit quotes.</p>`
  );
  const [isLoading, setLoading] = useState(true);
  const defaultEl = `<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-80">Click this area to add and edit quotes.</p>`
  const [isOpen, setOpen] = useState(true)

  useEffect(() => {
    if (typeof results[0] === 'object' && results[0] !== null) {
      const transcriptData = results
        .map((res, idx) => {
          if (idx == 0) {
            return `${
              res.transcript.charAt(0).toUpperCase() + res.transcript.slice(1)
            },`.trim();
          }
          if (idx == results.length - 1) {
            return `${res.transcript}.`.trim();
          } else {
            return `${res.transcript},`.trim();
          }
        })
        .join(' ')
        .trim();

      setTranscript(transcriptData);
      setTranscript((data) => {
        return data;
      });
      setEl(
        `<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-60">${transcriptData}</p>`
      );
      setEl((data) => {
        return data;
      });
    }
  }, [results]);

  useEffect(() => {
    setStop(!isStop);
    return () => {
      setStop(!isStop);
    };
  }, [stopSpeechToText && results]);
  /*
   * METHODS ZONE
   */

  const handleClearAudio = () => {
    results.splice(0, results.length);
    setEl(defaultEl)
  };

  const handleChange = (evt) => {
    setEl(evt.target.value);
    console.log(evt.target.value);
  };

  const handleRandom = () => {
    setCount(count + 1);
    if (count > 10) {
      setCount(0);
    }
  };

  const handleShare = () => {
    toJpeg(document.getElementById('quotes'), { quality: 0.95 }).then(function (
      dataUrl
    ) {
      const link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      console.log(dataUrl);
    });
  };

  return (
    <section className='content justify-center items-center flex flex-col space-y-6 md:space-y-6 my-6 md:mt-0 mt-12'>
      <NavBar isRecording={isRecording} setOpen={setOpen} />
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
        <Hiw isOpen={isOpen} setOpen={setOpen} />
        <div ref={componentRef} id='quotes'>
          <UnsplashImage imgId={count}>
            <ContentEditable
              className='quotes_text'
              innerRef={contentEditable}
              html={quoteEl} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={handleChange} // handle innerHTML change
              tagName='div' // Use a custom HTML tag (uses a div by default)
            />
            {interimResult && (
              <div className='text-lg text-red-600 font-medium italic bg-white p-1 m-4'>
                {interimResult}...
              </div>
            )}
          </UnsplashImage>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2  text-sm md:text-base'>
          <button
            className='transition duration-500 font-bold bg-black p-2 text-white shadow-lg hover:opacity-70'
            onClick={() =>
              exportComponentAsJPEG(componentRef, {
                fileName: `quotes-${nanoid(3)}`,
              })
            }
          >
            Download Quotes
          </button>
        </div>
      </div>
      <div className='flex flex-row space-x-4 items-center justify-center'>
        <button
          className='transition text-sm duration-500 font-bold bg-green-600 p-2 text-white shadow-lg hover:opacity-70 md:text-base'
          onClick={handleRandom}
        >
          Change Background
        </button>
        {isChrome &&
        <button
          className={`transition duration-500 font-bold ${
            isRecording ? 'bg-red-600' : 'bg-yellow-600'
          } p-2 text-white shadow-lg hover:opacity-70 text-sm md:text-base`}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? 'Stop Recording' : 'Start Voice Input'}
        </button>}
        <button className="bg-red-900 p-2 text-white font-bold shadow-lg hover:opacity-70 text-sm md:text-base hover:bg-red-600" onClick={handleClearAudio}>
          Clear Quotes
        </button>
      </div>
    </section>
  );
}
