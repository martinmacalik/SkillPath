import { ArrowLeft } from "lucide-react";
import Silk from "../components/Silk";

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
  return (
    <div className="w-1/2 p-10 flex flex-col justify-center">
      {/* Back arrow */}
      <button
        type="button"
        className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 mb-8"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-black" />
      </button>

      {/* Title + subtitle */}
      <div>
        <h1 className="text-5xl font-medium tracking-tight text-gray-900">
          Create an Account
        </h1>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-gray-900 underline underline-offset-4">
            Log in
          </a>
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-5">
        {/* Row 1: first + last name */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name">
            <Input placeholder="First Name" />
          </Field>

          <Field label="Last Name">
            <Input placeholder="Last Name" />
          </Field>
        </div>

        {/* Row 2: email */}
        <Field label="Email Address">
          <Input placeholder="Email Address" type="email" />
        </Field>

        {/* Row 3: password */}
        <Field label="Password">
          <Input placeholder="Password" type="password" />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full rounded-full bg-black text-white
            py-3 text-sm font-medium
            hover:bg-zinc-900 transition-colors
          "
        >
          Submit
        </button>

        {/* Terms */}
        <label className="flex items-center gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-black"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-gray-900 underline underline-offset-4">
              Terms and condition
            </a>
          </span>
        </label>

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
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
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
