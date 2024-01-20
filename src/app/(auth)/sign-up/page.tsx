"use client";

import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credential-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Something went wrong");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verifiication email sent to ${sentToEmail}.`);
      router.push(`/verify-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    // send data to the server
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-x-2 text-center">
            <Icon.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Button variant="link" asChild>
              <Link href="/sign-in">
                Already have an account? Sign-in{" "}
                <MoveRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid  gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    className={cn("focus-visible:ring-black", {
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid  gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn("focus-visible:ring-black", {
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                </div>

                <Button>
                  {" "}
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Sign up"
                  )}{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
