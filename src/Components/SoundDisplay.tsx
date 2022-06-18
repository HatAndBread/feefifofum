import React from 'react';
import image from '../lib/image';
import {useAppContext} from '../Context';

const SoundDisplay = () => {
  const ctx = useAppContext();
  return <div className="flex items-center justify-center h-56 m-8 bg-black border-4 border-white rounded-lg w-96">
    <img src={image("audio.svg")} width="80%"></img>
  </div>
}

export default SoundDisplay;
