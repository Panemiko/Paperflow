import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/server";
import { GitGraphIcon, PlusCircleIcon, UsersIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default async function Page() {
  const changes = await api.commit.commitsSinceLastWeek();
  const papers = await api.paper.byCurrentUser();
  const lastCommits = await api.commit.lastCommits();

  return (
    <div className="flex justify-between gap-10 py-20">
      <div>
        <div className="flex flex-col gap-3">
          <span className="text-4xl font-bold">
            {moment().format("dddd, MMMM Do")}
          </span>
          <span className="text-xl text-foreground/70">
            {changes} changes since last week
          </span>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10">
          {papers.map((paper, index) => (
            <Link key={index} href={`/paper/${paper.id}`}>
              <Card className="h-40 transition-colors hover:bg-background/70">
                <CardHeader className="flex h-full justify-between">
                  <CardTitle className="line-clamp-2 text-lg">
                    {paper.title}
                  </CardTitle>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-4 text-sm text-foreground/70">
                      <span>
                        {paper.lastCommit
                          ? `Last commited ${moment(paper.lastCommit.createdAt).fromNow()}`
                          : "Never commited"}
                      </span>
                      <div className="mb-3 flex gap-4">
                        <div className="flex gap-1 text-sm text-foreground/70">
                          <GitGraphIcon className="size-5" />{" "}
                          {paper.commitLength}
                        </div>
                        <div className="flex gap-1 text-sm text-foreground/70">
                          <UsersIcon className="size-5" />{" "}
                          {paper.collaboratorsLength}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-40 items-center justify-center rounded-lg border-2 border-dotted border-foreground opacity-10 transition-opacity hover:opacity-50"
                  href={`/paper/new`}
                >
                  <PlusCircleIcon className="size-20 text-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Create or access a new paper</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Card className="min-h-[550px] w-full max-w-sm">
        <CardHeader className="flex flex-row justify-between pb-0 pt-8">
          <CardTitle className="text-lg">Last commits</CardTitle>
          <GitGraphIcon className="size-4 text-foreground/70" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {lastCommits.map((commit, index) => (
            <Link
              className="block rounded-lg border border-border px-5 py-4 transition-colors hover:bg-accent"
              href={`/commit/${commit.id}`}
              key={index}
            >
              <div className="flex flex-col">
                <span className="mb-0.5 text-xs text-foreground/70">
                  {moment(commit.createdAt).fromNow()} by{" "}
                  {`${commit.user.firstName} ${commit.user.lastName}`}
                </span>
                <span className="mb-2 font-medium">{commit.message}</span>
                <span className="truncate text-xs text-foreground/70">
                  {papers.find((paper) => paper.id === commit.paperId)?.title}
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
