import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Service = {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
};

type ExpertProfile = {
  id: string;
};

function ExpertServices() {
  const navigate = useNavigate();

  const [expertProfile, setExpertProfile] =
    useState<ExpertProfile | null>(null);

  const [services, setServices] = useState<Service[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
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

      // Find expert profile
      const { data: expertData, error: expertError } =
        await supabase
          .from("expert_profiles")
          .select("id")
          .eq("profile_id", user.id)
          .maybeSingle();

      if (expertError) {
        console.error("Expert profile error:", expertError);
        setError("Unable to load expert profile.");
        return;
      }

      if (!expertData) {
        setError(
          "Expert profile not found. Please complete your expert profile first."
        );
        return;
      }

      setExpertProfile(expertData);

      // Load services
      const { data: serviceData, error: serviceError } =
        await supabase
          .from("services")
          .select(
            "id, title, description, duration_minutes, price, is_active, created_at"
          )
          .eq("expert_id", expertData.id)
          .order("created_at", { ascending: false });

      if (serviceError) {
        console.error("Services error:", serviceError);
        setError("Unable to load your services.");
        return;
      }

      setServices(serviceData || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDuration("30");
    setPrice("");
    setEditingId(null);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!expertProfile) {
      setError("Expert profile not found.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a service title.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    if (!price || Number(price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        // Update service
        const { error: updateError } = await supabase
          .from("services")
          .update({
            title: title.trim(),
            description: description.trim(),
            duration_minutes: Number(duration),
            price: Number(price),
          })
          .eq("id", editingId)
          .eq("expert_id", expertProfile.id);

        if (updateError) {
          console.error("Update service error:", updateError);
          setError("Unable to update service.");
          return;
        }

        setMessage("Service updated successfully.");
      } else {
        // Create service
        const { error: insertError } = await supabase
          .from("services")
          .insert({
            expert_id: expertProfile.id,
            title: title.trim(),
            description: description.trim(),
            duration_minutes: Number(duration),
            price: Number(price),
            is_active: true,
          });

        if (insertError) {
          console.error("Create service error:", insertError);
          setError("Unable to create service.");
          return;
        }

        setMessage("Service created successfully.");
      }

      resetForm();
      await loadServices();
    } catch (err) {
      console.error("Service save error:", err);
      setError("Something went wrong while saving the service.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDescription(service.description || "");
    setDuration(String(service.duration_minutes));
    setPrice(String(service.price));

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleToggle = async (service: Service) => {
    setError("");
    setMessage("");

    const { error: updateError } = await supabase
      .from("services")
      .update({
        is_active: !service.is_active,
      })
      .eq("id", service.id)
      .eq("expert_id", expertProfile?.id);

    if (updateError) {
      console.error("Toggle service error:", updateError);
      setError("Unable to update service status.");
      return;
    }

    setMessage(
      service.is_active
        ? "Service deactivated."
        : "Service activated."
    );

    await loadServices();
  };

  const handleDelete = async (serviceId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId)
      .eq("expert_id", expertProfile?.id);

    if (deleteError) {
      console.error("Delete service error:", deleteError);
      setError("Unable to delete service.");
      return;
    }

    setMessage("Service deleted successfully.");

    await loadServices();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading your services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
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
              to="/expert-dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>

            <Link
              to="/home"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Expert Services
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Manage your services
          </h2>

          <p className="text-gray-500 mt-2">
            Create the sessions that users can book with you.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
            {message}
          </div>
        )}

        {/* Create / Edit Service */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {editingId
                  ? "Edit Service"
                  : "Create New Service"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Define your session type, duration and price.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1:1 Personal Counselling Session"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration *
                </label>

                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 999"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                placeholder="Explain what users can expect from this session..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Create Service"}
              </button>
            </div>
          </form>
        </section>

        {/* Services List */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Your Services
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {services.length} service
                {services.length !== 1 ? "s" : ""} created
              </p>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <div className="text-5xl mb-4">🧠</div>

              <h3 className="text-xl font-bold text-gray-900">
                No services yet
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first service so users can book a
                session with you.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {service.title}
                      </h4>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          service.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {service.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{service.price}
                      </p>

                      <p className="text-xs text-gray-500">
                        per session
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {service.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mt-5">
                      {service.description}
                    </p>
                  )}

                  {/* Details */}
                  <div className="flex items-center gap-5 mt-5 text-sm text-gray-500">
                    <span>
                      ⏱️ {service.duration_minutes} minutes
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggle(service)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      {service.is_active
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(service.id)}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ExpertServices;
