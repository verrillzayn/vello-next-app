import LogOutButton from "@/components/navbar/log-out-btn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/payload-types";
import Link from "next/link";

const UserAccountNav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium text-foreground">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/sell">
            Seller dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer p-0">
          <LogOutButton
            className="w-full justify-start px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            variant="ghost"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
