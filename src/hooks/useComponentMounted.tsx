import { useEffect, useState } from "react";

export default function useComponentMounted() {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);
  return { isMounted };
}
