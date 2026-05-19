"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { SearchInput } from "./SearchInput";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Create",
    href: "/create",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md mb-4">
      <div className="w-full flex h-16 items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-xl font-black">N</span>
            </div>

            <div className="flex flex-col leading-none">
              <h1 className="text-2xl font-black tracking-tight">
                Next<span className="text-primary">Pro</span>
              </h1>

              <p className="text-xs text-muted-foreground">
                Modern Blog Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={buttonVariants({
                    variant: isActive ? "default" : "ghost",
                  })}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="hidden md:block mr-2">
            <SearchInput />
          </div>
          <ThemeToggle />

          {isLoading ? null : isAuthenticated ? (
            <Button
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("Logged out successfully");
                      router.push("/");
                    },
                    onError: (error) => {
                      toast.error(error.error.message);
                    },
                  },
                })
              }
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Login
              </Link>

              <Link href="/auth/signup" className={buttonVariants()}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-lg p-2 transition hover:bg-muted">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-75">
              <div className="mt-8 flex flex-col gap-3">
                {/* Mobile Logo */}
                <Link href="/" className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-lg font-black">N</span>
                  </div>

                  <div>
                    <h1 className="text-xl font-black">
                      Next<span className="text-primary">Pro</span>
                    </h1>

                    <p className="text-xs text-muted-foreground">
                      Modern Blog Platform
                    </p>
                  </div>
                </Link>

                {/* Mobile Nav Links */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={buttonVariants({
                        variant: isActive ? "default" : "ghost",
                      })}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {/* Mobile Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  {isLoading ? null : isAuthenticated ? (
                    <Button
                      onClick={() =>
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              toast.success("Logged out successfully");
                              router.push("/");
                            },
                            onError: (error) => {
                              toast.error(error.error.message);
                            },
                          },
                        })
                      }
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className={buttonVariants({
                          variant: "outline",
                        })}
                      >
                        Login
                      </Link>

                      <Link href="/auth/signup" className={buttonVariants()}>
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
