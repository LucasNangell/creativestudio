import { AdmTopbar } from "@/components/adm/adm-topbar";
import { getServerSession } from "@/lib/auth/get-server-session";

type AdmLayoutShellProps = {
  children: React.ReactNode;
};

export async function AdmLayoutShell({ children }: AdmLayoutShellProps) {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-nangell-dark">
      <AdmTopbar
        userName={session?.name ?? "Administrador"}
        userEmail={session?.email ?? ""}
      />
      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}
