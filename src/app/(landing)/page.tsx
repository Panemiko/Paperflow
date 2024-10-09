import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <section className="py-20">
        <MaxWidth className="flex flex-col items-center">
          <h1 className="mb-12 max-w-4xl text-center text-6xl font-bold text-foreground">
            Paperflow, caliente y fresca de la gestion de documentos.
          </h1>
          <p className="mb-16 max-w-prose text-center text-foreground/70">
            Paperflow es una inovative plataforma para la gestion de documentos
            y colaboracion, con un enfoque en la simplicidad y la eficiencia.
          </p>
          <Button asChild size="lg">
            <Link href="/signup"><StarIcon /> Empieza gratis</Link>
          </Button>
        </MaxWidth>
      </section>
    </div>
  );
}
