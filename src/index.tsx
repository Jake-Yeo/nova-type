import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const cache = createCache({ // https://stackoverflow.com/questions/51518253/react-emotions-css-not-present-in-dom
  speedy: false,
  key: 'css'
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode> turned off strict mode because I had no clue how to fix the bug it was creating
  // use the custom cache with speedy set to false (this is because chrome does dom magic or something and our css styles don't show up and we can't delete them in production mode!!!!!!)
  // https://stackoverflow.com/questions/51518253/react-emotions-css-not-present-in-dom

  /**Fixed memory leak bug when deploying firebase app. https://stackoverflow.com/questions/51518253/react-emotions-css-not-present-in-dom
As described here, the <style> elements with the css from the animations were not showing up in the dom. Apparently this is a chrome thing. Because of this, useEffect hook was not working. Even worse, we could not delete the styling elements when the animation finished. This mean that although the local app had no memory leaks, the firebase app had a ton of memory leaks. So, created a new cache with the 'speedy' option set to false. This forces chrome, and every other browser, to show css content in the dom. Although this causes loss of performance, the memory leaks cause the app to become unusable.
Also deployed the changes. */
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
