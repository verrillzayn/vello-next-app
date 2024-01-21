import { Icon } from "@/components/Icons";
import Cart from "@/components/navbar/cart";
import NavItems from "@/components/navbar/nav-items";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/paylaod-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import UserAccountNav from "@/components/navbar/user-acc-nav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-background">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-muted-foreground/20">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile Nav */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icon.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Button variant="ghost" asChild>
                      <Link href="/sign-in">Sign in</Link>
                    </Button>
                  )}
                  {user ? null : (
                    <span
                      className="h-6 w-px bg-muted-foreground/20"
                      aria-hidden
                    />
                  )}

                  {user ? (
                    <UserAccountNav />
                  ) : (
                    <Button asChild variant="ghost">
                      <Link href="/sign-up">Create account</Link>
                    </Button>
                  )}

                  {user ? (
                    <span
                      className="h-6 w-px bg-muted-foreground/20"
                      aria-hidden
                    />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-muted-foreground/20"
                        aria-hidden
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
