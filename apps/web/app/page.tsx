import { Button } from "@workspace/ui/components/button";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex min-h-screen flex-col max-w-6xl w-full">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 px-4">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Spizzichouse</span>
            </div>
            <div className="flex items-center gap-4">
              {data.user ? (
                <Button asChild className="cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild className="cursor-pointer">
                  <Link href="/auth/signin">Signin</Link>
                </Button>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto max-w-[800px] px-4 md:px-6">
              <div className="flex flex-col justify-center items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Matches Like Never Before
                  </h1>
                  <p className=" text-muted-foreground md:text-xl">
                    Spizzichouse gives you real-time insights into your game
                    performance with advanced analytics and beautiful
                    visualizations.
                  </p>
                </div>
                {data.user ? (
                  <Button asChild>
                    <Link href="/dashboard">Go to dashboard</Link>
                  </Button>
                ) : (
                  <Button className="cursor-pointer" asChild>
                    <Link href="/auth/signin">Get started</Link>
                  </Button>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
