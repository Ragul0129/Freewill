import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [transitioning, setTransitioning] = useState(false);

  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "password" | "confirm" | null
  >(null);

  const startHomeTransition = () => {
    setTransitioning(true);

    window.setTimeout(() => {
      navigate("/home");
    }, 1150);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (transitioning) return;

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("Registration failed. Please try again.");
        return;
      }

      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: fullName.trim(),
            email: email.trim(),
            role: "user",
          });

        if (profileError) {
          console.error(
            "Profile creation error:",
            profileError
          );
        }
      }

      if (!data.session) {
        alert(
          "Account created successfully. Please check your email and confirm your account before signing in."
        );

        navigate("/login");
        return;
      }

      setLoading(false);
      startHomeTransition();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`register-page ${
        transitioning ? "page-transitioning" : ""
      }`}
    >
      {/* =========================================
          HEALING BACKGROUND
      ========================================== */}

      <div className="ocean-bg">
        <div className="stars"></div>

        <div className="healing-particles">
          <span className="particle p1"></span>
          <span className="particle p2"></span>
          <span className="particle p3"></span>
          <span className="particle p4"></span>
          <span className="particle p5"></span>
          <span className="particle p6"></span>
          <span className="particle p7"></span>
          <span className="particle p8"></span>
          <span className="particle p9"></span>
          <span className="particle p10"></span>
          <span className="particle p11"></span>
          <span className="particle p12"></span>
          <span className="particle p13"></span>
          <span className="particle p14"></span>
          <span className="particle p15"></span>
          <span className="particle p16"></span>
          <span className="particle p17"></span>
          <span className="particle p18"></span>
          <span className="particle p19"></span>
          <span className="particle p20"></span>
        </div>

        <div className="healing-stream stream-one"></div>
        <div className="healing-stream stream-two"></div>
        <div className="healing-stream stream-three"></div>
        <div className="healing-stream stream-four"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>

        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>
      </div>

      {/* =========================================
          REGISTER CONTAINER
      ========================================== */}

      <div className="register-container">
        <div className="register-card">
          {/* LOGO */}

          <div className="logo-section">
            <div className="logo-circle">
              <span>F</span>
            </div>

            <h1>FREEWILL</h1>

            <p>Human Empowerment</p>
          </div>

          {/* WELCOME */}

          <div className="welcome-text">
            <h2>Create Your Account</h2>

            <p>
              Begin your journey towards
              <br />
              better wellbeing.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={handleRegister}>
            {/* FULL NAME */}

            <div
              className={`input-group ${
                focusedField === "name"
                  ? "input-focused"
                  : ""
              }`}
            >
              <label>Full name</label>

              <div className="input-wrapper">
                <span className="input-icon">✦</span>

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
                  disabled={transitioning}
                />
              </div>
            </div>

            {/* EMAIL */}

            <div
              className={`input-group ${
                focusedField === "email"
                  ? "input-focused"
                  : ""
              }`}
            >
              <label>Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

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
                  disabled={transitioning}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div
              className={`input-group ${
                focusedField === "password"
                  ? "input-focused"
                  : ""
              }`}
            >
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

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
                  disabled={transitioning}
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div
              className={`input-group ${
                focusedField === "confirm"
                  ? "input-focused"
                  : ""
              }`}
            >
              <label>Confirm password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔐</span>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  onFocus={() =>
                    setFocusedField("confirm")
                  }
                  onBlur={() =>
                    setFocusedField(null)
                  }
                  autoComplete="new-password"
                  disabled={transitioning}
                />
              </div>
            </div>

            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              disabled={loading || transitioning}
              className={`register-button ${
                loading
                  ? "button-loading-state"
                  : ""
              }`}
            >
              {loading ? (
                <>
                  <div className="fluid-container">
                    <div className="fluid-wave fluid-wave-one"></div>
                    <div className="fluid-wave fluid-wave-two"></div>
                    <div className="fluid-wave fluid-wave-three"></div>
                  </div>

                  <div className="runner">
                    <div className="runner-glow"></div>

                    <div className="runner-body">
                      <div className="runner-head"></div>
                      <div className="runner-core"></div>
                    </div>

                    <div className="runner-leg runner-leg-one"></div>
                    <div className="runner-leg runner-leg-two"></div>

                    <div className="runner-arm runner-arm-one"></div>
                    <div className="runner-arm runner-arm-two"></div>
                  </div>

                  <span className="creating-text">
                    Creating...
                  </span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* LOGIN */}

          <div className="login-section">
            <span>Already have an account?</span>

            <Link
              to="/login"
              onClick={(e) => {
                if (transitioning) {
                  e.preventDefault();
                }
              }}
            >
              Sign in
            </Link>
          </div>

          {/* SECURITY */}

          <div className="security-text">
            <span>🔐</span>

            <span>
              Your information is securely protected
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          PREMIUM PAGE TRANSITION
      ========================================== */}

      {transitioning && (
        <div className="transition-overlay">
          {/* DEPTH */}

          <div className="transition-depth"></div>

          {/* PARTICLES */}

          <div className="transition-particles">
            <span className="tp tp1"></span>
            <span className="tp tp2"></span>
            <span className="tp tp3"></span>
            <span className="tp tp4"></span>
            <span className="tp tp5"></span>
            <span className="tp tp6"></span>
            <span className="tp tp7"></span>
            <span className="tp tp8"></span>
            <span className="tp tp9"></span>
            <span className="tp tp10"></span>
            <span className="tp tp11"></span>
            <span className="tp tp12"></span>
            <span className="tp tp13"></span>
            <span className="tp tp14"></span>
            <span className="tp tp15"></span>
          </div>

          {/* HEALING CORE */}

          <div className="healing-core">
            <div className="core-ring ring-one"></div>
            <div className="core-ring ring-two"></div>
            <div className="core-ring ring-three"></div>
            <div className="core-light"></div>
          </div>

          {/* 3D WAVES */}

          <div className="transition-wave tw-one"></div>
          <div className="transition-wave tw-two"></div>
          <div className="transition-wave tw-three"></div>
          <div className="transition-wave tw-four"></div>

          {/* LIGHT SWEEP */}

          <div className="light-sweep"></div>

          {/* BRAND */}

          <div className="transition-brand">
            <div className="transition-logo">F</div>

            <div className="transition-title">
              FREEWILL
            </div>

            <div className="transition-subtitle">
              HUMAN EMPOWERMENT
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          STYLES
      ========================================== */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .register-page {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(26,120,125,.18),
              transparent 36%
            ),
            linear-gradient(
              145deg,
              #02090d 0%,
              #03151b 45%,
              #021015 100%
            );

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =====================================
           BACKGROUND
        ====================================== */

        .ocean-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .stars {
          position: absolute;
          inset: 0;
          opacity: .35;

          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.75) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,.35) 1px,
              transparent 1px
            );

          background-size:
            100px 100px,
            160px 160px;

          background-position:
            20px 30px,
            70px 90px;
        }

        /* =====================================
           PARTICLES
        ====================================== */

        .healing-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          perspective: 700px;
        }

        .particle {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 30% 30%,
              rgba(225,255,246,1),
              rgba(105,226,204,.75)
            );

          box-shadow:
            0 0 7px
            rgba(88,224,202,.65),

            0 0 18px
            rgba(75,194,178,.22);

          animation:
            healingParticle
            linear
            infinite;
        }

        .p1 { left:5%; bottom:-10px; animation-duration:13s; }
        .p2 { left:11%; bottom:-20px; animation-duration:17s; animation-delay:-5s; transform:scale(.55); }
        .p3 { left:18%; bottom:-10px; animation-duration:15s; animation-delay:-8s; }
        .p4 { left:26%; bottom:-20px; animation-duration:19s; animation-delay:-11s; transform:scale(.65); }
        .p5 { left:33%; bottom:-10px; animation-duration:14s; animation-delay:-4s; }
        .p6 { left:40%; bottom:-20px; animation-duration:18s; animation-delay:-13s; transform:scale(.55); }
        .p7 { left:47%; bottom:-10px; animation-duration:16s; animation-delay:-7s; }
        .p8 { left:54%; bottom:-20px; animation-duration:20s; animation-delay:-15s; transform:scale(.65); }
        .p9 { left:61%; bottom:-10px; animation-duration:15s; animation-delay:-6s; }
        .p10 { left:68%; bottom:-20px; animation-duration:18s; animation-delay:-10s; transform:scale(.55); }
        .p11 { left:75%; bottom:-10px; animation-duration:14s; animation-delay:-3s; }
        .p12 { left:82%; bottom:-20px; animation-duration:21s; animation-delay:-16s; transform:scale(.65); }
        .p13 { left:89%; bottom:-10px; animation-duration:17s; animation-delay:-9s; }
        .p14 { left:95%; bottom:-20px; animation-duration:15s; animation-delay:-5s; transform:scale(.55); }
        .p15 { left:22%; bottom:-20px; animation-duration:22s; animation-delay:-18s; transform:scale(.45); }
        .p16 { left:44%; bottom:-10px; animation-duration:19s; animation-delay:-14s; transform:scale(.5); }
        .p17 { left:57%; bottom:-20px; animation-duration:23s; animation-delay:-19s; transform:scale(.45); }
        .p18 { left:73%; bottom:-10px; animation-duration:20s; animation-delay:-12s; transform:scale(.5); }
        .p19 { left:84%; bottom:-20px; animation-duration:24s; animation-delay:-20s; transform:scale(.45); }
        .p20 { left:38%; bottom:-10px; animation-duration:18s; animation-delay:-9s; transform:scale(.4); }

        @keyframes healingParticle {
          0% {
            transform:
              translate3d(0,0,0)
              scale(.45);
            opacity:0;
          }

          12% {
            opacity:.65;
          }

          30% {
            transform:
              translate3d(24px,-28vh,70px)
              scale(1);
          }

          55% {
            transform:
              translate3d(-18px,-57vh,20px)
              scale(.8);
          }

          78% {
            transform:
              translate3d(30px,-82vh,-40px)
              scale(.6);
          }

          100% {
            transform:
              translate3d(-10px,-112vh,-80px)
              scale(.2);

            opacity:0;
          }
        }

        /* =====================================
           STREAMS
        ====================================== */

        .healing-stream {
          position:absolute;

          width:2px;
          height:60%;

          top:110%;

          border-radius:50%;

          background:
            linear-gradient(
              to top,
              transparent,
              rgba(96,225,204,.28),
              transparent
            );

          filter:blur(1px);

          animation:
            streamFlow
            13s
            ease-in-out
            infinite;
        }

        .stream-one { left:14%; }
        .stream-two { left:37%; animation-delay:-5s; }
        .stream-three { left:65%; animation-delay:-9s; }
        .stream-four { left:88%; animation-delay:-3s; }

        @keyframes streamFlow {
          0% {
            transform:
              translateY(0)
              rotate(-8deg);
            opacity:0;
          }

          20% {
            opacity:.35;
          }

          65% {
            opacity:.18;
          }

          100% {
            transform:
              translateY(-145vh)
              rotate(8deg);
            opacity:0;
          }
        }

        /* =====================================
           AMBIENT
        ====================================== */

        .ambient {
          position:absolute;
          border-radius:50%;
          filter:blur(90px);
          opacity:.16;
        }

        .ambient-one {
          width:320px;
          height:320px;
          top:-140px;
          left:-120px;
          background:#0b8e89;
        }

        .ambient-two {
          width:360px;
          height:360px;
          right:-170px;
          bottom:-170px;
          background:#1c5573;
        }

        .ambient-three {
          width:260px;
          height:260px;
          left:45%;
          top:28%;
          background:#42a996;
          opacity:.045;
        }

        /* =====================================
           WAVES
        ====================================== */

        .wave {
          position:absolute;

          width:180%;
          left:-40%;

          border-radius:50%;

          transform:rotate(-4deg);

          border:
            1px solid
            rgba(110,224,209,.08);

          box-shadow:
            0 0 70px
            rgba(46,185,177,.05);
        }

        .wave-one {
          height:280px;
          bottom:-180px;
        }

        .wave-two {
          height:390px;
          bottom:-270px;
        }

        .wave-three {
          height:520px;
          bottom:-380px;
        }

        /* =====================================
           CONTAINER
        ====================================== */

        .register-container {
          width:100%;
          max-width:460px;

          padding:
            24px
            18px;

          position:relative;
          z-index:10;

          transition:
            transform .75s cubic-bezier(.22,.8,.2,1),
            opacity .65s ease,
            filter .65s ease;
        }

        .page-transitioning .register-container {
          transform:
            translateY(-20px)
            scale(.94);

          opacity:0;

          filter:
            blur(8px);
        }

        /* =====================================
           CARD
        ====================================== */

        .register-card {
          position:relative;

          width:100%;

          padding:
            32px
            36px
            27px;

          border-radius:28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.105),
              rgba(255,255,255,.035)
            );

          border:
            1px solid
            rgba(255,255,255,.13);

          backdrop-filter:blur(28px);
          -webkit-backdrop-filter:blur(28px);

          box-shadow:
            0 35px 90px
            rgba(0,0,0,.55),

            inset
            0 1px 0
            rgba(255,255,255,.10);

          animation:
            cardEnter
            .8s
            ease-out;
        }

        @keyframes cardEnter {
          from {
            opacity:0;
            transform:
              translateY(30px)
              scale(.97);
          }

          to {
            opacity:1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        /* =====================================
           LOGO
        ====================================== */

        .logo-section {
          text-align:center;
          margin-bottom:19px;
        }

        .logo-circle {
          width:48px;
          height:48px;

          margin:
            0
            auto
            10px;

          border-radius:16px;

          display:flex;
          align-items:center;
          justify-content:center;

          background:
            linear-gradient(
              145deg,
              rgba(70,194,177,.35),
              rgba(204,171,80,.20)
            );

          border:
            1px solid
            rgba(255,255,255,.16);

          box-shadow:
            0 8px 25px
            rgba(0,0,0,.3),

            inset
            0 1px 0
            rgba(255,255,255,.15);
        }

        .logo-circle span {
          font-size:22px;
          font-weight:700;
          color:#d8c276;
        }

        .logo-section h1 {
          margin:0;
          font-size:23px;
          letter-spacing:4px;
          font-weight:700;
        }

        .logo-section p {
          margin:4px 0 0;
          color:rgba(255,255,255,.52);
          font-size:10px;
          letter-spacing:2px;
          text-transform:uppercase;
        }

        /* =====================================
           WELCOME
        ====================================== */

        .welcome-text {
          text-align:center;
          margin-bottom:21px;
        }

        .welcome-text h2 {
          margin:0 0 6px;
          font-size:22px;
          font-weight:600;
        }

        .welcome-text p {
          margin:0;
          color:rgba(255,255,255,.53);
          font-size:12px;
          line-height:1.55;
        }

        /* =====================================
           INPUT
        ====================================== */

        .input-group {
          margin-bottom:13px;
        }

        .input-group label {
          display:block;
          margin-bottom:6px;

          font-size:11px;
          color:rgba(255,255,255,.62);
          font-weight:500;
        }

        .input-wrapper {
          position:relative;
        }

        .input-icon {
          position:absolute;

          left:14px;
          top:50%;

          transform:
            translateY(-50%);

          opacity:.48;
          font-size:13px;
          z-index:2;
        }

        .input-wrapper input {
          width:100%;
          height:46px;

          padding:
            0
            14px
            0
            41px;

          border-radius:13px;

          border:
            1px solid
            rgba(255,255,255,.10);

          background:
            rgba(0,0,0,.20);

          color:white;

          outline:none;
          font-size:13px;

          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .input-wrapper input::placeholder {
          color:rgba(255,255,255,.30);
        }

        .input-wrapper input:disabled {
          opacity:.7;
        }

        .input-focused
        .input-wrapper
        input {
          border-color:
            rgba(92,206,193,.55);

          background:
            rgba(20,90,94,.12);

          box-shadow:
            0 0 0 3px
            rgba(76,184,174,.07),

            0 8px 20px
            rgba(0,0,0,.14);
        }

        /* =====================================
           BUTTON
        ====================================== */

        .register-button {
          width:100%;
          height:50px;

          border:0;
          border-radius:15px;

          cursor:pointer;

          color:#071113;

          font-size:13px;
          font-weight:700;
          letter-spacing:.2px;

          background:
            linear-gradient(
              135deg,
              #b9d9c8,
              #d9c57a
            );

          box-shadow:
            0 10px 28px
            rgba(72,153,137,.18),

            inset
            0 1px 0
            rgba(255,255,255,.6);

          transition:
            transform .2s ease,
            box-shadow .2s ease;

          display:flex;
          align-items:center;
          justify-content:center;

          gap:10px;

          position:relative;
          overflow:hidden;

          margin-top:17px;
        }

        .register-button:hover {
          transform:translateY(-2px);

          box-shadow:
            0 14px 34px
            rgba(72,153,137,.25),

            inset
            0 1px 0
            rgba(255,255,255,.6);
        }

        .register-button:disabled {
          cursor:not-allowed;
          transform:none;
        }

        .arrow {
          font-size:18px;
        }

        /* =====================================
           LOADING
        ====================================== */

        .button-loading-state {
          background:
            linear-gradient(
              135deg,
              #123f49,
              #236d70
            );

          color:white;

          box-shadow:
            0 10px 30px
            rgba(43,155,145,.28);
        }

        .fluid-container {
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
        }

        .fluid-wave {
          position:absolute;

          width:180%;
          height:160%;

          left:-40%;
          bottom:-136%;

          border-radius:
            45%
            55%
            0
            0;

          background:
            linear-gradient(
              180deg,
              rgba(207,241,222,.72),
              rgba(66,171,160,.82)
            );
        }

        .fluid-wave-one {
          animation:
            fluidRise
            3.8s
            ease-in-out
            infinite;
        }

        .fluid-wave-two {
          opacity:.35;

          animation:
            fluidRiseTwo
            4.5s
            ease-in-out
            infinite;

          animation-delay:-.7s;
        }

        .fluid-wave-three {
          opacity:.18;

          animation:
            fluidRiseThree
            5s
            ease-in-out
            infinite;

          animation-delay:-1.2s;
        }

        @keyframes fluidRise {
          0% {
            transform:
              translateX(-7%)
              rotate(0deg);
            bottom:-136%;
          }

          50% {
            transform:
              translateX(7%)
              rotate(2deg);
            bottom:-113%;
          }

          100% {
            transform:
              translateX(-7%)
              rotate(0deg);
            bottom:-136%;
          }
        }

        @keyframes fluidRiseTwo {
          0% {
            transform:
              translateX(7%)
              rotate(0deg);
            bottom:-140%;
          }

          50% {
            transform:
              translateX(-7%)
              rotate(-2deg);
            bottom:-118%;
          }

          100% {
            transform:
              translateX(7%)
              rotate(0deg);
            bottom:-140%;
          }
        }

        @keyframes fluidRiseThree {
          0% {
            transform:
              translateX(-6%)
              rotate(1deg);
            bottom:-144%;
          }

          50% {
            transform:
              translateX(6%)
              rotate(-1deg);
            bottom:-121%;
          }

          100% {
            transform:
              translateX(-6%)
              rotate(1deg);
            bottom:-144%;
          }
        }

        /* =====================================
           RUNNER
        ====================================== */

        .runner {
          position:absolute;

          left:5%;
          bottom:8px;

          width:22px;
          height:28px;

          z-index:30;

          animation:
            runnerMove
            6.5s
            linear
            infinite;
        }

        @keyframes runnerMove {
          0% {
            left:5%;
            transform:
              translateY(0)
              scale(.88);
          }

          20% {
            transform:
              translateY(-1px)
              scale(.92);
          }

          40% {
            left:35%;
            transform:
              translateY(0)
              scale(.88);
          }

          60% {
            left:57%;
            transform:
              translateY(-1px)
              scale(.92);
          }

          80% {
            left:78%;
            transform:
              translateY(0)
              scale(.88);
          }

          100% {
            left:96%;
            transform:
              translateY(-1px)
              scale(.92);
          }
        }

        .runner-glow {
          position:absolute;

          width:25px;
          height:25px;

          left:-2px;
          top:2px;

          border-radius:50%;

          background:
            rgba(214,255,239,.30);

          filter:blur(7px);

          animation:
            runnerGlow
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes runnerGlow {
          0%,100% {
            opacity:.4;
            transform:scale(.75);
          }

          50% {
            opacity:.95;
            transform:scale(1.12);
          }
        }

        .runner-body {
          position:absolute;

          left:7px;
          top:8px;

          width:9px;
          height:14px;

          border-radius:5px;

          background:
            linear-gradient(
              145deg,
              #f0fff9,
              #7fb6aa
            );

          box-shadow:
            inset
            2px
            2px
            3px
            rgba(255,255,255,.45),

            inset
            -2px
            -2px
            3px
            rgba(0,0,0,.20);
        }

        .runner-head {
          position:absolute;

          width:8px;
          height:8px;

          top:-6px;
          left:.5px;

          border-radius:50%;

          background:
            linear-gradient(
              145deg,
              #f4fff9,
              #9fc8bd
            );

          box-shadow:
            0 0 5px
            rgba(201,255,238,.45);
        }

        .runner-core {
          position:absolute;

          width:4px;
          height:5px;

          left:2.5px;
          top:4px;

          border-radius:50%;

          background:
            rgba(74,183,166,.65);

          box-shadow:
            0 0 5px
            rgba(93,225,202,.75);
        }

        .runner-leg {
          position:absolute;

          width:2px;
          height:7px;

          top:20px;

          border-radius:3px;

          background:#9fc2ba;

          transform-origin:top center;
        }

        .runner-leg-one {
          left:8px;

          animation:
            legOne
            .42s
            ease-in-out
            infinite
            alternate;
        }

        .runner-leg-two {
          left:13px;

          animation:
            legTwo
            .42s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes legOne {
          from {
            transform:rotate(32deg);
          }

          to {
            transform:rotate(-32deg);
          }
        }

        @keyframes legTwo {
          from {
            transform:rotate(-32deg);
          }

          to {
            transform:rotate(32deg);
          }
        }

        .runner-arm {
          position:absolute;

          width:2px;
          height:7px;

          top:11px;

          border-radius:3px;

          background:#a7c8c0;

          transform-origin:top center;
        }

        .runner-arm-one {
          left:5px;

          animation:
            armOne
            .42s
            ease-in-out
            infinite
            alternate;
        }

        .runner-arm-two {
          left:16px;

          animation:
            armTwo
            .42s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes armOne {
          from {
            transform:rotate(35deg);
          }

          to {
            transform:rotate(-35deg);
          }
        }

        @keyframes armTwo {
          from {
            transform:rotate(-35deg);
          }

          to {
            transform:rotate(35deg);
          }
        }

        .creating-text {
          position:relative;
          z-index:40;

          color:white;
          font-weight:700;

          text-shadow:
            0 1px 6px
            rgba(0,0,0,.55);

          animation:
            creatingPulse
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes creatingPulse {
          0%,100% {
            opacity:.72;
          }

          50% {
            opacity:1;
          }
        }

        /* =====================================
           LOGIN
        ====================================== */

        .login-section {
          text-align:center;

          margin-top:19px;

          font-size:11px;

          color:
            rgba(255,255,255,.40);
        }

        .login-section a {
          margin-left:5px;

          color:#b9d9c8;

          text-decoration:none;
          font-weight:600;
        }

        .login-section a:hover {
          text-decoration:underline;
        }

        .security-text {
          display:flex;

          justify-content:center;
          align-items:center;

          gap:6px;

          margin-top:15px;

          color:
            rgba(255,255,255,.25);

          font-size:8px;
        }

        /* =====================================
           PREMIUM TRANSITION OVERLAY
        ====================================== */

        .transition-overlay {
          position:fixed;

          inset:0;

          z-index:9999;

          overflow:hidden;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(37,157,148,.20),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #010608,
              #03151a,
              #020b10
            );

          perspective:1200px;

          animation:
            overlayEnter
            1.15s
            cubic-bezier(.2,.8,.2,1)
            forwards;
        }

        @keyframes overlayEnter {
          0% {
            opacity:0;
          }

          12% {
            opacity:1;
          }

          100% {
            opacity:1;
          }
        }

        /* =====================================
           3D DEPTH
        ====================================== */

        .transition-depth {
          position:absolute;

          inset:-20%;

          background:
            radial-gradient(
              ellipse at center,
              rgba(75,210,193,.14),
              transparent 26%
            );

          transform:
            translateZ(-300px)
            scale(1.3);

          animation:
            depthZoom
            1.15s
            cubic-bezier(.15,.75,.2,1)
            forwards;
        }

        @keyframes depthZoom {
          from {
            transform:
              translateZ(-700px)
              scale(.65);

            opacity:0;
          }

          to {
            transform:
              translateZ(0)
              scale(1.2);

            opacity:1;
          }
        }

        /* =====================================
           TRANSITION PARTICLES
        ====================================== */

        .transition-particles {
          position:absolute;
          inset:0;

          transform-style:preserve-3d;
        }

        .tp {
          position:absolute;

          width:5px;
          height:5px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(235,255,249,1),
              rgba(67,204,187,.25)
            );

          box-shadow:
            0 0 10px
            rgba(83,229,208,.85);

          animation:
            transitionParticle
            1.05s
            ease-in
            forwards;
        }

        .tp1 { left:8%; top:80%; }
        .tp2 { left:15%; top:62%; animation-delay:.03s; }
        .tp3 { left:22%; top:76%; animation-delay:.06s; }
        .tp4 { left:31%; top:58%; animation-delay:.02s; }
        .tp5 { left:39%; top:82%; animation-delay:.08s; }
        .tp6 { left:47%; top:68%; animation-delay:.04s; }
        .tp7 { left:54%; top:78%; animation-delay:.10s; }
        .tp8 { left:62%; top:60%; animation-delay:.05s; }
        .tp9 { left:70%; top:82%; animation-delay:.12s; }
        .tp10 { left:78%; top:64%; animation-delay:.07s; }
        .tp11 { left:86%; top:76%; animation-delay:.09s; }
        .tp12 { left:93%; top:55%; animation-delay:.14s; }
        .tp13 { left:18%; top:42%; animation-delay:.11s; }
        .tp14 { left:82%; top:40%; animation-delay:.13s; }
        .tp15 { left:50%; top:25%; animation-delay:.16s; }

        @keyframes transitionParticle {
          0% {
            opacity:0;
            transform:
              translate3d(
                0,
                80px,
                -500px
              )
              scale(.3);
          }

          35% {
            opacity:1;
          }

          100% {
            opacity:0;

            transform:
              translate3d(
                0,
                -80px,
                650px
              )
              scale(2.5);
          }
        }

        /* =====================================
           HEALING CORE
        ====================================== */

        .healing-core {
          position:absolute;

          left:50%;
          top:50%;

          width:180px;
          height:180px;

          transform:
            translate(-50%,-50%);

          transform-style:preserve-3d;

          animation:
            coreZoom
            1.15s
            cubic-bezier(.15,.8,.2,1)
            forwards;
        }

        .core-light {
          position:absolute;

          left:50%;
          top:50%;

          width:38px;
          height:38px;

          transform:
            translate(-50%,-50%);

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              #effff8 0%,
              #8ce7d0 30%,
              rgba(66,185,166,.15) 70%,
              transparent 100%
            );

          box-shadow:
            0 0 25px
            rgba(137,244,219,.9),

            0 0 80px
            rgba(66,202,180,.6),

            0 0 150px
            rgba(40,166,153,.28);
        }

        .core-ring {
          position:absolute;

          left:50%;
          top:50%;

          border-radius:50%;

          border:
            1px solid
            rgba(151,244,224,.55);

          transform:
            translate(-50%,-50%);

          box-shadow:
            0 0 25px
            rgba(71,210,188,.18);
        }

        .ring-one {
          width:70px;
          height:70px;

          animation:
            ringPulse
            .8s
            ease-out
            forwards;
        }

        .ring-two {
          width:120px;
          height:120px;

          animation:
            ringPulse
            .95s
            ease-out
            forwards;
        }

        .ring-three {
          width:180px;
          height:180px;

          animation:
            ringPulse
            1.1s
            ease-out
            forwards;
        }

        @keyframes ringPulse {
          0% {
            opacity:0;
            transform:
              translate(-50%,-50%)
              scale(.2);
          }

          45% {
            opacity:1;
          }

          100% {
            opacity:0;

            transform:
              translate(-50%,-50%)
              scale(2.3);
          }
        }

        @keyframes coreZoom {
          0% {
            transform:
              translate(-50%,-50%)
              scale(.2)
              translateZ(-600px);

            opacity:0;
          }

          35% {
            opacity:1;
          }

          100% {
            transform:
              translate(-50%,-50%)
              scale(1.35)
              translateZ(400px);

            opacity:.95;
          }
        }

        /* =====================================
           3D OCEAN WAVES
        ====================================== */

        .transition-wave {
          position:absolute;

          width:180vw;
          height:80vh;

          left:-40vw;

          border-radius:
            48%
            52%
            0
            0;

          background:
            linear-gradient(
              180deg,
              rgba(65,185,173,.08),
              rgba(12,93,100,.45),
              rgba(2,20,27,.96)
            );

          border-top:
            1px solid
            rgba(137,240,221,.28);

          box-shadow:
            0 -20px 80px
            rgba(64,209,190,.10);

          transform-origin:center bottom;

          transform:
            rotateX(68deg)
            translateY(90vh)
            translateZ(-200px)
            scale(.8);

          animation:
            waveSweep
            1.1s
            cubic-bezier(.12,.75,.18,1)
            forwards;
        }

        .tw-one {
          bottom:-35vh;
          animation-delay:.04s;
        }

        .tw-two {
          bottom:-42vh;

          opacity:.75;

          animation-delay:.10s;
        }

        .tw-three {
          bottom:-49vh;

          opacity:.48;

          animation-delay:.16s;
        }

        .tw-four {
          bottom:-56vh;

          opacity:.28;

          animation-delay:.22s;
        }

        @keyframes waveSweep {
          0% {
            transform:
              rotateX(68deg)
              translateY(90vh)
              translateZ(-500px)
              scale(.65);
          }

          35% {
            transform:
              rotateX(48deg)
              translateY(25vh)
              translateZ(0)
              scale(1);
          }

          68% {
            transform:
              rotateX(22deg)
              translateY(-8vh)
              translateZ(220px)
              scale(1.15);
          }

          100% {
            transform:
              rotateX(0deg)
              translateY(-105vh)
              translateZ(500px)
              scale(1.5);
          }
        }

        /* =====================================
           LIGHT SWEEP
        ====================================== */

        .light-sweep {
          position:absolute;

          top:-20%;
          left:-30%;

          width:35%;
          height:140%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(218,255,246,.22),
              rgba(117,231,211,.08),
              transparent
            );

          filter:blur(18px);

          transform:
            skewX(-15deg)
            translateX(-100vw);

          animation:
            lightSweep
            1.05s
            cubic-bezier(.2,.7,.2,1)
            .18s
            forwards;
        }

        @keyframes lightSweep {
          0% {
            transform:
              skewX(-15deg)
              translateX(-100vw);
          }

          100% {
            transform:
              skewX(-15deg)
              translateX(430vw);
          }
        }

        /* =====================================
           TRANSITION BRAND
        ====================================== */

        .transition-brand {
          position:absolute;

          left:50%;
          top:50%;

          transform:
            translate(-50%,-50%)
            translateZ(200px);

          text-align:center;

          z-index:50;

          animation:
            brandReveal
            1.05s
            ease-out
            forwards;
        }

        .transition-logo {
          width:52px;
          height:52px;

          margin:0 auto 13px;

          display:flex;
          align-items:center;
          justify-content:center;

          border-radius:17px;

          border:
            1px solid
            rgba(218,255,246,.35);

          background:
            linear-gradient(
              145deg,
              rgba(97,218,199,.28),
              rgba(214,193,116,.18)
            );

          color:#e6fff7;

          font-size:24px;
          font-weight:700;

          box-shadow:
            0 0 35px
            rgba(75,209,189,.25);
        }

        .transition-title {
          font-size:25px;

          letter-spacing:6px;

          font-weight:700;

          color:#effff9;

          text-shadow:
            0 0 25px
            rgba(112,235,213,.38);
        }

        .transition-subtitle {
          margin-top:5px;

          font-size:8px;

          letter-spacing:3px;

          color:
            rgba(225,255,248,.55);
        }

        @keyframes brandReveal {
          0% {
            opacity:0;

            transform:
              translate(-50%,-50%)
              translateZ(-600px)
              scale(.4);

            filter:blur(10px);
          }

          40% {
            opacity:1;
          }

          100% {
            opacity:0;

            transform:
              translate(-50%,-50%)
              translateZ(600px)
              scale(1.35);

            filter:blur(1px);
          }
        }

        /* =====================================
           MOBILE
        ====================================== */

        @media (max-width:520px) {
          .register-container {
            max-width:430px;
            padding:
              18px
              13px;
          }

          .register-card {
            padding:
              28px
              23px
              24px;

            border-radius:24px;
          }

          .welcome-text h2 {
            font-size:21px;
          }

          .input-wrapper input {
            height:45px;
          }

          .register-button {
            height:49px;
          }

          .transition-title {
            font-size:22px;
            letter-spacing:5px;
          }
        }

        @media (max-height:720px) {
          .register-card {
            padding-top:22px;
          }

          .logo-section {
            margin-bottom:13px;
          }

          .welcome-text {
            margin-bottom:15px;
          }

          .input-group {
            margin-bottom:9px;
          }

          .register-button {
            margin-top:12px;
          }

          .login-section {
            margin-top:14px;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .transition-overlay,
          .transition-wave,
          .transition-particles,
          .healing-core,
          .transition-brand {
            animation-duration:.5s !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
