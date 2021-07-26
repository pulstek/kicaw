import React, {useState} from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Unsplash from 'react-unsplash-wrapper'


export default function Home() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      lang: 'id-ID',
      interimResults: true, // Allows for displaying real-time speech results
    }
  });

  if(typeof results[0] === 'object' && results[0] !== null) {
     console.log(results[results.length - 1].transcript)
  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <Unsplash height="500" width="500" keywords="spirit, energetic, sea">
        <div className="text-xl font-bold text-white p-2 m-4 bg-black opacity-60">
        {results.map((result, index) => (
          index == results.length - 1 ? <p key={result.timestamp}>{result.transcript}.</p> : (index == 0 ? <p className="capitalize-first" key={result.timestamp}>{result.transcript},</p> : <p key={result.timestamp}>{result.transcript},</p>)
        ))}
        </div>
        {interimResult && <div className="text-lg text-red-600 font-medium italic bg-white p-1 m-4">{interimResult}...</div>}
      </Unsplash>

    </div>
  );
}
