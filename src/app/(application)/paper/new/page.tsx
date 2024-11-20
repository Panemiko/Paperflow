import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import { NewPaperForm } from "./form";

export const metadata: Metadata = {
  title: "New paper",
};

export default async function Page() {
  return (
    <div className="flex justify-center py-20">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>New paper</CardTitle>
          <CardDescription>
            Create a new paper to start collaborating with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPaperForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
