import Link from "next/link";
import { Trophy } from "lucide-react";

export default async function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-background p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl">Spizzichouse</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
