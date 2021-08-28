import React, { useState, useEffect, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Unsplash from 'react-unsplash-wrapper';
import ContentEditable from 'react-contenteditable';
import { Button } from '@supabase/ui';
import { exportComponentAsJPEG } from 'react-component-export-image';
import UnsplashImage from '../components/UnsplashImage';
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
    `<p className="text-xl font-bold text-white p-4 w-3/4 m-4 bg-black opacity-60">Start record button or click this area to add and edit quotes.</p>`
  );
  const [isLoading, setLoading] = useState(true);

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
    <section className='justify-center items-center flex flex-col space-y-6 md:space-y-4 my-6 md:mt-0 mt-12'>
      <div className='flex flex-row space-x-2 bg-gray-200 items-center justify-center'>
        <div className='p-2'>
          <svg
            width='88'
            height='39'
            viewBox='0 0 68 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M22.5859 10.7969L21.1953 12.1016L20.6875 15H18.0156L19.9844 3.625H22.6641L21.8125 8.49219L22.9219 7.14062L25.875 3.625H29.3438L24.625 8.77344L27.2422 15H24.1875L22.5859 10.7969ZM30.8828 15H28.2109L30.1875 3.625H32.8516L30.8828 15ZM42.3281 11.125C42.2604 11.9219 41.9974 12.6302 41.5391 13.25C41.0859 13.8698 40.487 14.3464 39.7422 14.6797C39.0026 15.013 38.2005 15.1719 37.3359 15.1562C36.1484 15.1302 35.2135 14.7474 34.5312 14.0078C33.849 13.2682 33.4766 12.2656 33.4141 11C33.3672 10.1562 33.4583 9.23698 33.6875 8.24219C33.9219 7.2474 34.2995 6.38281 34.8203 5.64844C35.3464 4.90885 35.9635 4.35677 36.6719 3.99219C37.3854 3.6224 38.1641 3.44531 39.0078 3.46094C40.2474 3.48177 41.2266 3.85417 41.9453 4.57812C42.6693 5.30208 43.0625 6.29948 43.125 7.57031L40.4609 7.5625C40.4714 6.86979 40.3464 6.375 40.0859 6.07812C39.8255 5.78125 39.4141 5.6224 38.8516 5.60156C37.4453 5.55469 36.5885 6.64844 36.2812 8.88281C36.1406 9.89323 36.0703 10.6146 36.0703 11.0469C36.0443 12.3281 36.5182 12.987 37.4922 13.0234C38.1224 13.0443 38.625 12.8906 39 12.5625C39.375 12.2292 39.6146 11.7604 39.7188 11.1562L42.3281 11.125ZM49.7422 12.875H46.1094L45.1016 15H42.1562L48.1797 3.625H50.6953L52.7969 15H50.0156L49.7422 12.875ZM47.1094 10.7578H49.4688L48.9688 6.83594L47.1094 10.7578ZM62.6797 10.7266L65.0547 3.625H67.7578L63.6328 15H60.8672L60.4062 8.55469L57.9531 15H55.1875L54.6172 3.625H57.2188L57.375 10.6953L59.9844 3.625H62.2578L62.6797 10.7266Z'
              fill='#515151'
            />
            <circle cx='4' cy='12' r='4' fill='#24DB78' />
            <circle cx='12' cy='6' r='6' fill='#24DB78' />
          </svg>{' '}
        </div>
        <div className='flex flex-row space-x-6 bg-gray-200 p-2 items-center justify-center'>
          <p className='text-lg opacity-80 rounded text-white text-center p-2 font-bold bg-black shadow-lg'>
            Recording:{' '}
            {isRecording.toString() == 'true' ? (
              <span className='text-red-600'>true</span>
            ) : (
              <span className='text-green-600'>false</span>
            )}
          </p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
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
            className='transition duration-500 font-bold bg-black p-2 text-white rounded-lg hover:opacity-70'
            onClick={() => exportComponentAsJPEG(componentRef)}
          >
            Download Quotes
          </button>
        </div>
      </div>
      <div className='flex flex-row space-x-4 items-center justify-center  text-sm md:text-base'>
        <button
          className='transition text-sm duration-500 font-bold bg-green-600 p-2 text-white rounded-lg hover:opacity-70'
          onClick={handleRandom}
        >
          Change Background
        </button>
        <button
          className={`transition duration-500 font-bold ${
            isRecording ? 'bg-red-600' : 'bg-yellow-600'
          } p-2 text-white rounded-lg hover:opacity-70`}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording
            ? 'Stop Recording'
            : isStop
            ? 'Start Recording'
            : 'Reset Recording'}
        </button>
      </div>
    </section>
  );
}
