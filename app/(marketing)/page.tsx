"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
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
        <Button>Upload</Button>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
        <Image src="/empty.svg" alt="Empty" width={300} height={300} />
        <div className="text-2xl">You have no files, go to upload now</div>
      </div>
    </div>
  );
};

export default HomePage;
