"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { branchSchema } from "@/lib/schema";
import { tryCatch } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitBranchPlusIcon, GitForkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const formSchema = branchSchema.pick({ name: true });

export function NewBranchDialog({
  originBranchId,
  iconButton,
}: {
  originBranchId: string;
  iconButton?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: forkBranch } = api.branch.fork.useMutation();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const [response, error] = await tryCatch(
      forkBranch({
        data: {
          name: data.name,
        },
        forkedFromBranchId: originBranchId,
      }),
    );

    if (error || !response) {
      toast.error("Erro ao criar branch", {
        description: "Tente novamente mais tarde.",
      });
      return;
    }

    const nextUrl = `/${response.createdBranch.paper.slug}/${response.createdBranch.name}`;

    router.push(nextUrl);
    router.refresh();
  }

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            {iconButton ? (
              <TooltipTrigger asChild>
                <Button size="smIcon" variant="ghost">
                  <GitForkIcon />
                </Button>
              </TooltipTrigger>
            ) : (
              <Button size="sm">
                <GitForkIcon />
                Fazer fork
              </Button>
            )}
          </DialogTrigger>
          <TooltipContent>Fazer fork</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar branch</DialogTitle>
          <DialogDescription>
            Antes de prosseguir, defina um nome para sua branch.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-md space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="adicionar_objetivos" {...field} />
                    </FormControl>
                    <FormDescription>
                      É uma boa prática usar um nome que descreva o objetivo da
                      branch. (utilize somente letras, números, hífens e
                      underscores)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={form.formState.isSubmitting}
                className="mt-4 w-full"
                size="lg"
                type="submit"
              >
                <GitBranchPlusIcon className="mr-2" /> Criar Branch
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
