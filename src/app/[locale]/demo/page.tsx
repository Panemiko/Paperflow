"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  Bold,
  Bot,
  Check,
  ChevronDown,
  Clock,
  Code,
  FileText,
  GitBranch,
  GitCommit,
  History,
  Image,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  PenTool,
  Plus,
  Redo2,
  Search,
  Strikethrough,
  Underline,
  Undo2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const initialCommits = [
  {
    hash: "a9b1e8f",
    author: "Elena Vasquez (Você)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
    date: "Há 10 min",
    time: "11:45 UTC",
    message: "Ajustada a Cláusula de Remuneração e Prazos",
    diff: { added: 12, removed: 4 },
    isAi: false,
  },
  {
    hash: "c4f2d9a",
    author: "Assistente de IA",
    avatar: "",
    date: "Há 2 horas",
    time: "09:30 UTC",
    message: "Sugerida alteração para mitigar riscos na Cláusula 3",
    diff: { added: 8, removed: 2 },
    isAi: true,
  },
  {
    hash: "e7a5b2c",
    author: "Elena Vasquez (Você)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
    date: "Ontem",
    time: "16:20 UTC",
    message: "Revisão ortográfica e formatação do Anexo I",
    diff: { added: 45, removed: 38 },
    isAi: false,
  },
  {
    hash: "b1d8f4e",
    author: "Marcos Silva (Legal)",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
    date: "Há 2 dias",
    time: "14:15 UTC",
    message: "Adicionada cláusula de rescisão (Modelo Padrão)",
    diff: { added: 156, removed: 0 },
    isAi: false,
  },
  {
    hash: "f3c9a1d",
    author: "Elena Vasquez (Você)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
    date: "Há 3 dias",
    time: "10:05 UTC",
    message: "Rascunho inicial do manuscrito",
    diff: { added: 342, removed: 0 },
    isAi: false,
  },
];

const docHeader = `
<div class="text-center mb-12">
  <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">Contrato de Prestação de Serviços</h1>
  <p class="text-base font-normal text-muted-foreground leading-tight">TechSolutions Ltda.</p>
</div>`;

const sec1 = `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">1. Do Objeto e Escopo</h2>
  <p class="mb-3 text-justify leading-relaxed">O presente contrato tem por objeto a prestação de serviços de consultoria tecnológica especializada pela CONTRATADA em favor do CONTRATANTE. Os serviços englobam análise de infraestrutura, planejamento de migração para nuvem e implementação de rotinas de segurança da informação.</p>
  <p class="mb-3 text-justify leading-relaxed">Todos os serviços deverão ser prestados seguindo estritamente as melhores práticas de mercado e as diretrizes estipuladas no Anexo I deste instrumento.</p>
  <p class="mb-3 text-justify leading-relaxed">A CONTRATADA se compromete a designar profissionais capacitados para a execução do objeto, responsabilizando-se integralmente pelos encargos trabalhistas, previdenciários e tributários decorrentes.</p>
</div>`;

const sec2 = `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">2. Das Obrigações da Contratada</h2>
  <p class="mb-3 text-justify leading-relaxed">A CONTRATADA obriga-se a fornecer os serviços estipulados de forma contínua e ininterrupta, garantindo o nível de qualidade pactuado (SLA).</p>
  <p class="mb-3 text-justify leading-relaxed">Qualquer descumprimento injustificado implicará na aplicação de multas rescisórias e penalidades contratuais.</p>
</div>`;

