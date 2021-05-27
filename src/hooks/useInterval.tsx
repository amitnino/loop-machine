import { useEffect, useRef } from 'react';

type useIntervalProps = {
  callback: () => void,
  delay: number | null,
};

const useInterval = ({callback, delay}: useIntervalProps) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the Interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    };

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay]);
};

export default useInterval;