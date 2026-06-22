"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function OpportunityCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [people, setPeople] = useState(2);

  const savings = useMemo(() => {
    const weekly = hoursPerWeek * hourlyCost * people;
    const monthly = weekly * 4.33;
    const yearly = monthly * 12;
    return { weekly, monthly, yearly };
  }, [hoursPerWeek, hourlyCost, people]);

  return (
    <Section id="calculadora">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-nangell-text sm:text-3xl">
              Mini calculadora de oportunidade
            </h2>
            <p className="mt-3 text-base text-nangell-muted">
              Estime quanto sua operação pode economizar automatizando tarefas
              repetitivas — números conservadores para iniciar a conversa.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card variant="elevated" padding="lg" className="mx-auto mt-10 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Parâmetros da operação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label
                  htmlFor="hours-per-week"
                  className="mb-2 block text-sm font-medium text-nangell-text"
                >
                  Horas manuais por pessoa/semana
                </label>
                <Input
                  id="hours-per-week"
                  type="number"
                  min={1}
                  max={80}
                  value={hoursPerWeek}
                  onChange={(event) =>
                    setHoursPerWeek(Number(event.target.value) || 0)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="hourly-cost"
                  className="mb-2 block text-sm font-medium text-nangell-text"
                >
                  Custo hora (R$)
                </label>
                <Input
                  id="hourly-cost"
                  type="number"
                  min={10}
                  max={500}
                  value={hourlyCost}
                  onChange={(event) =>
                    setHourlyCost(Number(event.target.value) || 0)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="people-count"
                  className="mb-2 block text-sm font-medium text-nangell-text"
                >
                  Pessoas envolvidas
                </label>
                <Input
                  id="people-count"
                  type="number"
                  min={1}
                  max={50}
                  value={people}
                  onChange={(event) =>
                    setPeople(Number(event.target.value) || 1)
                  }
                />
              </div>

              <div
                className="rounded-nangell border border-glass-border bg-nangell-gradient-subtle p-5"
                aria-live="polite"
              >
                <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                  Economia estimada
                </p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs text-nangell-muted">Mensal</dt>
                    <dd className="font-heading text-xl font-bold text-nangell-text">
                      {savings.monthly.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-nangell-muted">Anual</dt>
                    <dd className="font-heading text-xl font-bold text-nangell-cyan">
                      {savings.yearly.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-nangell-muted">Semanal</dt>
                    <dd className="font-heading text-xl font-bold text-nangell-text">
                      {savings.weekly.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
