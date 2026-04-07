import { useState, useCallback } from "react";

export function useCopy(timeout = 1500) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, id: string) => {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), timeout);
    },
    [timeout]
  );

  return { copiedId, copy };
}
