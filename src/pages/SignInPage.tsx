import { ArrowLeft } from "lucide-react";
import Silk from "../components/Silk";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function SignUp() {
  return (
    // Page background and centering
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {/* Card wrapper with taller aspect ratio */}
      <div className="w-full max-w-6xl aspect-[3/2] rounded-[55px] bg-white overflow-hidden">
        {/* Split layout */}
        <div className="h-full w-full flex gap-7">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    // Left side with Silk background
    <div className="relative w-1/2 rounded-[55px] overflow-hidden">
      {/* Silk background */}
      <div className="absolute inset-0">
        <Silk
          speed={5}
          scale={1}
          color="#e629ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Logo top-left */}
      <div className="absolute top-10 left-10 text-white text-3xl font-bold z-10">
        SC
      </div>

      {/* Bottom center text */}
      <div className="absolute inset-0 flex items-end justify-center px-10 pb-10 z-10">
        <div className="text-white text-5xl font-medium leading-tight text-center">
          Shape your direction
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (isLogin) {
      // Login logic
      if (!formData.email || !formData.password) {
        setMessage({ type: "error", text: "Please fill in all fields" });
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
        } else if (data.user) {
          setMessage({
            type: "success",
            text: "Logged in successfully! Redirecting...",
          });
          setTimeout(() => navigate("/profile"), 1000);
        }
      } catch (err) {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      } finally {
        setLoading(false);
      }
    } else {
      // Signup logic
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setMessage({ type: "error", text: "Please fill in all fields" });
        return;
      }

      if (!formData.agreeToTerms) {
        setMessage({ type: "error", text: "Please agree to the Terms and Conditions" });
        return;
      }

      if (formData.password.length < 6) {
        setMessage({ type: "error", text: "Password must be at least 6 characters" });
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        if (error) {
          setMessage({ type: "error", text: error.message });
        } else if (data.user) {
          // Profile will be created after email verification in AuthCallback
          setMessage({
            type: "success",
            text: "Check your email for the confirmation link!",
          });
          // Clear form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            agreeToTerms: false,
          });
        }
      } catch (err) {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-1/2 p-10 flex flex-col justify-center">
      {/* Back arrow */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 mb-8"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-black" />
      </button>

      {/* Title + subtitle */}
      <div>
        <h1 className="text-5xl font-medium tracking-tight text-gray-900">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(null);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                agreeToTerms: false,
              });
            }}
            className="text-gray-900 underline underline-offset-4"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Success/Error Message */}
        {message && (
          <div
            className={`rounded-full px-5 py-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Row 1: first + last name (only for signup) */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name">
              <Input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Last Name">
              <Input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Field>
          </div>
        )}

        {/* Row 2: email */}
        <Field label="Email Address">
          <Input
            placeholder="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Field>

        {/* Row 3: password */}
        <Field label="Password">
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-full bg-black text-white
            py-3 text-sm font-medium
            hover:bg-zinc-900 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading 
            ? (isLogin ? "Logging in..." : "Creating Account...") 
            : (isLogin ? "Log in" : "Submit")
          }
        </button>

        {/* Terms (only for signup) */}
        {!isLogin && (
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 accent-black"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-gray-900 underline underline-offset-4">
                Terms and condition
              </a>
            </span>
          </label>
        )}

        {/* Divider with OR */}
        <Divider text="or" />

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="
              w-full rounded-full border border-gray-200
              py-3 text-sm font-medium text-gray-900
              hover:bg-gray-50 transition-colors
              inline-flex items-center justify-center gap-2
            "
          >
            {/* placeholder icon */}
            <span className="text-base">G</span>
            Continue with Google
          </button>

          <button
            type="button"
            className="
              w-full rounded-full border border-gray-200
              py-3 text-sm font-medium text-gray-900
              hover:bg-gray-50 transition-colors
              inline-flex items-center justify-center gap-2
            "
          >
            {/* placeholder icon */}
            <span className="text-base">f</span>
            Continue with facebook
          </button>
        </div>
      </form>
    </div>
  );
}

/** Reusable label + slot wrapper */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-900">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/** Reusable input styling */
function Input({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full rounded-full border border-gray-300
        px-5 py-3 text-sm text-gray-900
        outline-none
        focus:border-black focus:ring-2 focus:ring-black/10
      "
    />
  );
}

/** Divider line with centered text */
function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200" />
      <div className="text-xs text-gray-400">{text}</div>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
