import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Expert = {
  id: string;
  specialization: string | null;
  qualification: string | null;
  experience_years: number | null;
  hourly_rate: number | null;
  bio: string | null;
  is_verified: boolean;
  is_active: boolean;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

type Service = {
  id: string;
  expert_id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
};

function Experts() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExperts();
  }, []);

  const loadExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const { data: expertData, error: expertError } =
        await supabase
          .from("expert_profiles")
          .select(`
            id,
            specialization,
            qualification,
            experience_years,
            hourly_rate,
            bio,
            is_verified,
            is_active,
            profiles (
              full_name,
              avatar_url
            )
          `)
          .eq("is_active", true)
          .order("created_at", {
            ascending: false,
          });

      if (expertError) {
        console.error("Experts error:", expertError);
        setError("Unable to load experts.");
        return;
      }

      const formattedExperts: Expert[] = (
        expertData || []
      ).map((item: any) => ({
        id: item.id,
        specialization: item.specialization,
        qualification: item.qualification,
        experience_years: item.experience_years,
        hourly_rate: item.hourly_rate,
        bio: item.bio,
        is_verified: item.is_verified,
        is_active: item.is_active,
        profile: Array.isArray(item.profiles)
          ? item.profiles[0] || null
          : item.profiles || null,
      }));

      setExperts(formattedExperts);

      const expertIds = formattedExperts.map(
        (expert) => expert.id
      );

      if (expertIds.length === 0) {
        setServices([]);
        return;
      }

      const { data: serviceData, error: serviceError } =
        await supabase
          .from("services")
          .select(`
            id,
            expert_id,
            title,
            description,
            duration_minutes,
            price
          `)
          .in("expert_id", expertIds)
          .eq("is_active", true)
          .order("created_at", {
            ascending: false,
          });

      if (serviceError) {
        console.error("Services error:", serviceError);
        setError("Unable to load services.");
        return;
      }

      setServices(serviceData || []);
    } catch (err) {
      console.error("Load experts error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getExpertServices = (expertId: string) => {
    return services.filter(
      (service) => service.expert_id === expertId
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">
            Finding experts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              FREEWILL
            </h1>
            <p className="text-xs text-gray-500">
              Human Empowerment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Find Your Expert
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Talk to the right person
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 mt-4">
            Connect with experienced professionals and
            choose a session that works for you.
          </p>
        </section>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        {experts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-5">👨‍⚕️</div>

            <h3 className="text-2xl font-bold text-gray-900">
              No experts available yet
            </h3>

            <p className="text-gray-500 mt-2">
              Our experts will appear here once they are
              available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {experts.map((expert) => {
              const expertServices = getExpertServices(
                expert.id
              );

              return (
                <div
                  key={expert.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {expert.profile?.avatar_url ? (
                        <img
                          src={expert.profile.avatar_url}
                          alt={
                            expert.profile.full_name ||
                            "Expert"
                          }
                          className="w-16 h-16 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
                          👤
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {expert.profile?.full_name ||
                              "FREEWILL Expert"}
                          </h3>

                          {expert.is_verified && (
                            <span
                              className="text-blue-600"
                              title="Verified Expert"
                            >
                              ✓
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {expert.specialization ||
                            "Wellness Expert"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {expert.experience_years !== null && (
                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                          {expert.experience_years} years
                          experience
                        </span>
                      )}

                      {expert.qualification && (
                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                          {expert.qualification}
                        </span>
                      )}
                    </div>

                    {expert.bio && (
                      <p className="text-sm text-gray-600 mt-5 line-clamp-3">
                        {expert.bio}
                      </p>
                    )}

                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Available Sessions
                      </h4>

                      {expertServices.length === 0 ? (
                        <p className="text-sm text-gray-400">
                          No active services available.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {expertServices.map(
                            (service) => (
                              <div
                                key={service.id}
                                className="border border-gray-200 rounded-2xl p-4"
                              >
                                <div className="flex justify-between gap-3">
                                  <div>
                                    <h5 className="font-semibold text-gray-900">
                                      {service.title}
                                    </h5>

                                    <p className="text-xs text-gray-500 mt-1">
                                      {
                                        service.duration_minutes
                                      }{" "}
                                      minutes
                                    </p>
                                  </div>

                                  <p className="font-bold text-gray-900 whitespace-nowrap">
                                    ₹{service.price}
                                  </p>
                                </div>

                                {service.description && (
                                  <p className="text-xs text-gray-500 mt-3">
                                    {service.description}
                                  </p>
                                )}

                                <Link
                                  to={`/booking?service=${service.id}`}
                                  className="block text-center mt-4 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                                >
                                  Book This Session
                                </Link>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Experts;
