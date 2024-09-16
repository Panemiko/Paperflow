"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { commitSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitGraphIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useEditorStore } from "./store";

const formSchema = commitSchema.pick({
  message: true,
  description: true,
});

export function CommitForm() {
  const form = useForm({
    defaultValues: {
      message: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = api.commit.create.useMutation();

  const { content, commitPopupOpen, setCommitPopupOpen, section } =
    useEditorStore();

  async function create(data: z.infer<typeof formSchema>) {
    if (!section) return;

    try {
      await mutateAsync({
        sectionId: section.id,
        message: data.message,
        description: data.description,
        content,
      });

      setCommitPopupOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet open={commitPopupOpen} onOpenChange={setCommitPopupOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <GitGraphIcon /> Commit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>Commit changes</SheetTitle>
          <SheetDescription>
            Commit changes to the section &quot;
            {section?.title ?? "(untitled)"}&quot;.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(create)}
            className="py-10T flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="indirect notation to direct notation"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Basic description to what has changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="changed it because the indirect form was awkward to read"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can add a more detailed comment here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button isLoading={isPending} type="submit">
                Commit
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
