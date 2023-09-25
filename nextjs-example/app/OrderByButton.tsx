"use client";

import useBlogSearchParams from "@/app/useBlogSearchParams";

type OrderByButtonProps = {
  orderBy: "asc" | "desc";
};

export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const { currentOrderBy, updateOrderBy } = useBlogSearchParams();

  const label = orderBy === "asc" ? "desc" : "asc";

  return (
    <button
      disabled={currentOrderBy === orderBy}
      onClick={() => updateOrderBy(orderBy)}
    >
      Order by title {label}
    </button>
  );
}
