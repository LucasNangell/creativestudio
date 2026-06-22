"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DEFAULTS = {
  hoursPerWeek: 12,
  hourlyCost: 45,
  people: 2,
} as const;

const LIMITS = {
  hoursPerWeek: { min: 1, max: 168 },
  hourlyCost: { min: 1, max: 10_000 },
  people: { min: 1, max: 1_000 },
} as const;

type FieldKey = keyof typeof DEFAULTS;

function validateField(key: FieldKey, value: number): string | null {
  const { min, max } = LIMITS[key];
  if (!Number.isFinite(value) || value < min || value > max) {
    if (key === "hoursPerWeek") {
      return `Informe entre ${min} e ${max} horas por semana.`;
    }
    if (key === "hourlyCost") {
      return `Informe um custo entre R$ ${min} e R$ ${max.toLocaleString("pt-BR")}.`;
    }
    return `Informe entre ${min} e ${max.toLocaleString("pt-BR")} pessoas.`;
  }
  return null;
}

export function OpportunityCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(DEFAULTS.hoursPerWeek);
  const [hourlyCost, setHourlyCost] = useState<number>(DEFAULTS.hourlyCost);
  const [people, setPeople] = useState<number>(DEFAULTS.people);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const hasErrors = Object.values(errors).some(Boolean);

  const savings = useMemo(() => {
    if (hasErrors) return null;
    const weekly = hoursPerWeek * hourlyCost * people;
    const monthly = weekly * 4.33;
    const yearly = monthly * 12;
    return { weekly, monthly, yearly };
  }, [hoursPerWeek, hourlyCost, people, hasErrors]);

  const updateField = (key: FieldKey, raw: string, setter: (v: number) => void) => {
    const value = Number(raw);
    setter(Number.isNaN(value) ? 0 : value);
    const error = validateField(key, Number.isNaN(value) ? 0 : value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[key] = error;
      else delete next[key];
      return next;
    });
  };

  const handleReset = () => {
    setHoursPerWeek(DEFAULTS.hoursPerWeek);
    setHourlyCost(DEFAULTS.hourlyCost);
    setPeople(DEFAULTS.people);
    setErrors({});
  };

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
                  min={LIMITS.hoursPerWeek.min}
                  max={LIMITS.hoursPerWeek.max}
                  placeholder="Ex.: 12"
                  value={hoursPerWeek}
                  onChange={(event) =>
                    updateField("hoursPerWeek", event.target.value, setHoursPerWeek)
                  }
                  aria-invalid={!!errors.hoursPerWeek}
                  aria-describedby={errors.hoursPerWeek ? "hours-error" : undefined}
                />
                {errors.hoursPerWeek ? (
                  <p id="hours-error" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.hoursPerWeek}
                  </p>
                ) : null}
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
                  min={LIMITS.hourlyCost.min}
                  max={LIMITS.hourlyCost.max}
                  placeholder="Ex.: 45"
                  value={hourlyCost}
                  onChange={(event) =>
                    updateField("hourlyCost", event.target.value, setHourlyCost)
                  }
                  aria-invalid={!!errors.hourlyCost}
                  aria-describedby={errors.hourlyCost ? "cost-error" : undefined}
                />
                {errors.hourlyCost ? (
                  <p id="cost-error" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.hourlyCost}
                  </p>
                ) : null}
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
                  min={LIMITS.people.min}
                  max={LIMITS.people.max}
                  placeholder="Ex.: 2"
                  value={people}
                  onChange={(event) =>
                    updateField("people", event.target.value, setPeople)
                  }
                  aria-invalid={!!errors.people}
                  aria-describedby={errors.people ? "people-error" : undefined}
                />
                {errors.people ? (
                  <p id="people-error" className="mt-1.5 text-sm text-red-400" role="alert">
                    {errors.people}
                  </p>
                ) : null}
              </div>

              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                Resetar parâmetros
              </Button>

              <div
                className="rounded-nangell border border-glass-border bg-nangell-gradient-subtle p-5"
                aria-live="polite"
              >
                <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                  Economia estimada
                </p>
                {hasErrors || !savings ? (
                  <p className="mt-4 text-sm text-nangell-muted">
                    Corrija os parâmetros acima para ver a estimativa.
                  </p>
                ) : (
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
                )}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
