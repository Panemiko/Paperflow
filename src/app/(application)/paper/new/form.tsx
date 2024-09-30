"use client";

import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { paperSchema, publicUserSchema, userSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const formSchema = paperSchema
  .pick({
    title: true,
    abstract: true,
  })
  .extend({
    invitedUsers: userSchema.pick({ email: true }).array(),
  });

export function NewPaperForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      abstract: "",
      invitedUsers: [],
    },
  });

  const { mutateAsync, isPending } = api.paper.create.useMutation();
  const router = useRouter();

  const [applicationsInputValue, setApplicationsInputValue] = useState("");

  async function submit(data: z.infer<typeof formSchema>) {
    try {
      const paperId = await mutateAsync({
        abstract: data.abstract,
        invitedUsers: data.invitedUsers,
        title: data.title,
      });

      router.push(`/paper/${paperId}`);
    } catch {
      toast.error("An error occured. Try again later");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Formal title of the paper.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abstract (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Academic abstract of the article.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invitedUsers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Convidados</FormLabel>
              <FormControl className="pt-3">
                <div>
                  <ul className="mb-4">
                    {field.value.map((email, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          field.onChange(
                            field.value.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        <Badge variant="outline">
                          <span>{email}</span>
                          <XIcon className="size-4 text-foreground/70" />
                        </Badge>
                      </button>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                    <Input
                      placeholder="example@example.com, another@example.com"
                      value={applicationsInputValue}
                      onChange={(e) =>
                        setApplicationsInputValue(e.currentTarget.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Enter" || e.key === ",") &&
                          applicationsInputValue.trim()
                        ) {
                          e.preventDefault();

                          try {
                            field.onChange([
                              ...field.value,
                              publicUserSchema.shape.email.parse(
                                e.currentTarget.value,
                              ),
                            ]);

                            form.clearErrors("invitedUsers");
                            setApplicationsInputValue("");
                          } catch {
                            form.setError("invitedUsers", {
                              type: "manual",
                              message: "Invalid email",
                            });
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Authors and collaborators of the paper. Separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending}>Create paper</Button>
      </form>
    </Form>
  );
}
