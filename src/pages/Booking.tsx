import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import bossImage from "../assets/boss.png";
import jeevithaImage from "../assets/jeevitha.png";
import rahulImage from "../assets/rahul.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Service = {
  name: string;
  price: number | null;
};

type Expert = {
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  services: Service[];
};

const experts: Expert[] = [
  {
    name: "Simon Anandh Raj",
    designation: "Founder / CEO & Emotional Intelligence Coach",
    specialization: "Training, Coaching & Mentoring",
    experience: "26 Years Experience",
    image: bossImage,
    bio: "Simon Anandh Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development.",
    services: [
      { name: "One Hour Session", price: 1500 },
      { name: "Psychometric Analysis", price: 2500 },
      { name: "One-to-One Session", price: 3000 },
      { name: "Training Sessions", price: 12000 },
      { name: "Mentoring", price: 25000 },
    ],
  },
  {
    name: "Jeevitha S",
    designation: "Clinical Psychologist & Project Head",
    specialization: "Training, Counselling & Coaching",
    experience: "5 Years Experience",
    image: jeevithaImage,
    bio: "Jeevitha S is a Clinical Psychologist and Project Head with 5 years of experience in counselling, coaching and professional training.",
    services: [
      { name: "One Hour Session", price: 1500 },
      { name: "Psychometric Analysis", price: 2500 },
      { name: "One-to-One Session", price: 3000 },
      { name: "Training Sessions", price: 12000 },
      { name: "Mentoring", price: 25000 },
    ],
  },
  {
    name: "Rahul K.P",
    designation: "Life Coach & Content Head",
    specialization: "Training & Content Management",
    experience: "7 Years Experience",
    image: rahulImage,
    bio: "Rahul K.P is a Life Coach and Content Head with 7 years of experience in training and content management.",
    services: [
      { name: "Training & Coaching", price: null },
      { name: "Content Management", price: null },
      { name: "Life Coaching", price: null },
    ],
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function Booking() {
  const navigate = useNavigate();

  const [selectedExpert, setSelectedExpert] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const expert = experts[selectedExpert];
  const service = expert.services[selectedService];

  const handleExpertChange = (index: number) => {
    setSelectedExpert(index);
    setSelectedService(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !name || !email || !phone) {
      alert("Please fill all required details.");
      return;
    }

    try {
      setLoading(true);

      // Check logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
      }

      if (!user) {
        alert("Please login or register before booking an appointment.");
        navigate("/login");
        return;
      }

      // Save booking to Supabase
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        expert_name: expert.name,
        service_name: service.name,
        price: service.price,
        booking_date: date,
        booking_time: time,
        name: name,
        email: email,
        phone: phone,
        reason: reason,
        status: "pending",
      });

      if (error) {
        console.error("Booking error:", error);
        alert(`Booking failed: ${error.message}`);
        return;
      }

      alert(
        `Appointment request submitted successfully! 🎉\n\n` +
        `Expert: ${expert.name}\n` +
        `Service: ${service.name}\n` +
        `Date: ${date}\n` +
        `Time: ${time}\n\n` +
        `Your appointment is currently pending confirmation.`
      );

      // Reset form
      setDate("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setReason("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#173d3a]">

      {/* HERO */}
      <section className="bg-[#0d4743] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#e2b85b]">
            FREEWILL • HUMAN EMPOWERMENT
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Take the next step towards
            <span className="text-[#e2b85b]"> a better you.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Connect with our experienced professionals and choose a service
            that fits your personal growth and wellbeing journey.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-14 md:py-20">

        {/* EXPERTS */}
        <section>
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Our Professionals
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Choose Your Expert
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Select the professional you would like to connect with.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {experts.map((item, index) => {
              const selected = selectedExpert === index;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleExpertChange(index)}
                  className={`overflow-hidden rounded-[2rem] bg-white text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                    selected
                      ? "ring-2 ring-[#c88d22]"
                      : "ring-1 ring-black/5"
                  }`}
                >
                  <div className="relative h-72 overflow-hidden bg-[#0d4743]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-4 left-4 rounded-full bg-[#e8a83b] px-4 py-2 text-xs font-black text-[#173d3a]">
                      {item.experience}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                      {item.designation}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      {item.specialization}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {item.bio}
                    </p>

                    <div className="mt-5">
                      <span
                        className={`inline-block rounded-full px-4 py-2 text-xs font-bold ${
                          selected
                            ? "bg-[#0d4743] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {selected ? "Selected ✓" : "Select Expert"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className="mt-14 rounded-[2rem] bg-white p-7 shadow-xl md:p-10">

          <div className="mb-9">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
              Appointment
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Schedule Your Session
            </h2>

            <p className="mt-3 text-gray-600">
              Select your service, date and preferred time.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* SERVICE */}
            <div>
              <label className="mb-3 block text-sm font-bold">
                Select Service *
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {expert.services.map((item, index) => {
                  const selected = selectedService === index;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelectedService(index)}
                      className={`rounded-2xl border-2 p-5 text-left transition ${
                        selected
                          ? "border-[#c88d22] bg-[#f8f1e1]"
                          : "border-gray-200 hover:border-[#0d4743]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold">
                            {item.name}
                          </p>

                          <p className="mt-2 text-xs text-gray-500">
                            Professional FREEWILL service
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-black text-[#0d4743]">
                            {item.price !== null
                              ? `₹${item.price.toLocaleString("en-IN")}`
                              : "Contact"}
                          </p>

                          {selected && (
                            <p className="mt-1 text-xs font-bold text-[#c88d22]">
                              Selected ✓
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DATE + TIME */}
            <div className="mt-10 grid gap-8 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm font-bold">
                  Select Date *
                </label>

                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none transition focus:border-[#0d4743]"
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold">
                  Select Time *
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition ${
                        time === slot
                          ? "border-[#c88d22] bg-[#f8f1e1] text-[#173d3a]"
                          : "border-gray-200 hover:border-[#0d4743]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* PERSONAL DETAILS */}
            <div className="mt-10 border-t border-gray-100 pt-10">

              <h3 className="text-xl font-black">
                Your Details
              </h3>

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-[#0d4743]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-[#0d4743]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-[#0d4743]"
                    required
                  />
                </div>

              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold">
                  What would you like support with?
                </label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="You can briefly describe what you would like to discuss..."
                  className="w-full resize-none rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-[#0d4743]"
                />
              </div>

            </div>

            {/* SUMMARY */}
            <div className="mt-10 rounded-2xl bg-[#f7f4ed] p-6">

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c88d22]">
                Appointment Summary
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                <div>
                  <p className="text-xs text-gray-500">
                    Expert
                  </p>

                  <p className="mt-1 font-bold">
                    {expert.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Service
                  </p>

                  <p className="mt-1 font-bold">
                    {service.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 font-bold">
                    {date || "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="mt-1 font-bold">
                    {time || "Not selected"}
                  </p>
                </div>

                <div className="md:col-span-2 border-t border-black/5 pt-4">

                  <p className="text-xs text-gray-500">
                    Session Price
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#0d4743]">
                    {service.price !== null
                      ? `₹${service.price.toLocaleString("en-IN")}`
                      : "Price will be confirmed"}
                  </p>

                </div>

              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full rounded-full px-8 py-4 font-bold text-white shadow-lg transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#0d4743] hover:bg-[#12554f]"
              }`}
            >
              {loading
                ? "Submitting Appointment..."
                : "Request Appointment →"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Payment will be available after appointment confirmation.
            </p>

          </form>
        </section>

        {/* TRUST MESSAGE */}
        <section className="mt-10 rounded-[2rem] border border-[#ddd6c8] bg-white p-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f1e1] text-2xl">
            ✦
          </div>

          <h2 className="mt-5 text-2xl font-black">
            Your wellbeing matters.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            FREEWILL aims to create a safe and supportive environment
            where you can take time to understand yourself and seek
            meaningful guidance.
          </p>

        </section>

        {/* BACK */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="font-bold text-[#0d4743] hover:text-[#c88d22]"
          >
            ← Back to FREEWILL Home
          </Link>
        </div>

      </main>
    </div>
  );
}

export default Booking;
