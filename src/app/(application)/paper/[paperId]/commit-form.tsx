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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export function CommitForm() {
  const form = useForm({
    defaultValues: {
      message: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex py-10T flex-col gap-6">
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
          <Button type="submit">Commit</Button>
        </div>
      </form>
    </Form>
  );
}
