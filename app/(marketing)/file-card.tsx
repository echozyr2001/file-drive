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
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";

type Props = {
  file: Doc<"files">;
};

export const FileCard = ({ file }: Props) => {
  const deleteFile = useMutation(api.files.deleteFile);

  return (
    <div className="shadow-lg hover:shadow-none shadow-cyan-500/20 rounded-lg">
      <Card>
        <CardHeader className="relative">
          <CardTitle>{file.name}</CardTitle>
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
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
