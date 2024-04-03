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
import { zodResolver } from "@hookform/resolvers/zod";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileName: "untitled",
      file: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>
        <DialogContent>
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
                  <Button type="submit" variant="secondary">
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
