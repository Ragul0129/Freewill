import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

function ProtectedRoute({ children, allowedRoles }: Props) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      setLoading(true);

      // ==========================================
      // STEP 1: CHECK SUPABASE LOGIN SESSION
      // ==========================================
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth check error:", authError);
      }

      if (!user) {
        setAllowed(false);
        return;
      }

      // ==========================================
      // STEP 2: GET USER ROLE
      // ==========================================
      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

      // ==========================================
      // IMPORTANT:
      // If profile SELECT has an RLS issue,
      // don't break normal USER routes.
      // ==========================================
      if (profileError) {
        console.error(
          "Profile role check error:",
          profileError
        );

        // If this route is meant for normal users,
        // allow authenticated user to continue.
        if (
          allowedRoles.length === 1 &&
          allowedRoles.includes("user")
        ) {
          setAllowed(true);
          return;
        }

        // Assessment allows all authenticated roles.
        if (
          allowedRoles.includes("user") &&
          allowedRoles.includes("expert") &&
          allowedRoles.includes("admin")
        ) {
          setAllowed(true);
          return;
        }

        setAllowed(false);
        return;
      }

      // ==========================================
      // STEP 3: PROFILE NOT FOUND
      // ==========================================
      if (!profile) {
        console.warn(
          "No profile row found for logged-in user."
        );

        // Normal authenticated user routes
        if (
          allowedRoles.length === 1 &&
          allowedRoles.includes("user")
        ) {
          setAllowed(true);
          return;
        }

        // General authenticated routes such as assessment
        if (
          allowedRoles.includes("user") &&
          allowedRoles.includes("expert") &&
          allowedRoles.includes("admin")
        ) {
          setAllowed(true);
          return;
        }

        setAllowed(false);
        return;
      }

      // ==========================================
      // STEP 4: NORMAL ROLE CHECK
      // ==========================================
      const userRole = profile.role || "user";

      console.log(
        "FREEWILL Route Access:",
        {
          user: user.id,
          role: userRole,
          allowedRoles,
        }
      );

      if (allowedRoles.includes(userRole)) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    } catch (error) {
      console.error(
        "Protected route access error:",
        error
      );

      // If user is authenticated, don't unnecessarily
      // break normal user pages.
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          if (
            allowedRoles.length === 1 &&
            allowedRoles.includes("user")
          ) {
            setAllowed(true);
            return;
          }

          if (
            allowedRoles.includes("user") &&
            allowedRoles.includes("expert") &&
            allowedRoles.includes("admin")
          ) {
            setAllowed(true);
            return;
          }
        }
      } catch (fallbackError) {
        console.error(
          "Fallback auth check error:",
          fallbackError
        );
      }

      setAllowed(false);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">
            FREEWILL
          </div>

          <div className="text-gray-400">
            Checking access...
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ACCESS DENIED
  // ==========================================
  if (!allowed) {
    return <Navigate to="/home" replace />;
  }

  // ==========================================
  // ACCESS GRANTED
  // ==========================================
  return <>{children}</>;
}

export default ProtectedRoute;