const initialCommitDiffs: Record<string, { left: string; right: string }> = {
  a9b1e8f: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Do Preço e Condições de Pagamento</h2>
  <p class="mb-3 text-justify leading-relaxed">Pelos serviços prestados, o CONTRATANTE pagará à CONTRATADA a quantia estipulada no Anexo II deste contrato, a ser faturada <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">no prazo acordado</span>. Em caso de atraso, incidirá multa <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">estipulada em adendo</span>.</p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Do Preço e Condições de Pagamento</h2>
  <p class="mb-3 text-justify leading-relaxed">Pelos serviços prestados, o CONTRATANTE pagará à CONTRATADA a quantia estipulada no Anexo II deste contrato, a ser faturada <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">até o 5º dia útil do mês subsequente à prestação dos serviços</span>. Em caso de atraso, incidirá multa <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">de 2% (dois por cento) sobre o valor da fatura</span>.</p>
</div>`,
  },
  c4f2d9a: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Das Obrigações do Contratante</h2>
  <p class="mb-3 text-justify leading-relaxed">O CONTRATANTE compromete-se a fornecer à CONTRATADA as informações necessárias para a execução dos serviços contratados.</p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">3. Das Obrigações do Contratante</h2>
  <p class="mb-3 text-justify leading-relaxed">O CONTRATANTE compromete-se a fornecer à CONTRATADA <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">todas as</span> informações<span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">, documentos e acesso aos sistemas</span> necessárias para a execução dos serviços contratados.</p>
  <p class="mb-3 text-justify leading-relaxed"><span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1 py-0.5 leading-normal">Ademais, é responsabilidade do CONTRATANTE garantir que as licenças de software de terceiros necessárias estejam em conformidade antes do início das atividades, mitigando riscos de atraso ou interrupção operacional.</span></p>
</div>`,
  },
  e7a5b2c: {
    left:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">Anexo I</h2>
  <p class="mb-3 text-justify leading-relaxed">A infraestrutura deverá ser migrada para a nuvem <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">segindo</span> as normas ISO 27001. A contratada garantirá <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">q</span> o sistema esteja <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">disponivel</span> em 99,9% do tempo no <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">horario</span> comercial.</p>
  <p class="mb-3 text-justify leading-relaxed">As responsabilidades da Contratada <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">incuem</span>:<br/>- Auditoria <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">basica</span><br/>- Manutenção nos servidores<br/>- Backup <span class="bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300 line-through rounded-sm px-1">diarío e restauracao</span></p>
</div>`,
    right:
      docHeader +
      sec1 +
      sec2 +
      `
<div class="mb-8">
  <h2 class="text-xl md:text-2xl font-bold tracking-tight mb-4 text-foreground text-left">Anexo I</h2>
  <p class="mb-3 text-justify leading-relaxed">A infraestrutura deverá ser migrada para a nuvem <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">seguindo</span> as normas ISO 27001. A contratada garantirá <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">que</span> o sistema esteja <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">disponível</span> em 99,9% do tempo no <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">horário</span> comercial.</p>
  <p class="mb-3 text-justify leading-relaxed">As responsabilidades da Contratada <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">incluem</span>:<br/>- Auditoria <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">básica</span><br/>- Manutenção nos servidores<br/>- Backup <span class="bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300 rounded-sm px-1">diário e restauração</span></p>
</div>`,
  },
};

export default function EditorDemo() {
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [commits, setCommits] = useState(initialCommits);
  const [commitDiffs, setCommitDiffs] =
    useState<Record<string, { left: string; right: string }>>(
      initialCommitDiffs,
    );
  const [selectedCommitHash, setSelectedCommitHash] = useState<string | null>(
    null,
  );

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const lastSavedHtml = useRef<string>("");
  const isSyncingLeftScroll = useRef(false);
  const isSyncingRightScroll = useRef(false);

  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingLeftScroll.current) {
      isSyncingLeftScroll.current = false;
      return;
    }
    if (rightScrollRef.current) {
      isSyncingRightScroll.current = true;
      rightScrollRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleRightScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingRightScroll.current) {
      isSyncingRightScroll.current = false;
      return;
    }
    if (leftScrollRef.current) {
      isSyncingLeftScroll.current = true;
      leftScrollRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleCommit = () => {
    if (!commitMessage.trim()) return;

    // Track baseline from initial render if undefined
    if (!lastSavedHtml.current && editorRef.current) {
      lastSavedHtml.current = editorRef.current.innerHTML;
    }

    const currentHtml = editorRef.current?.innerHTML || "";
    const hashId = Math.random().toString(16).slice(2, 9);

    setCommitDiffs((prev) => ({
      ...prev,
      [hashId]: {
        left: lastSavedHtml.current,
        right: currentHtml,
      },
    }));

    // Update the last saved to match the brand new committed string
    lastSavedHtml.current = currentHtml;

    const newCommit = {
      hash: hashId,
      author: "Elena Vasquez (Você)",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
      date: "Agora mesmo",
      time: new Date().toISOString().substring(11, 16) + " UTC",
      message: commitMessage,
      diff: {
        added: Math.floor(Math.random() * 50) + 1,
        removed: Math.floor(Math.random() * 10),
      },
      isAi: false,
    };
    setCommits([newCommit, ...commits]);
    setShowHistory(true);
    setShowCommitDialog(false);
    setCommitMessage("");
  };

  const currentText = `Contrato de Prestação de Serviços
TechSolutions Ltda.

1. Do Objeto e Escopo
O presente contrato tem por objeto a prestação de serviços de consultoria tecnológica especializada pela CONTRATADA em favor do CONTRATANTE. Os serviços englobam análise de infraestrutura, planejamento de migração para nuvem e implementação de rotinas de segurança da informação.
Todos os serviços deverão ser prestados seguindo estritamente as melhores práticas de mercado e as diretrizes estipuladas no Anexo I deste instrumento.
A CONTRATADA se compromete a designar profissionais capacitados para a execução do objeto, responsabilizando-se integralmente pelos encargos trabalhistas, previdenciários e tributários decorrentes.

2. Das Obrigações da Contratada
A CONTRATADA obriga-se a fornecer os serviços estipulados de forma contínua e ininterrupta, garantindo o nível de qualidade pactuado (SLA).
Qualquer descumprimento injustificado implicará na aplicação de multas rescisórias e penalidades contratuais.`;

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden relative">
      {/* Top Header Area */}
      <div className="bg-card border-b-[0.5px] border-border shrink-0 z-20">
        {/* Document Title & Actions */}
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
                <span className="font-mono text-sm tracking-widest text-primary leading-none">
                  base
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium leading-none">
                  <Check className="w-3.5 h-3.5" /> Salvo
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <Button
              variant={showHistory ? "secondary" : "ghost"}
              size="icon"
              className={
                showHistory
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="w-5 h-5 stroke-[1.5]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <GitBranch className="w-5 h-5 stroke-[1.5]" />
            </Button>
            <Button
              className="font-medium text-sm flex items-center gap-2 rounded-sm relative"
              onClick={() => setShowCommitDialog(!showCommitDialog)}
            >
              <GitBranch className="w-4 h-4" /> Commit
            </Button>

            {showCommitDialog && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowCommitDialog(false)}
                />
                <div className="absolute top-[calc(100%+8px)] right-6 w-[320px] bg-card border-[0.5px] border-border rounded-sm p-4 flex flex-col gap-3 z-50">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-primary" />
                    Salvar Alterações
                  </h3>
                  <Input
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Descreva suas alterações..."
                    className="text-xs h-9 rounded-sm bg-muted/50 border-border"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCommit();
                    }}
                  />
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs px-3 rounded-sm"
                      onClick={() => {
                        setShowCommitDialog(false);
                        setCommitMessage("");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 text-xs px-4 rounded-sm"
                      onClick={handleCommit}
                      disabled={!commitMessage.trim()}
                    >
                      Commit
                    </Button>
                  </div>
                </div>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="h-12 px-4 flex items-center justify-between overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm"
            >
              <Redo2 className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 flex items-center gap-1 px-2 text-foreground rounded-sm font-light text-[13px]"
            >
              <Plus className="w-3.5 h-3.5" /> Parágrafo{" "}
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Underline className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Code className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <AlignLeft className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <List className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <ListOrdered className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <AlignLeft className="w-4 h-4 rotate-180" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>

            <div className="w-px h-4 bg-border mx-2" />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground rounded-sm"
            >
              <Image className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-foreground rounded-sm"
            >
              <PenTool className="w-4 h-4" />{" "}
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground rounded-sm"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 shrink-0 pl-4">
            <div className="flex items-center gap-2">
              <PenTool className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex items-center gap-1">
                Editando{" "}
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 md:py-12 flex justify-center bg-muted/20 relative custom-scrollbar z-0">
        {/* Document Sheet */}
        <div className="w-full max-w-[800px] bg-card border-[0.5px] border-border min-h-[1056px] px-12 md:px-[96px] py-16 md:py-[96px]">
          <div
            ref={editorRef}
            className="relative font-sans text-[15px] md:text-[16px] leading-[1.8] text-foreground/90 whitespace-pre-wrap outline-none"
            contentEditable="true"
            suppressContentEditableWarning
          >
            {currentText.split("\n").map((line, index) => {
              if (index === 0)
                return (
                  <h1
                    key={index}
                    className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight text-center"
                  >
                    {line}
                  </h1>
                );
              if (index === 1 && line.trim() !== "" && !line.match(/^\s*\d\./))
                return (
                  <p
                    key={index}
                    className="text-base font-normal mb-12 text-muted-foreground leading-tight text-center"
                  >
                    {line}
                  </p>
                );
              if (line.match(/^\s*\d\./))
                return (
                  <h2
                    key={index}
                    className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-4 text-foreground text-left"
                  >
                    {line}
                  </h2>
                );
              if (line.trim() === "") return <br key={index} />;

              const isIndent = line.startsWith("  ");
              return (
                <p
                  key={index}
                  className={`mb-3 text-justify leading-relaxed ${isIndent ? "pl-8 text-muted-foreground underline decoration-border underline-offset-4 cursor-pointer hover:text-primary transition-colors text-left" : ""}`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* History Popup Overlay */}
      {showHistory && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowHistory(false)}
          />
          <div
            className={`absolute flex flex-col bg-card border-[0.5px] border-border rounded-sm z-50 overflow-hidden transition-all duration-300 ease-in-out ${
              isHistoryExpanded
                ? "top-32 bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] h-auto"
                : "top-[130px] right-6 w-[450px] max-h-[calc(100vh-150px)]"
            }`}
          >
            <div className="p-4 border-b-[0.5px] border-border bg-background flex flex-col gap-4 shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-primary" />
                  Histórico de Commits
                </h2>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {commits.length} Commits
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                  >
                    {isHistoryExpanded ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar commits..."
                  className="pl-8 w-full h-8 text-xs rounded-sm bg-muted/50 border-border"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-card relative">
              <div className="absolute top-0 bottom-0 left-[35px] w-px bg-border z-0" />

              <div className="py-2 space-y-1 relative z-10">
                <AnimatePresence initial={false}>
                  {commits.map((commit, index) => (
                    <motion.div
                      key={commit.hash}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`group relative px-4 py-3 transition-colors duration-200 ${commitDiffs[commit.hash] ? "hover:bg-muted/50 cursor-pointer" : ""}`}
                      onClick={() => {
                        if (commitDiffs[commit.hash])
                          setSelectedCommitHash(commit.hash);
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar/Icon & Timeline Dot */}
                        <div className="flex items-center shrink-0 w-8 pt-0.5">
                          <div
                            className={`w-7 h-7 rounded-sm border flex items-center justify-center z-10 shrink-0 ${
                              commit.isAi
                                ? "bg-muted text-muted-foreground border-border"
                                : "bg-background border-border overflow-hidden"
                            }`}
                          >
                            {commit.isAi ? (
                              <Bot className="w-4 h-4" />
                            ) : (
                              <img
                                src={commit.avatar}
                                alt={commit.author}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>

                        {/* Commit Info */}
                        <div className="flex-1 min-w-0 bg-transparent">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-[11px] text-muted-foreground bg-muted/50 border-[0.5px] border-border px-1.5 py-0.5 rounded-sm relative font-medium">
                                {commit.hash}
                              </code>
                              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {commit.date}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 font-mono text-[11px]">
                              <span className="text-green-600 bg-green-500/10 px-1 py-0.5 rounded-sm">
                                +{commit.diff.added}
                              </span>
                              {commit.diff.removed > 0 && (
                                <span className="text-red-500 bg-red-500/10 px-1 py-0.5 rounded-sm">
                                  -{commit.diff.removed}
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-foreground font-medium leading-tight mb-2">
                            {commit.message}
                          </p>

                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            {commit.author}{" "}
                            {commit.isAi && (
                              <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">
                                IA
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="p-2 border-t-[0.5px] border-border flex justify-center bg-muted/30 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground flex items-center cursor-pointer hover:text-foreground">
                Carregar commits anteriores{" "}
                <ChevronDown className="w-3 h-3 ml-1" />
              </span>
            </div>
          </div>
        </>
      )}

      {/* Diff Review Screen Overlay */}
      <AnimatePresence>
        {selectedCommitHash && commitDiffs[selectedCommitHash] && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute inset-0 z-50 bg-background flex flex-col"
          >
            <div className="h-14 border-b-[0.5px] border-border flex items-center justify-between px-6 shrink-0 bg-card">
              <div className="flex items-center gap-3">
                <GitCommit className="text-primary w-5 h-5" />
                <span className="font-medium text-sm">Validar Alterações</span>
                <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                  {selectedCommitHash}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCommitHash(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {/* Left Editor - Original */}
              <div
                ref={leftScrollRef}
                onScroll={handleLeftScroll}
                className="w-1/2 border-r-[0.5px] border-border overflow-y-auto bg-muted/10 p-8 md:p-12 relative custom-scrollbar"
              >
                <div className="absolute top-4 left-4 font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 py-1 bg-background border-[0.5px] border-border rounded-sm">
                  Anterior
                </div>
                <div
                  className="max-w-[600px] mx-auto opacity-70 mt-4 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: commitDiffs[selectedCommitHash].left,
                  }}
                />
              </div>
              {/* Right Editor - Modified */}
              <div
                ref={rightScrollRef}
                onScroll={handleRightScroll}
                className="w-1/2 overflow-y-auto bg-background p-8 md:p-12 relative custom-scrollbar"
              >
                <div className="absolute top-4 right-4 font-mono text-[10px] font-medium text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                  Atualizado
                </div>
                <div
                  className="max-w-[600px] mx-auto mt-4 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: commitDiffs[selectedCommitHash].right,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
