import React, { useState, useEffect, useRef } from 'react';
import '@/styles/NavBar.css'

export default function NavBar(props) {
  let isRecording = props.isRecording
  return (
    <nav id="navbar">
      <div className='p-2'>
        <img src='logo.svg' class='w-48 h-10' />
      </div>
      <div id="record_status">
        <p>
          Recording:{' '}
          {isRecording.toString() == 'true' ? (
            <span className='text-red-600'>true</span>
          ) : (
            <span className='text-green-600'>false</span>
          )}
        </p>
      </div>
      <div id='nav_button'>
        <button class='nav_button_item'>
          About
        </button>
        <button class=''>
          How It Work ?
        </button>
      </div>
    </nav>
  );
}
