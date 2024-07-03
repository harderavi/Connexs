import { useEffect } from "react";

interface useClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
}

const useClickOutside = ({ ref, callback }: useClickOutsideProps) => {
  useEffect(() => {
    console.count('useClickOutside hook call count');
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
