import React from 'react'
import loadingGif from "./loading.gif";

function Loading() {
  return (
    <img src={loadingGif} alt="loading" width="40" id="loading" />
  );
}

export default Loading;