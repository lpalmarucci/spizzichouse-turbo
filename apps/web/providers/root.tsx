import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/providers/shadcn";
import { TanstackQueryProvider } from "@/providers/query";

export async function RootProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <TanstackQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TanstackQueryProvider>
    </ClerkProvider>
  );
}
