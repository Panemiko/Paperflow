"use client";

import { Button } from "@/components/ui/button";
import { PaperflowCard } from "@/components/ui/card";
import {
  AlertCircle,
  Check,
  FileText,
  Info,
  Lightbulb,
  Link,
  ScanEye,
  Zap,
} from "lucide-react";

export default function InsightsDemo() {
  const suggestions = [
    {
      id: 1,
      type: "warning",
      title: "Cláusula de Rescisão Ausente",
      description:
        "O contrato estipula prazos e multas, mas não define condições claras para rescisão unilateral. Recomenda-se adicionar uma cláusula padrão estipulando aviso prévio de 30 dias.",
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      color: "border-red-500/50 bg-red-500/10",
      action: "Gerar Cláusula",
    },
    {
      id: 2,
      type: "insight",
      title: "Condições de Pagamento Ambíguas",
      description:
        "A Cláusula Quarta não especifica os dias úteis para aprovação do faturamento (apenas 'prazo acordado'). Sugestão: Alterar para 'até o 5º dia útil do mês subsequente'.",
      icon: <Lightbulb className="w-4 h-4 text-primary" />,
      color: "border-primary/30 bg-primary/5",
      action: "Revisar Sugestão",
    },
    {
      id: 3,
      type: "success",
      title: "Proteção de Propriedade Intelectual",
      description:
        "Documento contém Cláusula de Confidencialidade bem estruturada e blindada segundo a Lei Geral de Proteção de Dados (LGPD). Cobre os principais casos de uso.",
      icon: <Check className="w-4 h-4 text-foreground/70" />,
      color: "border-border bg-muted/50",
      action: "Ver Detalhes",
    },
  ];

  const extractedEntities = [
    { label: "Tipo de Contrato", value: "Prestação de Serviços" },
    { label: "Legislação Aplicável", value: "Brasil (Federal)" },
    { label: "Valor", value: "Requer Verificação" },
    { label: "Duração", value: "Indeterminado" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden relative">
      {/* Top Header Area */}
      <div className="bg-card border-b-[0.5px] border-border shrink-0 z-20">
        <div className="h-[72px] px-6 py-2 flex items-center justify-between border-b-[0.5px] border-border">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <FileText className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground leading-tight">
                Contrato de Prestação de Serviços
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-foreground/70 leading-none">
                  Última atualização há 4 horas
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-sm text-xs font-medium"
            >
              <ScanEye className="w-4 h-4 text-muted-foreground mr-1" />{" "}
              Re-escanear Doc
            </Button>
            <Button
              size="sm"
              className="h-8 rounded-sm text-xs font-medium flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" /> Resolver Tudo
              <span className="bg-primary-foreground/20 px-1.5 rounded-sm text-[10px] font-mono">
                2
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-muted/20 relative z-0">
        {/* Left Sidebar: Extracted Metadata */}
        <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px] border-border bg-card overflow-y-auto custom-scrollbar p-6 lg:p-8 flex flex-col z-10">
          <div className="flex-1">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Sobre
            </h3>

            <div className="space-y-4">
              {extractedEntities.map((entity, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b-[0.5px] border-border/50 last:border-0"
                >
                  <span className="text-xs font-light text-muted-foreground/80">
                    {entity.label}
                  </span>
                  <span className="text-xs font-light bg-muted/30 px-2 py-1 rounded-sm border-[0.5px] border-border/50 text-muted-foreground">
                    {entity.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Referências Vinculadas
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-sm border-[0.5px] border-border bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="p-2 bg-background border-[0.5px] border-border rounded-sm">
                  <Link className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    Anexo_I_Especificacoes.pdf
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Referência Local
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-sm bg-muted/30 border-[0.5px] border-border flex items-start gap-3">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                O índice de confiança das instâncias extraídas é de 98.2%. Para
                editar uma entidade, clique no valor da propriedade.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Suggestions */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 flex justify-center custom-scrollbar">
          <div className="w-full max-w-[800px] flex flex-col">
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 pl-2">
              Dicas
            </h3>

            <div className="space-y-4 pb-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className="bg-card border-[0.5px] border-border rounded-sm p-5 hover:border-border/80 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-sm border ${suggestion.color} shrink-0`}
                    >
                      {suggestion.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-balance">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs px-3 rounded-sm"
                        >
                          {suggestion.action}
                        </Button>
                        {suggestion.type !== "success" && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-8 text-xs px-3 text-muted-foreground hover:text-foreground decoration-border hover:no-underline focus-visible:ring-0 rounded-sm"
                          >
                            Ignorar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <PaperflowCard
                  title="Analisar outro documento"
                  description="Arraste um novo arquivo aqui para extrair insights instantaneamente e comparar com este contrato."
                  icon={
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                  }
                  className="bg-muted/30 border-dashed border-[0.5px] hover:bg-muted/50 transition-colors cursor-pointer rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
