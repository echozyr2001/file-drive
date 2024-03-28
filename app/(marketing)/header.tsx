import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 bg-gray-50 p-4">
      <div className="flex mx-auto justify-between items-center h-full">
        <div>
          <h1>FileDrive</h1>
        </div>
        <div className="flex gap-2 pt-2">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <OrganizationSwitcher />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
