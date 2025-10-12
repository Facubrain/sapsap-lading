import { useEffect, useRef, useState } from 'react';

interface UseVideoLazyLoadProps {
  threshold?: number;
}

interface UseVideoLazyLoadReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isInView: boolean;
  shouldLoadVideo: boolean;
}

export const useVideoLazyLoad = ({ 
  threshold = 0.1 
}: UseVideoLazyLoadProps = {}): UseVideoLazyLoadReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        // Once the video enters the viewport, we should load it
        if (entry.isIntersecting && !shouldLoadVideo) {
          setShouldLoadVideo(true);
        }
      },
      {
        threshold,
        rootMargin: '100px' // Load video 100px before it becomes visible
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, [threshold, shouldLoadVideo]);

  return {
    videoRef,
    isInView,
    shouldLoadVideo
  };
};