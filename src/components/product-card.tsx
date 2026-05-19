"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="rounded-2xl border border-black/5 bg-white p-4">
      <Link href={`/products/${product.slug}`} className="space-y-3">
        <div className="overflow-hidden rounded-2xl bg-[--color-soft-peach]">
          <Image src={product.image} alt={product.name} width={800} height={600} className="h-44 w-full object-cover" loading="lazy" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[--color-text]">{product.name}</h3>
          <p className="text-sm text-[--color-text-muted]">{product.unitPrice}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-[--color-deep-teal]">{product.category.replace(/-/g, " ")}</p>
        </div>
      </Link>
    </motion.article>
  );
}
