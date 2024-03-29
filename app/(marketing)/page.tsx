import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 gap-2">
      <div className="relative w-[500px] h-[500px] mb-8">
        <Image src="/empty.svg" alt="Empty" fill />
      </div>
      <div>
        <Button>Upload</Button>
      </div>
    </div>
  );
};

export default HomePage;
