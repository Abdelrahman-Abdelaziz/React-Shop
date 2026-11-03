import { useState, type SubmitEvent } from "react";
import { useRegisterMutation } from "../services/authApi";
import { useAppDispatch } from "../app/hooks";
import type { RegisterRequest } from "../types/api";
import { setCreds } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function formSubmitHandler(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 4) {
      setValidationError(
        "Please enter a password that is 4 characters or more.",
      );
      return;
    }

    const registerRequest: RegisterRequest = {
      email: formData.email,
      name: formData.name.trim() || undefined,
      password: formData.password,
    };

    try {
      const result = await register(registerRequest).unwrap();

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));

      dispatch(
        setCreds({
          token: result.accessToken,
          user: result.user,
        }),
      );

      navigate("/products", { replace: true });
    } catch {
      //
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please fill in your details to get started
          </p>
        </div>

        <form className="space-y-5" onSubmit={formSubmitHandler}>
          <div className="form-name">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="John Doe"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div className="form-email">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          <div className="form-password">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              minLength={4}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
          </div>

          {validationError && (
            <div className="rounded-lg bg-red-50 p-3 border border-red-200">
              <p
                role="alert"
                className="text-sm font-medium text-red-600 text-center"
              >
                {validationError}
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-3 border border-red-200">
              <p
                role="alert"
                className="text-sm font-medium text-red-600 text-center"
              >
                Registration failed. Please try again.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
