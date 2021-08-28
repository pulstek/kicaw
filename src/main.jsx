import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import '@/index.css';
import App from '@/App';

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      defaultTitle='Kicaw - Create your quotes with speech recorder'
      titleTemplate='Kicaw - Easy make quotes from your speech'
    >
      <meta charSet='utf-8' />
      <html lang='id' amp />
      <meta name='title' content='Kicaw - Easy make quotes from your speech' />
      <meta
        name='description'
        content='Using speech to text, you can create quotes easily and quickest than typing'
      />

      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://metatags.io/' />
      <meta
        property='og:title'
        content='Kicaw - Easy make quotes from your speech'
      />
      <meta
        property='og:description'
        content='Using speech to text, you can create quotes easily and quickest than typing'
      />
      <meta
        property='og:image'
        content='https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png'
      />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://metatags.io/' />
      <meta
        property='twitter:title'
        content='Kicaw - Easy make quotes from your speech'
      />
      <meta
        property='twitter:description'
        content='Using speech to text, you can create quotes easily and quickest than typing'
      />
      <meta
        property='twitter:image'
        content='https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png'
      />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
