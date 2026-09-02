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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (error || !profile) {
        setAllowed(false);
        return;
      }

      setAllowed(allowedRoles.includes(profile.role));
    } catch (error) {
      console.error("Access check error:", error);
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  };

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

  if (!allowed) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
