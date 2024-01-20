"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="mt-24 flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-destructive" />
        <h3 className="text-xl font-semibold">Theres was a problem</h3>
        <p className="text-center text-sm text-muted-foreground">
          This token is not valid or might be expired. Please try again{" "}
        </p>
      </div>
    );
  }

  if (data?.succes) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" alt="email was sent" fill />
        </div>

        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Thank you for verifying your email
        </p>
        <Button asChild className="mt-1">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-24 flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/70" />
        <h3 className="text-xl font-semibold">Verifiying...</h3>
        <p className="text-center text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
