"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Não pode ser vazio"),
  abstract: z.string(),
});

export function CreateProjectForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      abstract: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [step, setStep] = useState(0);

  async function submit(data: z.infer<typeof formSchema>) {
    toast(JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        {step === 0 && (
          <div>
            <div className="mb-10 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Como microplásticos " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="abstract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Resumo sobre seu projeto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setStep(1)}
                isLoading={form.formState.isSubmitting}
              >
                <ChevronRightIcon /> PRÓXIMO
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
