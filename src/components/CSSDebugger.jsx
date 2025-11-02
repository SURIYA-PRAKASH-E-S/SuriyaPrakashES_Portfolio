import { useEffect, useState } from 'react';

const CSSDebugger = () => {
  const [cssStatus, setCssStatus] = useState('checking...');

  useEffect(() => {
    // Check if Tailwind CSS is properly loaded
    const checkCSS = () => {
      const stylesheets = Array.from(document.styleSheets);
      
      // Method 1: Check if stylesheets are accessible
      let accessibleSheets = 0;
      stylesheets.forEach(sheet => {
        try {
          if (sheet.cssRules) {
            accessibleSheets++;
          }
        } catch (e) {
          console.log('Stylesheet blocked by CORS:', sheet.href);
        }
      });

      // Method 2: Check if specific Tailwind classes exist
      const testElement = document.createElement('div');
      testElement.className = 'bg-gray-50 dark:bg-gray-900 min-h-screen';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      const hasBackground = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      document.body.removeChild(testElement);

      setCssStatus(`Sheets: ${accessibleSheets}, Background: ${hasBackground}`);
      
      // Force CSS reload if needed
      if (!hasBackground || accessibleSheets === 0) {
        console.log('CSS not loaded properly, attempting to fix...');
        forceCSSLoad();
      }
    };

    const forceCSSLoad = () => {
      // Remove any existing CSS links
      const existingLinks = document.querySelectorAll('link[rel="stylesheet"]');
      existingLinks.forEach(link => link.remove());
      
      // Add CSS directly (for production)
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/assets/index.css'; // This will be your built CSS file
      document.head.appendChild(link);
      
      console.log('Manually injected CSS link');
    };

    // Check CSS after a short delay
    const timer = setTimeout(checkCSS, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 bg-yellow-500 text-black p-3 rounded-lg shadow-lg text-sm">
      <div className="font-bold">CSS Status:</div>
      <div>{cssStatus}</div>
    </div>
  );
};

export default CSSDebugger;

// Reserved by @2025 Suriya Prakash E S