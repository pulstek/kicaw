import React, { useState, useEffect, useRef } from 'react';
import '@/styles/NavBar.css'
import RecIcon from '@/components/RecIcon'

export default function NavBar(props) {
  let isRecording = props.isRecording
  return (
    <nav id="navbar">
      <div className='p-2'>
        <img src='logo.svg' class='w-48 h-10' />
      </div>
      <div id="record_status">
        <p className="flex flex-row space-x-2 items-center text-center justify-center">
          <p className={isRecording ? 'animate-pulse text-red-800 text-lg' : 'text=lg none text-green-800'}><RecIcon/></p>
          Recording:{' '}
          {isRecording.toString() == 'true' ? (
            <span className='text-red-600 '>true</span>
          ) : (
            <span className='text-green-600'>false</span>
          )}
        </p>
      </div>
      <div id='nav_button'>
        <button class='nav_button_item'>
          About
        </button>
        <button class='' onClick={() => props.setOpen(true)}>
          How It Work ?
        </button>
      </div>
    </nav>
  );
}
