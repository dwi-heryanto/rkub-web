"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="h-full"
    >
      <Card className="h-full p-4">
        <Link href={`/products/${product.slug}`} className="space-y-3">
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-[--color-soft-peach]">
            <Image
              src={product.image}
              alt={product.name}
              width={704}
              height={396}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="h-44 w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[--color-text]">{product.name}</h3>
            <p className="text-sm text-[--color-text-muted]">{product.unitPrice}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-[--color-deep-teal]">{product.category.replace(/-/g, " ")}</p>
          </div>
        </Link>
      </Card>
    </motion.article>
  );
}
