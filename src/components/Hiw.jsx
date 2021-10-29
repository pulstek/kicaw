import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function Hiw({isOpen, setOpen}) {

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">

      <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay />

        <div className="relative bg-white rounded max-w-sm mx-auto p-6 flex flex-col space-y-4">
      <Dialog.Title><span className="text-xl font-bold">How It Works ?</span></Dialog.Title>
      <Dialog.Description>
This application will generate quotes based on text input, and use a random image as the background.
      </Dialog.Description>

      <p>
       To add a quote you can manually type in the box on the image, or if you use the <strong>Chrome Browser</strong> you can use voice input as text input.
      </p>
      <button className="p-2 bg-yellow-600 text-white font-bold" onClick={() => setOpen(false)}>Close</button>
      </div>
      </div>
    </Dialog>
  )
}
export default Hiw
