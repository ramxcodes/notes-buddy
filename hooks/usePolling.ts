import { useEffect, useState } from "react";

function usePolling<T>(url: string, interval = 5000): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { cache: "no-store" });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Polling Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    timer = setInterval(fetchData, interval);

    return () => clearInterval(timer);
  }, [url, interval]);

  return { data, loading };
}

export default usePolling;
