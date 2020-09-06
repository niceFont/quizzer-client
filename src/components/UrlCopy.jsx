import React, { useCallback, useState } from 'react';
import Tooltip from './Tooltip';

const UrlCopy = ({ url, className }) => {
  const [tooltip, showTooltip] = useState(false);
  const handleCopy = useCallback(() => {
    showTooltip(true);
    setTimeout(showTooltip.bind(null, false), 500);
    const url = document.getElementById('shareInput');
    url.select();
    document.execCommand('copy');
  });
  return (
    <div className={`w-4/12 justify-center items-center flex flex-col ${className}`}>
      <span className="font-semibold">Share this quiz with somebody you know!</span>
      <div className="flex flex-row">
        <input readOnly id="shareInput" className="border-gray-300 h-8 border" type="text" name="shareUrl" value={url} />
        <div className="flex flex-col">
          {tooltip && <Tooltip>Copied!</Tooltip>}
          <button type="button" onClick={handleCopy} className="h-8 px-6 transition duration-300 ease-in-out transform hover:scale-105 bg-blue-600 hover:bg-blue-500 rounded text-white">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default UrlCopy;
