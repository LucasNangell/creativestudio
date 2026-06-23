"use client";

import { useState } from "react";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Play,
  XCircle,
} from "lucide-react";

import {
  DemoShell,
  trackDemoFinish,
  trackDemoInteraction,
} from "@/components/demos/demo-shell";
import { DemoSidebar } from "@/components/demos/demo-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EDU_COURSE,
  EDU_MINDMAP_NODES,
  EDU_QUIZ,
  type EduModule,
} from "@/data/demos/edu-mock";
import { cn } from "@/lib/utils";

const DEMO_ID = "plataforma-educacional";

export function EduDemo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modules, setModules] = useState<EduModule[]>(EDU_COURSE.modules);
  const [activeModule, setActiveModule] = useState<string>("m3");
  const [playing, setPlaying] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "wrong" | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [mindmapVisible, setMindmapVisible] = useState(false);
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const totalProgress = Math.round(
    modules.reduce((sum, m) => sum + m.progress, 0) / modules.length,
  );

  const handleLogin = () => {
    setLoggedIn(true);
    trackDemoInteraction(DEMO_ID, "demo_login");
  };

  const handlePlay = () => {
    setPlaying(true);
    trackDemoInteraction(DEMO_ID, "play_video");
    setTimeout(() => {
      setModules((prev) =>
        prev.map((m) =>
          m.id === activeModule
            ? { ...m, progress: Math.min(100, m.progress + 15) }
            : m,
        ),
      );
      setPlaying(false);
      trackDemoFinish(DEMO_ID, "module_progress", activeModule);
    }, 2000);
  };

  const handleQuizAnswer = (optionId: string, correct: boolean) => {
    setSelectedOption(optionId);
    setQuizFeedback(correct ? "correct" : "wrong");
    if (correct) setQuizScore((s) => s + 1);
    trackDemoInteraction(DEMO_ID, "quiz_answer", { correct });
  };

  const handleNextQuestion = () => {
    if (quizIndex < EDU_QUIZ.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelectedOption(null);
      setQuizFeedback(null);
    } else {
      trackDemoFinish(DEMO_ID, "quiz_complete", `score_${quizScore}`);
      if (quizScore >= 2) setCertificateVisible(true);
    }
  };

  const handleGenerateMindmap = () => {
    setMindmapVisible(true);
    trackDemoFinish(DEMO_ID, "mindmap_generated");
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", active: activeNav === "dashboard", onClick: () => setActiveNav("dashboard") },
    { id: "modulos", label: "Módulos", active: activeNav === "modulos", onClick: () => setActiveNav("modulos") },
    { id: "quiz", label: "Quiz", active: activeNav === "quiz", onClick: () => setActiveNav("quiz") },
  ];

  if (!loggedIn) {
    return (
      <DemoShell
        demoId={DEMO_ID}
        title="Plataforma Educacional"
        subtitle="Ambiente LMS simulado, entre como aluno simulado para explorar módulos, quiz e certificado."
        ctaLabel="Criar minha plataforma educacional"
      >
        <div className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-nangell-cyan" aria-hidden />
          <h2 className="font-heading text-xl font-semibold text-nangell-text">
            Bem-vindo ao curso simulado
          </h2>
          <p className="mt-2 max-w-md text-sm text-nangell-muted">
            {EDU_COURSE.title}, instrutora {EDU_COURSE.instructor}. Todos os dados são fictícios.
          </p>
          <Button className="mt-6" size="lg" onClick={handleLogin}>
            Entrar como aluno simulado
          </Button>
        </div>
      </DemoShell>
    );
  }

  const currentQuestion = EDU_QUIZ[quizIndex]!;

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Plataforma Educacional"
      subtitle={`Aluno simulado, ${EDU_COURSE.title}`}
      ctaLabel="Criar minha plataforma educacional"
      sidebar={<DemoSidebar title="Simulação LMS" items={sidebarItems} />}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6 rounded-nangell border border-glass-border bg-nangell-dark/40 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-nangell-muted">Progresso geral do curso</p>
              <p className="font-heading text-2xl font-bold text-nangell-cyan">{totalProgress}%</p>
            </div>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-nangell-surface">
              <div
                className="h-full rounded-full bg-nangell-gradient transition-all duration-700"
                style={{ width: `${totalProgress}%` }}
                role="progressbar"
                aria-valuenow={totalProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="mb-3 text-sm font-medium text-nangell-text">Módulos</h3>
            <ul className="space-y-2">
              {modules.map((mod) => (
                <li key={mod.id}>
                  <button
                    type="button"
                    disabled={mod.locked}
                    onClick={() => {
                      setActiveModule(mod.id);
                      trackDemoInteraction(DEMO_ID, "select_module", { module: mod.id });
                    }}
                    className={cn(
                      "w-full rounded-nangell border px-3 py-2 text-left text-sm transition-colors",
                      activeModule === mod.id
                        ? "border-nangell-cyan/40 bg-nangell-gradient-subtle"
                        : "border-glass-border hover:bg-white/5",
                      mod.locked && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <p className="font-medium">{mod.title}</p>
                    <p className="text-xs text-nangell-muted">{mod.duration}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-nangell-surface">
                      <div
                        className="h-full bg-nangell-cyan transition-all duration-500"
                        style={{ width: `${mod.progress}%` }}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium">Materiais</h3>
              <ul className="space-y-1 text-xs text-nangell-muted">
                {EDU_COURSE.materials.map((mat) => (
                  <li key={mat} className="rounded-nangell border border-glass-border px-2 py-1.5">
                    {mat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Player de vídeo (simulado)</CardTitle>
                <CardDescription>Módulo ativo, reprodução fictícia com progresso animado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative flex aspect-video items-center justify-center rounded-nangell bg-nangell-dark/80">
                  {playing ? (
                    <p className="animate-pulse text-sm text-nangell-cyan">Reproduzindo...</p>
                  ) : (
                    <Button size="lg" onClick={handlePlay}>
                      <Play className="h-5 w-5" aria-hidden />
                      Assistir aula simulada
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz interativo</CardTitle>
                <CardDescription>
                  Pergunta {quizIndex + 1} de {EDU_QUIZ.length}, pontuação: {quizScore}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm font-medium">{currentQuestion.question}</p>
                <div className="space-y-2">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!quizFeedback}
                      onClick={() => handleQuizAnswer(opt.id, opt.correct)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-nangell border px-4 py-3 text-left text-sm transition-colors",
                        selectedOption === opt.id && quizFeedback === "correct" && "border-emerald-500/50 bg-emerald-500/10",
                        selectedOption === opt.id && quizFeedback === "wrong" && "border-red-500/50 bg-red-500/10",
                        !quizFeedback && "border-glass-border hover:border-nangell-cyan/30",
                      )}
                    >
                      {selectedOption === opt.id && quizFeedback === "correct" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : selectedOption === opt.id && quizFeedback === "wrong" ? (
                        <XCircle className="h-4 w-4 text-red-400" />
                      ) : null}
                      {opt.text}
                    </button>
                  ))}
                </div>
                {quizFeedback ? (
                  <div className="mt-4">
                    <p className={cn("text-sm", quizFeedback === "correct" ? "text-emerald-400" : "text-red-400")}>
                      {quizFeedback === "correct" ? "Resposta correta!" : "Resposta incorreta, tente revisar o módulo."}
                    </p>
                    <Button className="mt-2" size="sm" onClick={handleNextQuestion}>
                      {quizIndex < EDU_QUIZ.length - 1 ? "Próxima pergunta" : "Finalizar quiz"}
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={handleGenerateMindmap}>
                <Brain className="h-4 w-4" aria-hidden />
                Gerar mapa mental (simulado)
              </Button>
            </div>

            {mindmapVisible ? (
              <div className="rounded-nangell border border-nangell-violet/30 bg-nangell-violet/5 p-4">
                <p className="mb-3 text-sm font-medium text-nangell-text">Mapa mental gerado</p>
                <div className="flex flex-wrap gap-2">
                  {EDU_MINDMAP_NODES.map((node) => (
                    <Badge key={node} variant="outline">
                      {node}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {certificateVisible ? (
              <div className="rounded-nangell-xl border-2 border-nangell-cyan/40 bg-nangell-gradient-subtle p-6 text-center">
                <Award className="mx-auto h-12 w-12 text-nangell-cyan" aria-hidden />
                <p className="mt-3 font-heading text-lg font-bold">Certificado fictício</p>
                <p className="mt-1 text-sm text-nangell-muted">
                  Aluno simulado, {EDU_COURSE.title}
                </p>
                <p className="mt-2 font-mono text-[10px] text-nangell-muted">
                  ID: NANGELL-EDU-DEMO-2026, Ambiente demonstrativo
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
