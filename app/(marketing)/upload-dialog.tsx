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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fileName: z.string().min(1).max(200),
  file:
    typeof FileList !== "undefined"
      ? z.instanceof(FileList).refine((value) => value.length > 0, {
          message: "You must select a file",
        })
      : z.any(),
});

export const UploadDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileName: "untitled",
      file: undefined,
    },
  });

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFiles);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsBlurred(true);
    const postUrl = await generateUploadUrl();
    // TODO: fix fetch success but create file failed
    // this lead to file uploaded but not saved record in db
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.file[0].type },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    await createFile({
      name: values.fileName,
      fileId: storageId,
      orgId: "123",
    });

    form.reset();
    setIsDialogOpen(false);
    setIsBlurred(false);
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>
        <DialogContent>
          {isBlurred && (
            <div className="flex absolute inset-0 backdrop-blur-md items-center justify-center rounded-lg">
              <Loader className="h-10 w-10 animate-spin" />
            </div>
          )}
          <DialogHeader>
            <DialogTitle>Upload your file</DialogTitle>
            <DialogDescription>This is a test description</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FileName</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <Input type="file" {...form.register("file")} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">Submit</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
          <DialogFooter>This is footer</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
