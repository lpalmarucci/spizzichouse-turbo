import {ClerkProvider} from "@clerk/nextjs";
import {PropsWithChildren} from "react";
import {ThemeProvider} from "@/providers/shadcn";


export async function RootProvider({children}: PropsWithChildren) {
    return <ClerkProvider>
        <ThemeProvider>{children}</ThemeProvider>
    </ClerkProvider>
}
