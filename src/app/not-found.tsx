import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-gem flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow text-gold-600">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink-900">This page has wandered off</h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
        back to something beautiful.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/collections/all">Shop All Jewellery</Link>
        </Button>
      </div>
    </div>
  );
}
