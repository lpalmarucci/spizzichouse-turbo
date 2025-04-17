import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/providers/shadcn";
import { TanstackQueryProvider } from "@/providers/query";
import { ApolloWrapper } from "@/providers/apollo";

export async function RootProvider({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <TanstackQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TanstackQueryProvider>
    </ApolloWrapper>
  );
}
