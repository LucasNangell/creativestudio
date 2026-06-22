type AdminPlaceholderProps = {
  title: string;
  description: string;
};

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <div className="glass-card max-w-2xl p-8">
      <h1 className="font-heading text-2xl font-bold text-nangell-text">{title}</h1>
      <p className="mt-2 text-sm text-nangell-muted">{description}</p>
    </div>
  );
}
