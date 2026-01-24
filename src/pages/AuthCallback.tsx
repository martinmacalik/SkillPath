import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session after email verification
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setMessage("Error verifying email. Please try again.");
          setTimeout(() => navigate("/signin"), 3000);
          return;
        }

        if (data.session) {
          // Check if profile already exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", data.session.user.id)
            .single();

          // Create profile if it doesn't exist
          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: data.session.user.id,
                first_name: data.session.user.user_metadata.first_name,
                last_name: data.session.user.user_metadata.last_name,
                username: data.session.user.email?.split("@")[0] || "user",
              });

            if (profileError) {
              console.error("Error creating profile:", profileError);
              setMessage("Profile creation failed. Please contact support.");
              setTimeout(() => navigate("/signin"), 3000);
              return;
            }
          }

          setMessage("Email verified! Redirecting...");
          setTimeout(() => navigate("/profile"), 1000);
        } else {
          setMessage("No active session found. Redirecting...");
          setTimeout(() => navigate("/signin"), 2000);
        }
      } catch (err) {
        setMessage("An unexpected error occurred.");
        setTimeout(() => navigate("/signin"), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-2xl font-medium text-gray-900 mb-4">
          {message}
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
