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
import { Separator } from "@workspace/ui/components/separator";
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
import { signup } from "@/features/auth/auth.actions";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";

const registerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email(),
  password: z.string().min(8),
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [state, formAction] = useActionState(signup, { error: null });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="w-full max-w-md fade-in">
      <Card className="border-primary/10 shadow-xl bg-background/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Registrati
          </CardTitle>
          <CardDescription className="text-center">
            Inserisci le tue credenziali per registrarti al sito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <div className="w-full flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. Ajeje"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. Brazorf"
                          className="border-primary/20 focus-visible:ring-primary/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        autoComplete="email"
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
              <SubmitButton
                className="w-full mt-4"
                disabled={!form.formState.isValid}
              >
                Registrati
              </SubmitButton>
            </form>
          </Form>

          <div className="mt-4 flex items-center">
            <Separator className="flex-1" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Possiedi già un account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Accedi
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
