import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "password" | "confirmPassword" | null
  >(null);

  const passwordMode =
    focusedField === "password" ||
    focusedField === "confirmPassword" ||
    password.length > 0 ||
    confirmPassword.length > 0;

  const emailMode =
    focusedField === "email" ||
    email.length > 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      /*
       * Create profile when a user session is available.
       * If email confirmation is enabled, profile creation can
       * also be handled by your existing Supabase trigger.
       */
      if (data.session) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: data.user.id,
              full_name: fullName,
              email: email,
              role: "user",
            },
            {
              onConflict: "id",
            }
          );

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }
      }

      if (!data.session) {
        setSuccess(
          "Account created successfully. Please check your email to verify your account."
        );
        setLoading(false);
        return;
      }

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="freewill-register">

      {/* =====================================================
          NIGHT SKY BACKGROUND
      ====================================================== */}

      <div className="sky">

        <div className="big-glow" />

        {/* Stars */}
        <span className="star s1" />
        <span className="star s2" />
        <span className="star s3" />
        <span className="star s4" />
        <span className="star s5" />
        <span className="star s6" />
        <span className="star s7" />
        <span className="star s8" />
        <span className="star s9" />
        <span className="star s10" />
        <span className="star s11" />
        <span className="star s12" />
        <span className="star s13" />
        <span className="star s14" />
        <span className="star s15" />

        {/* Shooting stars */}
        <div className="shooting-star shooting-one" />
        <div className="shooting-star shooting-two" />

        {/* Floating particles */}
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />

      </div>

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}

      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to FREEWILL
      </button>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="register-main">

        {/* =====================================================
            FOX CHARACTER
        ====================================================== */}

        <div
          className={`fox-stage ${
            emailMode ? "email-mode" : ""
          } ${passwordMode ? "password-mode" : ""}`}
        >

          <div className="fox-aura" />

          <div className="fox-character">

            {/* Ears */}
            <div className="fox-ear fox-ear-left">
              <div className="fox-ear-inner" />
            </div>

            <div className="fox-ear fox-ear-right">
              <div className="fox-ear-inner" />
            </div>

            {/* Head */}
            <div className="fox-head">

              <div className="fox-forehead" />

              {/* Left eye */}
              <div className="fox-eye fox-eye-left">
                <div className="eye-ball">
                  <div className="eye-pupil" />
                  <div className="eye-shine" />
                </div>
              </div>

              {/* Right eye */}
              <div className="fox-eye fox-eye-right">
                <div className="eye-ball">
                  <div className="eye-pupil" />
                  <div className="eye-shine" />
                </div>
              </div>

              {/* Eyebrows */}
              <div className="fox-brow fox-brow-left" />
              <div className="fox-brow fox-brow-right" />

              {/* Muzzle */}
              <div className="fox-muzzle fox-muzzle-left" />
              <div className="fox-muzzle fox-muzzle-right" />

              {/* Nose */}
              <div className="fox-nose" />

              {/* Mouth */}
              <div className="fox-mouth">
                <span className="mouth-left" />
                <span className="mouth-right" />
              </div>

              {/* Cheeks */}
              <div className="fox-cheek fox-cheek-left" />
              <div className="fox-cheek fox-cheek-right" />

            </div>

            {/* Body */}
            <div className="fox-body">
              <div className="fox-belly" />
            </div>

            {/* Paws */}
            <div className="fox-paw fox-paw-left">
              <span />
              <span />
              <span />
            </div>

            <div className="fox-paw fox-paw-right">
              <span />
              <span />
              <span />
            </div>

            {/* Keyboard */}
            <div className="mini-keyboard">

              <div className="keyboard-row">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="keyboard-row">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="keyboard-row">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="space-key" />

            </div>

          </div>
        </div>

        {/* =====================================================
            REGISTER CARD
        ====================================================== */}

        <div className="register-card">

          <div className="brand">
            FREEWILL
          </div>

          <div className="brand-sub">
            HUMAN EMPOWERMENT
          </div>

          <h1>Create Account</h1>

          <p className="register-description">
            Start your FREEWILL journey today
          </p>

          <form onSubmit={handleRegister}>

            {/* FULL NAME */}

            <div className="field">

              <label>Full Name</label>

              <div
                className={`input-box ${
                  focusedField === "name"
                    ? "active"
                    : ""
                }`}
              >

                <span className="field-icon">
                  ♙
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  onFocus={() =>
                    setFocusedField("name")
                  }
                  onBlur={() =>
                    setFocusedField(null)
                  }
                  autoComplete="name"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="field">

              <label>Email Address</label>

              <div
                className={`input-box ${
                  focusedField === "email"
                    ? "active"
                    : ""
                }`}
              >

                <span className="field-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  onFocus={() =>
                    setFocusedField("email")
                  }
                  onBlur={() =>
                    setFocusedField(null)
                  }
                  autoComplete="email"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="field">

              <label>Password</label>

              <div
                className={`input-box ${
                  focusedField === "password"
                    ? "active"
                    : ""
                }`}
              >

                <span className="field-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  onFocus={() =>
                    setFocusedField("password")
                  }
                  onBlur={() =>
                    setFocusedField(null)
                  }
                  autoComplete="new-password"
                />

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="field">

              <label>Confirm Password</label>

              <div
                className={`input-box ${
                  focusedField === "confirmPassword"
                    ? "active"
                    : ""
                }`}
              >

                <span className="field-icon">
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  onFocus={() =>
                    setFocusedField("confirmPassword")
                  }
                  onBlur={() =>
                    setFocusedField(null)
                  }
                  autoComplete="new-password"
                />

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="error-box">
                <span>!</span>
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="success-box">
                <span>✓</span>
                {success}
              </div>
            )}

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="register-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </form>

          {/* LOGIN */}

          <div className="login-account">

            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

          <div className="privacy-note">
            🔒 Your account information is protected
          </div>

        </div>

      </div>

      {/* =====================================================
          OCEAN WAVES
      ====================================================== */}

      <div className="ocean">

        <div className="wave wave-back" />
        <div className="wave wave-middle" />
        <div className="wave wave-front" />

        <div className="water-glow" />

      </div>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .freewill-register {
          min-height: 100vh;
          width: 100%;
          position: relative;

          overflow-x: hidden;
          overflow-y: auto;

          background:
            radial-gradient(
              circle at 50% 15%,
              #243d61 0%,
              #172a47 24%,
              #101d34 52%,
              #091323 100%
            );

          color: white;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =====================================================
           SKY
        ====================================================== */

        .sky {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;
        }

        .big-glow {
          position: absolute;

          width: 520px;
          height: 520px;

          top: -230px;
          left: 50%;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(101,165,230,.20) 0%,
              rgba(101,165,230,.07) 40%,
              transparent 72%
            );

          animation:
            skyGlow
            7s
            ease-in-out
            infinite;
        }

        @keyframes skyGlow {

          0%,
          100% {
            transform:
              translateX(-50%)
              scale(1);

            opacity: .75;
          }

          50% {
            transform:
              translateX(-50%)
              scale(1.12);

            opacity: 1;
          }
        }

        /* =====================================================
           STARS
        ====================================================== */

        .star {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 7px
            rgba(180,220,255,.95);

          animation:
            starTwinkle
            3s
            ease-in-out
            infinite;
        }

        .s1 {
          top: 8%;
          left: 12%;
        }

        .s2 {
          top: 13%;
          left: 27%;
          animation-delay: .7s;
        }

        .s3 {
          top: 9%;
          right: 18%;
          animation-delay: 1.4s;
        }

        .s4 {
          top: 22%;
          right: 8%;
          animation-delay: 2s;
        }

        .s5 {
          top: 31%;
          left: 8%;
          animation-delay: .4s;
        }

        .s6 {
          top: 27%;
          left: 23%;
          animation-delay: 1.7s;
        }

        .s7 {
          top: 36%;
          right: 17%;
          animation-delay: 2.3s;
        }

        .s8 {
          top: 16%;
          right: 35%;
          animation-delay: 1s;
        }

        .s9 {
          top: 44%;
          left: 14%;
          animation-delay: 2.5s;
        }

        .s10 {
          top: 41%;
          right: 7%;
          animation-delay: .9s;
        }

        .s11 {
          top: 52%;
          left: 27%;
          animation-delay: 1.9s;
        }

        .s12 {
          top: 56%;
          right: 29%;
          animation-delay: .2s;
        }

        .s13 {
          top: 67%;
          left: 7%;
          animation-delay: 1.2s;
        }

        .s14 {
          top: 63%;
          right: 10%;
          animation-delay: 2.7s;
        }

        .s15 {
          top: 72%;
          right: 36%;
          animation-delay: .5s;
        }

        @keyframes starTwinkle {

          0%,
          100% {
            opacity: .25;
            transform: scale(.7);
          }

          50% {
            opacity: 1;
            transform: scale(1.45);
          }
        }

        /* =====================================================
           SHOOTING STARS
        ====================================================== */

        .shooting-star {
          position: absolute;

          width: 85px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.8),
              transparent
            );

          transform: rotate(-28deg);

          opacity: 0;

          animation:
            shooting
            7s
            linear
            infinite;
        }

        .shooting-one {
          top: 20%;
          left: -100px;
        }

        .shooting-two {
          top: 38%;
          left: -100px;

          animation-delay: 3.5s;
        }

        @keyframes shooting {

          0% {
            transform:
              translateX(0)
              rotate(-28deg);

            opacity: 0;
          }

          8% {
            opacity: .8;
          }

          18% {
            transform:
              translateX(500px)
              rotate(-28deg);

            opacity: 0;
          }

          100% {
            opacity: 0;
          }
        }

        /* =====================================================
           PARTICLES
        ====================================================== */

        .particle {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #72b8db;

          opacity: .4;

          animation:
            floatParticle
            6s
            ease-in-out
            infinite;
        }

        .p1 {
          left: 17%;
          top: 38%;
        }

        .p2 {
          right: 22%;
          top: 31%;
          animation-delay: 1s;
        }

        .p3 {
          left: 32%;
          top: 22%;
          animation-delay: 2s;
        }

        .p4 {
          right: 11%;
          top: 51%;
          animation-delay: 3s;
        }

        .p5 {
          left: 8%;
          top: 57%;
          animation-delay: 4s;
        }

        @keyframes floatParticle {

          0%,
          100% {
            transform:
              translateY(0)
              scale(1);
          }

          50% {
            transform:
              translateY(-25px)
              scale(1.5);
          }
        }

        /* =====================================================
           BACK BUTTON
        ====================================================== */

        .back-button {
          position: relative;
          z-index: 20;

          display: block;

          margin: 0 auto;

          padding-top: 34px;

          border: none;

          background: transparent;

          color: #c6d7eb;

          font-size: 16px;

          font-weight: 700;

          cursor: pointer;

          transition:
            color .25s ease,
            transform .25s ease;
        }

        .back-button:hover {
          color: white;

          transform:
            translateX(-4px);
        }

        /* =====================================================
           MAIN
        ====================================================== */

        .register-main {
          position: relative;

          z-index: 10;

          min-height:
            calc(100vh - 70px);

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding:
            15px
            20px
            130px;
        }

        /* =====================================================
           FOX
        ====================================================== */

        .fox-stage {
          position: relative;

          width: 260px;
          height: 210px;

          margin-bottom: -32px;

          z-index: 15;

          transition:
            transform .45s ease;
        }

        .fox-stage.email-mode {
          transform:
            translateY(4px)
            scale(1.02);
        }

        .fox-stage.password-mode {
          transform:
            translateY(2px)
            scale(1.01);
        }

        .fox-aura {
          position: absolute;

          width: 220px;
          height: 220px;

          left: 20px;
          top: -10px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(99,184,230,.17),
              transparent 68%
            );

          filter: blur(8px);

          animation:
            foxAura
            4s
            ease-in-out
            infinite;
        }

        @keyframes foxAura {

          0%,
          100% {
            transform: scale(.95);
            opacity: .55;
          }

          50% {
            transform: scale(1.08);
            opacity: .9;
          }
        }

        .fox-character {
          position: relative;

          width: 260px;
          height: 210px;

          animation:
            foxFloat
            4s
            ease-in-out
            infinite;
        }

        @keyframes foxFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        /* =====================================================
           EARS
        ====================================================== */

        .fox-ear {
          position: absolute;

          top: 12px;

          width: 76px;
          height: 86px;

          background:
            linear-gradient(
              145deg,
              #d8894e,
              #a95732
            );

          clip-path:
            polygon(
              50% 0%,
              100% 100%,
              0% 100%
            );

          z-index: 1;
        }

        .fox-ear-left {
          left: 47px;

          transform: rotate(-10deg);
        }

        .fox-ear-right {
          right: 47px;

          transform: rotate(10deg);
        }

        .fox-ear-inner {
          position: absolute;

          width: 42px;
          height: 51px;

          top: 14px;
          left: 17px;

          background: #f3b6a0;

          clip-path:
            polygon(
              50% 0%,
              100% 100%,
              0% 100%
            );
        }

        /* =====================================================
           HEAD
        ====================================================== */

        .fox-head {
          position: absolute;

          width: 157px;
          height: 133px;

          top: 43px;
          left: 51px;

          border-radius:
            48%
            48%
            45%
            45%;

          background:
            linear-gradient(
              145deg,
              #e18a4d,
              #b85e32
            );

          box-shadow:
            inset
            0 -12px 22px
            rgba(63,25,16,.18),

            0 15px 35px
            rgba(0,0,0,.28);

          z-index: 4;
        }

        .fox-forehead {
          position: absolute;

          width: 49px;
          height: 67px;

          top: 0;
          left: 54px;

          background: #f8f3eb;

          clip-path:
            polygon(
              50% 0%,
              100% 100%,
              0% 100%
            );
        }

        /* =====================================================
           EYES
        ====================================================== */

        .fox-eye {
          position: absolute;

          top: 54px;

          width: 34px;
          height: 27px;

          z-index: 8;

          transition:
            transform .35s ease;
        }

        .fox-eye-left {
          left: 29px;
        }

        .fox-eye-right {
          right: 29px;
        }

        .eye-ball {
          position: relative;

          width: 34px;
          height: 25px;

          border-radius: 50%;

          background: white;

          overflow: hidden;

          box-shadow:
            0 0 10px
            rgba(165,215,255,.18);

          transition:
            height .2s ease,
            margin-top .2s ease,
            background .2s ease;
        }

        .eye-pupil {
          position: absolute;

          width: 14px;
          height: 17px;

          top: 4px;
          left: 10px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 25%,
              #5caee4 0%,
              #28628c 35%,
              #111d2d 65%
            );

          transition:
            transform .35s ease,
            opacity .25s ease;
        }

        .eye-shine {
          position: absolute;

          width: 5px;
          height: 5px;

          top: 6px;
          left: 15px;

          border-radius: 50%;

          background: white;

          z-index: 2;
        }

        .email-mode .eye-pupil {
          transform:
            translateX(8px);
        }

        .email-mode .fox-eye-left {
          transform:
            rotate(-4deg);
        }

        .email-mode .fox-eye-right {
          transform:
            rotate(4deg);
        }

        /* =====================================================
           CLOSED EYES
        ====================================================== */

        .password-mode .eye-ball {
          height: 5px;

          margin-top: 10px;

          background: transparent;

          border-bottom:
            3px solid
            #573123;

          border-radius: 0;
        }

        .password-mode .eye-pupil,
        .password-mode .eye-shine {
          opacity: 0;
        }

        /* =====================================================
           BROWS
        ====================================================== */

        .fox-brow {
          position: absolute;

          top: 44px;

          width: 26px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(87,43,27,.55);
        }

        .fox-brow-left {
          left: 28px;

          transform: rotate(-8deg);
        }

        .fox-brow-right {
          right: 28px;

          transform: rotate(8deg);
        }

        /* =====================================================
           MUZZLE
        ====================================================== */

        .fox-muzzle {
          position: absolute;

          width: 72px;
          height: 66px;

          bottom: 1px;

          background:
            linear-gradient(
              145deg,
              #faf6ee,
              #ebe3d9
            );

          border-radius: 50%;

          z-index: 6;
        }

        .fox-muzzle-left {
          left: 11px;
        }

        .fox-muzzle-right {
          right: 11px;
        }

        /* =====================================================
           NOSE
        ====================================================== */

        .fox-nose {
          position: absolute;

          width: 21px;
          height: 16px;

          left: 68px;
          top: 82px;

          background: #2a2020;

          border-radius:
            48%
            48%
            55%
            55%;

          z-index: 10;
        }

        /* =====================================================
           MOUTH
        ====================================================== */

        .fox-mouth {
          position: absolute;

          left: 77px;
          top: 94px;

          width: 4px;
          height: 16px;

          background: #472820;

          border-radius: 4px;

          z-index: 10;
        }

        .mouth-left,
        .mouth-right {
          position: absolute;

          width: 22px;
          height: 10px;

          border-bottom:
            2px solid
            #472820;

          border-radius: 50%;
        }

        .mouth-left {
          left: -18px;
          top: 4px;
        }

        .mouth-right {
          right: -18px;
          top: 4px;
        }

        /* =====================================================
           CHEEKS
        ====================================================== */

        .fox-cheek {
          position: absolute;

          width: 18px;
          height: 11px;

          top: 82px;

          background:
            rgba(242,125,102,.38);

          border-radius: 50%;

          z-index: 9;
        }

        .fox-cheek-left {
          left: 17px;
        }

        .fox-cheek-right {
          right: 17px;
        }

        /* =====================================================
           BODY
        ====================================================== */

        .fox-body {
          position: absolute;

          width: 110px;
          height: 72px;

          left: 75px;
          bottom: 7px;

          border-radius:
            50%
            50%
            25%
            25%;

          background:
            linear-gradient(
              145deg,
              #bd6335,
              #944521
            );

          z-index: 3;
        }

        .fox-belly {
          position: absolute;

          width: 63px;
          height: 56px;

          left: 24px;
          top: 12px;

          border-radius: 50%;

          background: #f8f3eb;
        }

        /* =====================================================
           PAWS
        ====================================================== */

        .fox-paw {
          position: absolute;

          width: 43px;
          height: 27px;

          bottom: 24px;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #bf6335,
              #954622
            );

          z-index: 12;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 3px;
        }

        .fox-paw-left {
          left: 48px;

          transform: rotate(15deg);
        }

        .fox-paw-right {
          right: 48px;

          transform: rotate(-15deg);
        }

        .fox-paw span {
          width: 5px;
          height: 7px;

          border-radius: 50%;

          background: #f2c2ad;
        }

        /* =====================================================
           KEYBOARD
        ====================================================== */

        .mini-keyboard {
          position: absolute;

          width: 118px;
          height: 42px;

          left: 71px;
          bottom: 0;

          padding: 6px;

          border-radius: 8px;

          background:
            linear-gradient(
              145deg,
              #263b55,
              #15263b
            );

          border:
            1px solid
            rgba(155,200,235,.35);

          box-shadow:
            0 8px 18px
            rgba(0,0,0,.4);

          z-index: 11;

          transform:
            perspective(80px)
            rotateX(12deg);
        }

        .keyboard-row {
          display: flex;

          gap: 3px;

          margin-bottom: 3px;
        }

        .keyboard-row i {
          display: block;

          width: 12px;
          height: 6px;

          border-radius: 2px;

          background: #b9cce0;

          opacity: .85;
        }

        .space-key {
          width: 48px;
          height: 5px;

          margin: 0 auto;

          border-radius: 4px;

          background: #b9cce0;
        }

        /* =====================================================
           REGISTER CARD
        ====================================================== */

        .register-card {
          position: relative;

          width:
            min(100%, 540px);

          padding:
            38px
            38px
            30px;

          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              rgba(24,39,63,.92),
              rgba(12,24,42,.95)
            );

          border:
            1px solid
            rgba(151,190,224,.22);

          box-shadow:
            0 30px 80px
            rgba(0,0,0,.45),

            inset
            0 1px 0
            rgba(255,255,255,.06);

          backdrop-filter:
            blur(20px);

          -webkit-backdrop-filter:
            blur(20px);

          text-align: center;
        }

        .brand {
          color: #d8b35d;

          font-size: 22px;

          font-weight: 800;

          letter-spacing: 5px;

          margin-bottom: 3px;
        }

        .brand-sub {
          color: #93a9bf;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;

          margin-bottom: 18px;
        }

        .register-card h1 {
          margin: 0;

          color: #f5f8fb;

          font-size:
            clamp(
              39px,
              7vw,
              54px
            );

          line-height: 1.05;

          font-weight: 800;

          letter-spacing: -1.5px;
        }

        .register-description {
          margin:
            13px
            0
            30px;

          color: #aab8c9;

          font-size: 18px;
        }

        /* =====================================================
           FIELDS
        ====================================================== */

        .field {
          text-align: left;

          margin-bottom: 17px;
        }

        .field label {
          display: block;

          color: #d3deea;

          font-size: 15px;

          font-weight: 700;

          margin-bottom: 8px;
        }

        .input-box {
          position: relative;

          display: flex;

          align-items: center;

          width: 100%;

          height: 60px;

          border-radius: 17px;

          border:
            1.5px solid
            rgba(144,168,193,.25);

          background:
            rgba(255,255,255,.045);

          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .input-box.active {
          border-color:
            rgba(87,169,230,.85);

          background:
            rgba(80,145,195,.08);

          box-shadow:
            0 0 0 4px
            rgba(66,151,215,.10),

            0 0 24px
            rgba(66,151,215,.08);
        }

        .field-icon {
          width: 50px;

          text-align: center;

          color: #8da9c2;

          font-size: 18px;

          opacity: .9;
        }

        .input-box input {
          flex: 1;

          height: 100%;

          border: none;

          outline: none;

          background: transparent;

          color: #f2f7fb;

          font-size: 17px;

          padding:
            0
            17px
            0
            0;
        }

        .input-box input::placeholder {
          color: #72869c;
        }

        /* =====================================================
           ERROR
        ====================================================== */

        .error-box {
          display: flex;

          align-items: center;

          gap: 9px;

          text-align: left;

          color: #ffb7ae;

          background:
            rgba(179,61,53,.12);

          border:
            1px solid
            rgba(229,104,92,.25);

          border-radius: 12px;

          padding:
            11px
            13px;

          margin-bottom: 17px;

          font-size: 13px;
        }

        .error-box span {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #c74e43;

          color: white;

          font-weight: 800;

          flex-shrink: 0;
        }

        /* =====================================================
           SUCCESS
        ====================================================== */

        .success-box {
          display: flex;

          align-items: center;

          gap: 9px;

          text-align: left;

          color: #bce8cf;

          background:
            rgba(61,145,94,.12);

          border:
            1px solid
            rgba(86,184,120,.25);

          border-radius: 12px;

          padding:
            11px
            13px;

          margin-bottom: 17px;

          font-size: 13px;
        }

        .success-box span {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          background: #3d9960;

          color: white;

          font-weight: 800;

          flex-shrink: 0;
        }

        /* =====================================================
           REGISTER BUTTON
        ====================================================== */

        .register-button {
          width: 100%;

          height: 66px;

          border: none;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              #377fd4,
              #235db3
            );

          color: white;

          font-size: 19px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 13px 30px
            rgba(35,93,179,.30);

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .register-button:hover:not(:disabled) {
          transform:
            translateY(-2px);

          box-shadow:
            0 17px 35px
            rgba(35,93,179,.40);
        }

        .register-button:active:not(:disabled) {
          transform:
            translateY(0);
        }

        .register-button:disabled {
          opacity: .7;

          cursor: not-allowed;
        }

        .register-arrow {
          margin-left: 9px;

          font-size: 23px;
        }

        .spinner {
          display: inline-block;

          width: 18px;
          height: 18px;

          border:
            3px solid
            rgba(255,255,255,.3);

          border-top-color: white;

          border-radius: 50%;

          margin-right: 8px;

          vertical-align: -3px;

          animation:
            spin
            .8s
            linear
            infinite;
        }

        @keyframes spin {

          to {
            transform: rotate(360deg);
          }

        }

        /* =====================================================
           LOGIN LINK
        ====================================================== */

        .login-account {
          margin-top: 22px;

          color: #8293a6;

          font-size: 15px;
        }

        .login-account button {
          border: none;

          background: transparent;

          padding: 0;

          color: #65a9e7;

          font-size: inherit;

          font-weight: 800;

          cursor: pointer;
        }

        .login-account button:hover {
          text-decoration: underline;
        }

        /* =====================================================
           PRIVACY
        ====================================================== */

        .privacy-note {
          margin-top: 18px;

          color: #607389;

          font-size: 11px;

          letter-spacing: .2px;
        }

        /* =====================================================
           OCEAN
        ====================================================== */

        .ocean {
          position: fixed;

          left: 0;
          right: 0;
          bottom: 0;

          height: 190px;

          z-index: 2;

          pointer-events: none;

          overflow: hidden;
        }

        .wave {
          position: absolute;

          left: -10%;

          width: 120%;

          border-radius:
            50% 50% 0 0;

          border-top:
            2px solid
            rgba(96,180,220,.25);
        }

        .wave-back {
          height: 130px;

          bottom: -100px;

          background:
            rgba(18,62,91,.35);

          animation:
            waveBack
            10s
            ease-in-out
            infinite;
        }

        .wave-middle {
          height: 105px;

          bottom: -83px;

          background:
            rgba(15,75,104,.30);

          animation:
            waveMiddle
            8s
            ease-in-out
            infinite
            reverse;
        }

        .wave-front {
          height: 80px;

          bottom: -63px;

          background:
            linear-gradient(
              180deg,
              rgba(35,115,145,.30),
              rgba(8,34,58,.70)
            );

          animation:
            waveFront
            6s
            ease-in-out
            infinite;
        }

        @keyframes waveBack {

          0%,
          100% {
            transform:
              translateX(-3%)
              rotate(1deg);
          }

          50% {
            transform:
              translateX(3%)
              rotate(-1deg);
          }
        }

        @keyframes waveMiddle {

          0%,
          100% {
            transform:
              translateX(3%)
              rotate(-1deg);
          }

          50% {
            transform:
              translateX(-3%)
              rotate(1deg);
          }
        }

        @keyframes waveFront {

          0%,
          100% {
            transform:
              translateX(-2%);
          }

          50% {
            transform:
              translateX(2%);
          }
        }

        .water-glow {
          position: absolute;

          width: 100%;
          height: 90px;

          bottom: 0;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(27,96,128,.15)
            );

          filter: blur(3px);
        }

        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 640px) {

          .back-button {
            padding-top: 23px;

            font-size: 14px;
          }

          .register-main {
            padding:
              5px
              13px
              100px;
          }

          .fox-stage {
            width: 230px;
            height: 185px;

            margin-bottom: -34px;

            transform: scale(.87);
          }

          .fox-stage.email-mode {
            transform:
              scale(.87)
              translateY(4px);
          }

          .fox-stage.password-mode {
            transform:
              scale(.87)
              translateY(2px);
          }

          .register-card {
            width: 100%;

            padding:
              31px
              19px
              27px;

            border-radius: 27px;
          }

          .brand {
            font-size: 18px;

            letter-spacing: 4px;
          }

          .brand-sub {
            font-size: 9px;

            letter-spacing: 2.5px;

            margin-bottom: 15px;
          }

          .register-card h1 {
            font-size: 38px;
          }

          .register-description {
            font-size: 16px;

            margin-bottom: 25px;
          }

          .field {
            margin-bottom: 15px;
          }

          .field label {
            font-size: 14px;
          }

          .input-box {
            height: 57px;

            border-radius: 15px;
          }

          .input-box input {
            font-size: 16px;
          }

          .register-button {
            height: 61px;

            border-radius: 15px;

            font-size: 18px;
          }

          .login-account {
            font-size: 14px;
          }

          .ocean {
            height: 130px;
          }

        }

        /* =====================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 380px) {

          .register-card {
            padding:
              28px
              15px
              24px;
          }

          .register-card h1 {
            font-size: 34px;
          }

          .fox-stage {
            transform: scale(.78);

            margin-bottom: -48px;
          }

          .fox-stage.email-mode {
            transform:
              scale(.78)
              translateY(4px);
          }

          .fox-stage.password-mode {
            transform:
              scale(.78)
              translateY(2px);
          }

        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;

            animation-iteration-count: 1 !important;
          }

        }

      `}</style>
    </div>
  );
}

export default Register;
