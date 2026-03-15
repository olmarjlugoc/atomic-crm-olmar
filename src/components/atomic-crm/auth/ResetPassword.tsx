import { useState } from "react";
import { supabase } from "../providers/supabase/supabase";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (password.length < 8) {
      setMsg("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== password2) {
      setMsg("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const queryPart =
        window.location.hash.includes("?")
          ? window.location.hash.split("?")[1]
          : window.location.search.slice(1);

      const params = new URLSearchParams(queryPart ?? "");
      const code = params.get("code");

      if (code) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setMsg(exchangeError.message);
          return;
        }
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMsg(error.message);
        return;
      }

      setMsg("Contraseña actualizada. Ya puedes iniciar sesión.");
      await supabase.auth.signOut();
      window.location.href = "/#/login";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-muted/40 bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Crear nueva contraseña
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ingresa una nueva contraseña para tu cuenta.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Mínimo 8 caracteres"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Repetir contraseña</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Repite la contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Guardar contraseña"}
          </button>

          {msg && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {msg}
            </div>
          )}

          <a
            href="/#/login"
            className="block text-center text-sm text-muted-foreground hover:underline"
          >
            Volver al login
          </a>
        </form>
      </div>
    </div>
  );
}