"use client";

import { useEffect } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <Container className="text-center">
        <div className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-medium text-text-muted">
            <span className="size-1.5 rounded-full bg-brand" />
            Something went wrong
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary max-w-lg">
            We ran into an unexpected issue
          </h1>
          <p className="text-text-secondary max-w-md leading-relaxed">
            This might be a temporary glitch. Please try refreshing the page.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" size="lg" onClick={reset}>
              Try again
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => (window.location.href = "/")}
            >
              Go home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
