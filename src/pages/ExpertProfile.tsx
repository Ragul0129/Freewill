import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ExpertProfileData = {
  id: string;
  profile_id: string;
  bio: string | null;
  specialization: string | null;
  experience_years: number | null;
  qualification: string | null;
  hourly_rate: number | null;
  is_verified: boolean;
  is_active: boolean;
};

function ExpertProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ExpertProfileData | null>(null);

  const [bio, setBio] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [qualification, setQualification] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadExpertProfile();
  }, []);

  const loadExpertProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("expert_profiles")
        .select(`
          id,
          profile_id,
          bio,
          specialization,
          experience_years,
          qualification,
          hourly_rate,
          is_verified,
          is_active
        `)
        .eq("profile_id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Expert profile error:", profileError);
        setError("Unable to load expert profile.");
        return;
      }

      if (data) {
        setProfile(data);

        setBio(data.bio || "");
        setSpecialization(data.specialization || "");
        setExperienceYears(
          data.experience_years !== null
            ? String(data.experience_years)
            : ""
        );
        setQualification(data.qualification || "");
        setHourlyRate(
          data.hourly_rate !== null
            ? String(data.hourly_rate)
            : ""
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      if (!specialization.trim()) {
        setError("Please enter your specialization.");
        return;
      }

      if (!qualification.trim()) {
        setError("Please enter your qualification.");
        return;
      }

      const experience = experienceYears
        ? Number(experienceYears)
        : 0;

      const rate = hourlyRate
        ? Number(hourlyRate)
        : 0;

      if (experience < 0) {
        setError("Experience cannot be negative.");
        return;
      }

      if (rate < 0) {
        setError("Session rate cannot be negative.");
        return;
      }

      if (profile) {
        // Update existing expert profile
        const { data, error: updateError } = await supabase
          .from("expert_profiles")
          .update({
            bio: bio.trim(),
            specialization: specialization.trim(),
            experience_years: experience,
            qualification: qualification.trim(),
            hourly_rate: rate,
          })
          .eq("id", profile.id)
          .select()
          .single();

        if (updateError) {
          console.error("Update error:", updateError);
          setError("Unable to update your expert profile.");
          return;
        }

        setProfile(data);
      } else {
        // Create new expert profile
        const { data, error: insertError } = await supabase
          .from("expert_profiles")
          .insert({
            profile_id: user.id,
            bio: bio.trim(),
            specialization: specialization.trim(),
            experience_years: experience,
            qualification: qualification.trim(),
            hourly_rate: rate,
            is_verified: false,
            is_active: true,
          })
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
          setError(
            "Unable to create expert profile. Make sure your account has expert access."
          );
          return;
        }

        setProfile(data);
      }

      setMessage("Expert profile saved successfully.");
    } catch (err) {
      console.error("Save error:", err);
      setError("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading expert profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              FREEWILL
            </h1>

            <p className="text-xs text-gray-500">
              Expert Portal
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
              to="/expert-dashboard"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Expert Profile
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Build your professional profile
          </h2>

          <p className="text-gray-500 mt-2">
            Add your professional information so users can understand
            your expertise before booking a session.
          </p>
        </div>

        {/* Verification status */}
        <div
          className={`mb-6 rounded-2xl border p-5 ${
            profile?.is_verified
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {profile?.is_verified ? "✓" : "⏳"}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {profile?.is_verified
                  ? "Profile Verified"
                  : "Verification Pending"}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {profile?.is_verified
                  ? "Your expert profile is verified and visible to users."
                  : "Your profile will require verification before being fully trusted as a verified expert."}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specialization */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialization *
              </label>

              <input
                type="text"
                value={specialization}
                onChange={(e) =>
                  setSpecialization(e.target.value)
                }
                placeholder="e.g. Mental Wellness & Counselling"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Qualification *
              </label>

              <input
                type="text"
                value={qualification}
                onChange={(e) =>
                  setQualification(e.target.value)
                }
                placeholder="e.g. M.Sc Psychology"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience (Years)
              </label>

              <input
                type="number"
                min="0"
                value={experienceYears}
                onChange={(e) =>
                  setExperienceYears(e.target.value)
                }
                placeholder="e.g. 5"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Session Rate (₹)
              </label>

              <input
                type="number"
                min="0"
                value={hourlyRate}
                onChange={(e) =>
                  setHourlyRate(e.target.value)
                }
                placeholder="e.g. 1000"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Professional Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              placeholder="Tell users about your experience, approach, expertise and how you can help them..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
              {message}
            </div>
          )}

          {/* Submit */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {saving ? "Saving..." : "Save Expert Profile"}
            </button>

            <Link
              to="/expert-dashboard"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>

        {/* Next section preview */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900">
            Next: Your Services
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            After completing your expert profile, you'll be able to
            create counseling services with duration, pricing and
            descriptions.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ExpertProfile;
