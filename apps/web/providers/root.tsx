import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/providers/shadcn";
import { ApolloWrapper } from "@/providers/apollo";

export async function RootProvider({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloWrapper>
  );
}
