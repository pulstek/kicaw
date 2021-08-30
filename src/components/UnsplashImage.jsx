import React, { useEffect, useState } from 'react'
import { createApi } from 'unsplash-js';
import { styled, css } from '@stitches/react';


export default function UnsplashImage(props) {
  const unsplash = createApi({
    accessKey: 'ai59L0lsBQpDcZPV64oaPlMDNTCUZWQR-jmZMt3s9O0',
    //...other fetch options
  });
  const [imgList, setImg] = useState({})
  const sectionImg = css({
    background: `url(${imgList[props.imgId]})`,
    width: '450px',
    height: '450px',
    '@media (max-width: 500px)': {
      width: '300px',
      height: '300px',
    }
  })

  const randomNum = Math.floor(Math.random() * 45)

  const childStyle = css({
    position: "relative",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  })

  useEffect( async () => {
    let imgRes = await unsplash.collections.getPhotos({ collectionId: '3694365', page: randomNum })
      .then(res => res.response.results.map(data => data.urls.regular))
    setImg(imgRes)
  }, [])

  return (
    <section id="unsplash_image_section" className={`items-center justify-center ${sectionImg()}  w-32 h-32 md:w-auto md:h-auto`}>
      <div className={`${childStyle()} items-center justify-center text-lg md:text-xl font-bold text-white p-4 w-3/4 bg-black opacity-60`}>{props.children}</div>
    </section>
  )
}