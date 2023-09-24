import Header from "@/app/post/[postId]/Header";
import NewsletterForm from "@/app/post/[postId]/NewsletterForm";

type Params = { postId: string };

export default function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  return (
    <>
      <Header postId={params.postId} />
      <div className="Content">
        <main>{children}</main>
        <aside>
          <NewsletterForm />
        </aside>
      </div>
    </>
  );
}
