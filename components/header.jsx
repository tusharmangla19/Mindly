import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenBox, FolderOpen, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import { useTheme } from "next-themes";
import ThemeToggle from "./theme-toggle";

async function Header() {
  await checkUser();

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <h1
            className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 dark:from-orange-400 dark:via-fuchsia-500 dark:to-blue-400 bg-clip-text text-transparent h-10 w-auto object-contain"
          >
            Mindly
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>
          <Link href="/journal/write">
            <Button variant="journal" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
