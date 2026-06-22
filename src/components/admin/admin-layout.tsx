import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { getServerSession } from "@/lib/auth/get-server-session";

type AdminLayoutShellProps = {
  children: React.ReactNode;
};

export async function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-nangell-dark">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            userName={session?.name ?? "Administrador"}
            userEmail={session?.email ?? ""}
          />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
