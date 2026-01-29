import { useState, useEffect } from "react";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrapping in a small timeout or a microtask can
    // sometimes silence the "synchronous" warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
};
