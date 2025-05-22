import { useState, useEffect } from "react";

/**
 * Custom hook for detecting scroll position and applying effects
 * @param threshold - Number of pixels to scroll before effect is triggered (default: 50)
 * @returns Boolean indicating whether the page has been scrolled past the threshold
 */
export function useScrollEffect(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Handler to call on window scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call handler right away to check initial scroll position
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  return scrolled;
}
