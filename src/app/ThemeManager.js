"use client"
import { useEffect } from 'react';

const ThemeManager = () => {
  
    useEffect(() => {
        // Check for the presence of a saved theme in the cookie when the component mounts
        const savedTheme = getCookie("selectedTheme");
        if (savedTheme) {
          // Apply the saved theme to the site's CSS
          if (savedTheme === 'purple') {
            document.documentElement.style.setProperty('color', '#8e50cc'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#271632');
          } else if (savedTheme === 'blue') {
            document.documentElement.style.setProperty('color', '#027AEF'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#161832');
          } else if (savedTheme === 'green') {
            document.documentElement.style.setProperty('color', '#02EF12'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#16321F');
          } else if (savedTheme === 'pink') {
            document.documentElement.style.setProperty('color', '#EF02ED'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#321631');
        } else if (savedTheme === 'yellow') {
            document.documentElement.style.setProperty('color', '#F0C335'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#504522');
        } else if (savedTheme === 'red') {
            document.documentElement.style.setProperty('color', '#C12727'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#321616');
        } else if (savedTheme === 'orange') {
            document.documentElement.style.setProperty('color', '#D28525'); // Update primary color CSS variable
            document.documentElement.style.setProperty('background-color', '#322716');
          }
        }
      }, []);
    
    
  return null; // This component does not render anything
};

export default ThemeManager;

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };  
  