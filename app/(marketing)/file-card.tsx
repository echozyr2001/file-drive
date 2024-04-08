import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FileTextIcon, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  file: Doc<"files">;
};

const typeIcons = {
  image: <ImageIcon />,
  pdf: <FileTextIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

export const FileCard = ({ file }: Props) => {
  const deleteFile = useMutation(api.files.deleteFile);
  const fileUrl = useQuery(api.files.getFileUrl, { id: file._id });
  // TODO: handle error
  if (!fileUrl) {
    throw new Error("File url is not available");
  }

  return (
    <div className="shadow-lg hover:shadow-none shadow-cyan-500/20 rounded-lg">
      <Card>
        <CardHeader className="relative">
          <CardTitle className="flex gap-2">
            {typeIcons[file.type]}
            {file.name}
          </CardTitle>
          <div className=" absolute top-2 right-2">
            <AlertDialog>
              <AlertDialogTrigger className="text-red-500">
                <Trash2 />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      deleteFile({
                        fileId: file._id,
                      })
                    }
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          {file.type === "image" ? (
            <Image
              height={200}
              width={200}
              alt={file.name}
              src={fileUrl}
              className="h-auto w-auto"
            />
          ) : (
            <FileTextIcon className="h-[100px] w-[100px]" />
          )}
        </CardContent>
        <CardFooter>
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
