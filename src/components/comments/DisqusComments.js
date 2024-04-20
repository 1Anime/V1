"use client";

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

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

const disqusDiv = document.getElementById('disqus_thread');
if (disqusDiv && disqusDiv.getElementsByTagName('iframe').length > 0) {
    const iframes = disqusDiv.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        if (iframe.contentDocument.documentElement.tagName.toLowerCase() === 'html') {
            iframe.parentNode?.removeChild(iframe);
        }
    }
}


export default DisqusComments;
