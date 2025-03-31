import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/providers/shadcn";
import { TanstackQueryProvider } from "@/providers/query";

export async function RootProvider({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TanstackQueryProvider>
  );
}
