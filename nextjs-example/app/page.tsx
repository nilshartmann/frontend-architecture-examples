import { redirect } from "next/navigation";
import NewsletterForm from "@/app/post/[postId]/NewsletterForm";
import { loadToc } from "@/app/api-queries";
import OrderByButton from "@/app/OrderByButton";
import Link from "next/link";

type HomePageProps = {
  searchParams?: { [key: string]: string };
};

export default async function Home({ searchParams }: HomePageProps) {
  const orderBy = (searchParams?.order_by || "asc") as "asc" | "desc";

  return (
    <>
      <header>
        <div></div>
        <div>
          <h1>My personal blog</h1>
        </div>
        <div></div>
      </header>
      <div className="Content">
        <main>
          <div className={"ButtonBar"}>
            <OrderByButton orderBy={"asc"} />
            <OrderByButton orderBy={"desc"} />
          </div>

          <Toc orderBy={orderBy} />
        </main>
        <aside>
          <NewsletterForm />
        </aside>
      </div>
    </>
  );
}

async function Toc({ orderBy }: { orderBy: "asc" | "desc" }) {
  const toc = await loadToc(orderBy);
  return (
    <div className={"Toc"}>
      <h1>Table of contents</h1>
      <ul>
        {toc.items.map((t) => (
          <li key={t.id}>
            <Link href={`/post/${encodeURIComponent(t.id)}`} prefetch={false}>
              {" "}
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
