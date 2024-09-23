import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitGraphIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default async function Page() {
  const changes = 10;
  const papers = [
    {
      id: "1",
      title: "Project 1",
      changes: 5,
    },
  ];

  return (
    <div className="flex justify-between gap-10 py-20">
      <div>
        <div className="flex flex-col gap-3">
          <span className="text-4xl font-bold">
            {moment().format("dddd, MMMM Do")}
          </span>
          <span className="text-xl text-foreground/70">
            {changes} changes since yesterday
          </span>
        </div>
        <div className="grid grid-cols-3 pt-10">
          {papers.map((paper, index) => (
            <Link key={index} href={`/paper/${paper.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{paper.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-lg">Last commits</CardTitle>
          <GitGraphIcon className="size-4 text-foreground/70" />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
