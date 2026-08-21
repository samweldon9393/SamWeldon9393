import { useEffect } from 'react';

/**
 * With client-side routing the document title and description no longer change
 * on their own, so each page sets its own.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
