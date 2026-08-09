import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
  className?: string;
}

export function Hero({ eyebrow, title, description, cta, image, className }: HeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-white", className)}>
      <div className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/35 to-black/10" />
      </div>
      <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="max-w-3xl space-y-6">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">{eyebrow}</p>
          ) : null}
          <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-white/82 sm:text-lg">{description}</p>
          <Link href={cta.href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-fit rounded-full px-6") }>
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}