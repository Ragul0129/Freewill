import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const location = useLocation();

  const [loading, setLoading] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  const roleKey =
    allowedRoles.join("|");

  useEffect(() => {
    let active = true;

    const checkAccess = async () => {
      try {
        setLoading(true);
        setAllowed(false);

        // ==========================================
        // STEP 1: CHECK LOGIN SESSION
        // ==========================================

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (!active) return;

        if (authError) {
          console.error(
            "Auth check error:",
            authError
          );

          setAllowed(false);
          setLoading(false);
          return;
        }

        // ==========================================
        // NO LOGIN
        // ==========================================

        if (!user) {
          setAllowed(false);
          setLoading(false);
          return;
        }

        // ==========================================
        // STEP 2: GET USER ROLE
        // ==========================================

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (!active) return;

        if (profileError) {
          console.error(
            "Profile role check error:",
            profileError
          );

          setAllowed(false);
          setLoading(false);
          return;
        }

        // ==========================================
        // PROFILE NOT FOUND
        // ==========================================

        if (!profile) {
          console.warn(
            "No profile found for logged-in user."
          );

          setAllowed(false);
          setLoading(false);
          return;
        }

        // ==========================================
        // STEP 3: ROLE CHECK
        // ==========================================

        const userRole =
          profile.role;

        console.log(
          "FREEWILL Route Access:",
          {
            user: user.id,
            role: userRole,
            allowedRoles,
          }
        );

        if (
          allowedRoles.includes(
            userRole
          )
        ) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }

        setLoading(false);
      } catch (error) {
        console.error(
          "Protected route access error:",
          error
        );

        if (active) {
          setAllowed(false);
          setLoading(false);
        }
      }
    };

    checkAccess();

    return () => {
      active = false;
    };
  }, [roleKey]);

  // ==========================================
  // LOADING
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
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // ==========================================
  // ACCESS GRANTED
  // ==========================================

  return <>{children}</>;
}

export default ProtectedRoute;
