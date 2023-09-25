"use client";
import { useRouter, useSearchParams } from "next/navigation";

export type OrderBy = "desc" | "asc";

export default function useBlogSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentOrderBy = (searchParams?.get("order_by") || "asc") as OrderBy;

  const updateOrderBy = (newOrderBy: OrderBy) => {
    const params = new URLSearchParams({ order_by: newOrderBy });
    router.push(`?${params.toString()}`);
  };

  return { currentOrderBy, updateOrderBy } as const;
}
