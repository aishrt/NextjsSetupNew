"use client"
import { useState, useEffect } from 'react';
import styles from './scrollToTopButton.module.css'; // You can create a CSS module for styling

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to check if the user has scrolled down
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`sectionTop ${styles.scrollToTopButton} ${isVisible ? styles.visible : ''}`}
         onClick={scrollToTop}
    >
      <span>
        <img src="/assets/images/arrowUpIcon.svg" loading="lazy" alt="Arrow-up icon jumps to the top of the site." width="auto" height="auto" />
      </span>
    </div>
  )
};

export default ScrollToTopButton;
