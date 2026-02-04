type Props = {
  onSubmit: (values: { userName: string; password: string }) => void;
  isLoading?: boolean;
  error?: string | null;
};

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        onSubmit({
          userName: String(form.get("userName") ?? ""),
          password: String(form.get("password") ?? ""),
        });
      }}
      style={{ display: "grid", gap: "0.75rem", maxWidth: 360 }}
    >
      <input name="userName" placeholder="username" />
      <input name="password" placeholder="password" type="password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Login"}
      </button>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
    </form>
  );
}
