"use client";

import { cn } from "@/lib/utils";

type DataTableProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-nangell-xl border border-glass-border", className)}>
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}

export function DataTableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-glass-border bg-nangell-surface/80">{children}</thead>
  );
}

export function DataTableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function DataTableRow({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <tr
      className={cn(
        "border-b border-glass-border/50",
        onClick && "cursor-pointer hover:bg-white/5",
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function DataTableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-3 align-top", className)}>{children}</td>;
}

export function DataTableHeaderCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3 font-medium text-nangell-muted", className)}>{children}</th>
  );
}

export function DataTableEmpty({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-nangell-muted">
        {message}
      </td>
    </tr>
  );
}
