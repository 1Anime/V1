"use client";
import React, { useState } from 'react';
import { DiscussionEmbed } from "disqus-react";
import styles from './comments.css'; 

const DisqusComments = ({ post }) => {
  let currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  currentUrl = currentUrl.replace(/&?host=[^&]*/, '').replace(/&?epid=[^&]*/, '').replace(/&?type=[^&]*/, '');
  const disqusShortname = "aniwatchcommunity";
  const disqusConfig = {
    url: currentUrl,
    identifier: currentUrl,
    title: `${post.title} - Episode ${post.episode}`, // Single post title
  };

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };


  return (
    <div>
    <button 
                              className="bg-[#1a1a1f] text-white text-xs font-bold px-2 py-1 rounded-md"
  onClick={toggleComments}>
    {showComments ? 'Hide Comments' : 'Show Comments'}
  </button>
  {showComments && (
    <div className="comments">
  <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
      </div>
  )}
</div>
);
};
  
function removeIframesWithHtml() {
  const disqusDiv = document.getElementById('disqus_thread');

  if (disqusDiv && disqusDiv.getElementsByTagName('iframe').length > 0) {
      const iframes = disqusDiv.getElementsByTagName('iframe');
      for (let i = 0; i < iframes.length; i++) {
          const iframe = iframes[i];
          if (iframe.contentDocument.documentElement.tagName.toLowerCase() === 'html') {
              // Remove the iframe
              iframe.parentNode?.removeChild(iframe);
}}}}


let count = 0;
const intervalId = setInterval(() => {
  removeIframesWithHtml();
  count += 2;
  if (count >= 60) {
      clearInterval(intervalId); 
  }
}, 2000);
export default DisqusComments;
