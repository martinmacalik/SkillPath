import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // If tokens are in the URL hash, supabase-js will pick them up
    // when detectSessionInUrl is true. Calling getSession ensures
    // the session is loaded and persisted.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error(error);
        navigate("/signin", { replace: true });
        return;
      }

      if (data.session) {
        navigate("/profile", { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-2xl font-medium text-gray-900 mb-4">
          Signing you in…
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
