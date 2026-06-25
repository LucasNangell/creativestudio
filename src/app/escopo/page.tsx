"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Lock,
  LogOut,
  Send,
  Download,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function EscopoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Lógica do gerador
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");

  // Recupera sessão ativa do sessionStorage no client-side
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("escopo_auth");
    const savedUser = sessionStorage.getItem("escopo_user");
    if (savedAuth === "true" && savedUser) {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUsername(savedUser);
      }, 0);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim();

    const isValidUser = cleanUser === "Lucas Abreu" || cleanUser === "Nangell";
    const isValidPassword = password === "Admin@Creative2026";

    if (isValidUser && isValidPassword) {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("escopo_auth", "true");
      sessionStorage.setItem("escopo_user", cleanUser);
    } else {
      setLoginError("Usuário ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setResult("");
    setUserInput("");
    sessionStorage.removeItem("escopo_auth");
    sessionStorage.removeItem("escopo_user");
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setGenerationError("");
    setResult("");

    try {
      const response = await fetch("/api/escopo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erro desconhecido ao gerar escopo.");
      }

      setResult(data.result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro de conexão com o servidor.";
      setGenerationError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const printContent = document.getElementById(
      "escopo-markdown-content",
    )?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open(
      "about:blank",
      "_blank",
      "width=800,height=600",
    );
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Escopo Técnico - Nangell Creative Studio</title>
            <style>
              body {
                font-family: 'Inter', system-ui, sans-serif;
                line-height: 1.6;
                color: #1e293b;
                padding: 40px;
                max-width: 850px;
                margin: 0 auto;
              }
              h1, h2, h3, h4, h5, h6 {
                color: #0f172a;
                margin-top: 1.6em;
                margin-bottom: 0.6em;
                font-weight: 700;
                page-break-after: avoid;
              }
              h1 {
                font-size: 24pt;
                border-bottom: 2px solid #3b82f6;
                padding-bottom: 10px;
              }
              h2 {
                font-size: 18pt;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 6px;
              }
              h3 {
                font-size: 14pt;
              }
              p {
                margin-bottom: 1.2em;
              }
              ul, ol {
                margin-bottom: 1.2em;
                padding-left: 24px;
              }
              li {
                margin-bottom: 0.6em;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1.8em;
                page-break-inside: avoid;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 10px 14px;
                text-align: left;
                font-size: 10pt;
              }
              th {
                background-color: #f8fafc;
                font-weight: bold;
              }
              blockquote {
                border-left: 4px solid #3b82f6;
                padding-left: 16px;
                margin-left: 0;
                color: #475569;
                font-style: italic;
              }
              hr {
                border: 0;
                border-top: 1px solid #e2e8f0;
                margin: 2em 0;
              }
              @media print {
                body {
                  padding: 20px;
                }
              }
            </style>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#090b11] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background radial effects */}
      <div className="pointer-events-none absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[60%] w-[60%] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
                  <Lock className="h-6 w-6" />
                </div>
                <h1 className="font-sora text-2xl font-bold text-white">
                  Área Restrita
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                  Gerador de Escopo de Sistemas (Lucas Abreu / Nangell)
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Usuário
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Seu nome de usuário"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                  />
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-500/30"
                >
                  Acessar Painel
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 font-bold text-blue-400">
                    {username.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{username}</h3>
                    <p className="text-xs text-gray-400">
                      Arquiteto de Software
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>

              {/* Form Input */}
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
                <div>
                  <h2 className="font-sora flex items-center gap-2 text-xl font-bold text-white">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Gerador de Escopo de Sistemas
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Cole as notas brutas da reunião para que o Gemini estrutura
                    e expanda os requisitos e propostas comerciais
                    automaticamente.
                  </p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <textarea
                    rows={8}
                    required
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Descreva aqui o que o cliente quer resolver. Exemplo: 'Um sistema de delivery local para pizzarias que tenha cadastro de sabores, controle de motoqueiros e integração com WhatsApp...'"
                    className="w-full resize-y rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-600 hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-500/40 disabled:shadow-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Gerando Escopo no Gemini...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Gerar Escopo Técnico
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Error messages */}
              {generationError && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <div>
                    <h5 className="font-semibold">Falha na geração</h5>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {generationError}
                    </p>
                  </div>
                </div>
              )}

              {/* Results Container */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Escopo Gerado com Sucesso!</span>
                    </div>

                    <button
                      onClick={handleDownloadPDF}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700"
                    >
                      <Download className="h-4 w-4" />
                      Baixar PDF
                    </button>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Rendered content */}
                    <div
                      id="escopo-markdown-content"
                      className="prose prose-invert prose-headings:text-white prose-headings:font-sora prose-headings:font-bold prose-h1:text-2xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-3 prose-h1:mt-8 prose-h2:text-xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h2:mt-6 prose-h3:text-lg prose-a:text-blue-400 hover:prose-a:underline prose-strong:text-white prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-white prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2.5 prose-td:text-left prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-blockquote:italic max-w-none space-y-4 text-sm leading-relaxed text-gray-300"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
