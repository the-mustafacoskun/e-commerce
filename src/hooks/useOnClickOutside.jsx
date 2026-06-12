import { useEffect } from 'react';

// Hook to handle clicks outside the referenced element
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // If click is inside, do nothing
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
