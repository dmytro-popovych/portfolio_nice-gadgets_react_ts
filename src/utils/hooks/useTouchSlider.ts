import { useRef, useCallback } from 'react';

export const useTouchSlider = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold: number = 50,
) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchEndX.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const startX = touchStartX.current;
    const endX = touchEndX.current;

    if (startX === 0 || endX === 0) {
      return;
    }

    const deltaX = startX - endX;

    if (deltaX > threshold) {
      onSwipeLeft();
    } else if (deltaX < -threshold) {
      onSwipeRight();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
