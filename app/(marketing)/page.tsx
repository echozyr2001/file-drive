"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";

const HomePage = () => {
  // TODO: fix orgainzation maybe not loaded
  const { organization } = useOrganization();

  const createFile = useMutation(api.files.createFiles);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1>Your files</h1>
        <div className="flex gap-4">
          <Input placeholder="🔍 Search file name" />
          <Button type="submit" onClick={() => alert("you click search")}>
            Search
          </Button>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Upload</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload your file</DialogTitle>
                <DialogDescription>
                  This is a test description
                </DialogDescription>
              </DialogHeader>
              Add a form here
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
        <Button
          onClick={() => {
            // TODO: fix orgainzation maybe not loaded
            if (!organization) return;
            createFile({
              name: "hello world",
              orgId: organization?.id,
            });
          }}
        >
          test
        </Button>
        <Image src="/empty.svg" alt="Empty" width={300} height={300} />
        <div className="text-2xl">You have no files, go to upload now</div>
      </div>
    </div>
  );
};

export default HomePage;
