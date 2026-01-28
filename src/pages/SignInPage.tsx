import { ArrowLeft } from "lucide-react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export default function SignUp() {
  return (
    // Page background and centering
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {/* Card wrapper with taller aspect ratio */}
      <div className="w-full max-w-6xl aspect-3/2 rounded-[55px] bg-white overflow-hidden">
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
    // Left side with ShaderGradient background
    <div className="relative w-1/2 rounded-[55px] overflow-hidden">
      {/* ShaderGradient background */}
      <div className="absolute inset-0">
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <ShaderGradient
            animate="on"
            brightness={1.1}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff8682"
            color2="#db8edb"
            color3="#8c8de1"
            envPreset="city"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="plane"
            uAmplitude={1}
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.2}
            uStrength={4}
            uTime={0}
            wireframe={false}
            zoomOut={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Logo top-left */}
      <div className="absolute top-10 left-10 text-white text-3xl font-bold z-10">
        SC
      </div>

      {/* Bottom center text */}
      <div className="absolute inset-0 flex items-end justify-center px-15 pb-10 z-10">
        <div className="text-white text-4xl font-bold leading-tight text-center">
          SHAPE YOUR DIRECTION
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
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResendEmail = async () => {
    if (!resendEmail) return;
    
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: resendEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Verification email resent! Check your inbox.",
        });
        setShowResendButton(false);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to resend email" });
    } finally {
      setLoading(false);
    }
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

        // Log the response for debugging
        console.log("SignUp response:", { data, error });

        if (error) {
          // Check if it's a "user already exists" scenario
          if (error.message.toLowerCase().includes("already") || 
              error.message.toLowerCase().includes("exist")) {
            setMessage({ 
              type: "error", 
              text: "Account already exists — check your inbox for the verification email, or click below to resend it." 
            });
            setShowResendButton(true);
            setResendEmail(formData.email);
          } else {
            setMessage({ type: "error", text: error.message });
          }
        } else if (data.user) {
          // Check if user is already confirmed (shouldn't happen on first signup)
          if (data.user.confirmed_at) {
            setMessage({
              type: "success",
              text: "Account already verified! You can log in.",
            });
          } else {
            // Normal first-time signup
            setMessage({
              type: "success",
              text: "Check your email for the confirmation link!",
            });
          }
          
          // Clear form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            agreeToTerms: false,
          });
        } else {
          // User object is null - might be obfuscated response for existing user
          setMessage({ 
            type: "error", 
            text: "Account may already exist. Check your email or try resending the verification." 
          });
          setShowResendButton(true);
          setResendEmail(formData.email);
        }
      } catch (err) {
        console.error("Signup error:", err);
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
        className="w-10 h-10 inline-flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0 mb-8"
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
            className="text-gray-900 underline underline-offset-4 cursor-pointer"
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

        {/* Resend Email Button */}
        {showResendButton && !isLogin && (
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={loading}
            className="
              w-full rounded-full bg-blue-600 text-white
              py-3 text-sm font-medium
              hover:bg-blue-700 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {loading ? "Resending..." : "Resend Verification Email"}
          </button>
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
            cursor-pointer
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
              className="h-4 w-4 rounded border-gray-300 accent-black cursor-pointer"
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
              cursor-pointer
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
              cursor-pointer
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
