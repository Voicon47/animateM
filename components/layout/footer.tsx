import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></div>
              <div className="absolute inset-1 animate-pulse rounded-full bg-primary/40 animation-delay-200"></div>
              <div className="absolute inset-2 animate-pulse rounded-full bg-primary/60 animation-delay-500"></div>
            </div>
            <span className="font-bold">AnimateX</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 AnimateX. All rights reserved.</p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="#" className="font-medium transition-colors hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="font-medium transition-colors hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
