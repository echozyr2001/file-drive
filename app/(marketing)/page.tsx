"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UploadDialog } from "./upload-dialog";
import { FileCard } from "./file-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  // TODO: fix this organization may be null
  const { organization } = useOrganization();
  const files = useQuery(
    api.files.getFiles,
    organization ? { orgId: organization.id } : "skip"
  );

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
        <UploadDialog />
      </div>
      <div className="h-full">
        {files ? (
          files.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 px-8">
              {files.map((file) => (
                <FileCard key={file._id} file={file} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <Image
                src="/empty.svg"
                alt="Empty"
                width={500}
                height={500}
                priority
                className="w-[500px] h-auto"
              />
              <div className="text-2xl">
                You have no files, go to upload now
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="h-52 w-52 animate-spin" />
            <div className="text-2xl">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
