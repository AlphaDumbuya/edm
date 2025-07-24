"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const passwordRequirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "One special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

function ResetPasswordPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Check all requirements
    for (const req of passwordRequirements) {
      if (!req.test(password)) {
        setError("Password does not meet all requirements.");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Your password has been reset. You can now log in.");
        setTimeout(() => router.push("/auth/login"), 3000);
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded px-3 py-2 pr-10"
            placeholder="Enter your new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full border rounded px-3 py-2 pr-10"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            tabIndex={-1}
            onClick={() => setShowConfirm(v => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {/* Real-time match feedback */}
        {confirmPassword && (
          <p className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-destructive'}`}>{passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}</p>
        )}
        {/* Password strength meter: only show when password is not empty */}
        {password && (
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${
                strength <= 2 ? "bg-red-500 w-1/4" : strength === 3 ? "bg-yellow-500 w-2/4" : strength === 4 ? "bg-blue-500 w-3/4" : "bg-green-500 w-full"
              }`}
            />
          </div>
        )}
        {/* Password requirements list: only show when password is not empty */}
        {password && (
          <ul className="text-xs text-gray-600 space-y-1">
            {passwordRequirements.map(req => (
              <li key={req.label} className={req.test(password) ? "text-green-600" : "text-gray-600"}>
                {req.test(password) ? "✓" : "✗"} {req.label}
              </li>
            ))}
          </ul>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
        {error && <div className="text-red-600 text-center text-sm">{error}</div>}
        {success && <div className="text-green-600 text-center text-sm">{success}</div>}
      </form>
    </div>
  );
}

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageInner />
    </Suspense>
  );
}
