import { useCallback, useState } from 'react';

export const useVisibility = () => {
  const [visibility, setVisibility] = useState(false);

  const onOpen = useCallback(() => {
    setVisibility(true);
  }, [setVisibility]);

  const onClose = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return {
    visibility,
    onOpen,
    onClose,
  };
};