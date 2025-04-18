"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { GoogleIcon } from "@/components/icons/google";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@workspace/ui/zod-resolver";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { login } from "@/features/auth/auth.actions";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [state, formAction] = useActionState(login, { error: null });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handleGoogleLogin() {
    console.log("href", window.location.origin);
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      .then(() => {
        // router.push("/dashboard");
      });
  }

  return (
    <div className="w-full max-w-md fade-in">
      <Card className="border-primary/10 shadow-xl bg-background/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Accedi
          </CardTitle>
          <CardDescription className="text-center">
            Inserisci le tue credenziali per accedere al tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nome@esempio.com"
                        autoComplete="current-password"
                        className="border-primary/20 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="border-primary/20 focus-visible:ring-primary/30"
                          {...field}
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Accedi
              </Button>
            </form>
          </Form>

          <div className="mt-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-2 text-xs text-muted-foreground uppercase">
              oppure
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="mt-4 gap-2">
            <Button
              variant="outline"
              className="border-primary/20 w-full cursor-pointer"
              onClick={() => handleGoogleLogin()}
            >
              <GoogleIcon />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Non hai un account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Registrati
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            Accedendo, accetti i nostri{" "}
            <Link href="/terms" className="hover:underline">
              Termini di servizio
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
