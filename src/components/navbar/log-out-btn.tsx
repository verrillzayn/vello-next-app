"use client";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";

interface ILogOutButtonProps extends ButtonProps {
  info?: string;
}

const LogOutButton = ({
  info,
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ILogOutButtonProps) => {
  const { signOut } = useAuth();

  return (
    <Button
      {...props}
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      onClick={signOut}
    >
      {info ? info : "Log out"}
    </Button>
  );
};

export default LogOutButton;
