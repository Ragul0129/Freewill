import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type FocusedField = "email" | "password" | null;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const passwordMode =
    focusedField === "password" || password.length > 0;

  const emailMode =
    focusedField === "email" || email.length > 0;

  const particles = useMemo(() => {
    return Array.from({ length: 34 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${1 + Math.random() * 3}px`,
      opacity: 0.2 + Math.random() * 0.55,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.user) {
        setErrorMessage("Unable to sign in. Please try again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile error:", profileError);
      }

      setSuccessMessage("Welcome back to FREEWILL ✦");

      setTimeout(() => {
        if (profile?.role === "admin") {
          navigate("/admin-dashboard");
        } else if (profile?.role === "expert") {
          navigate("/expert-dashboard");
        } else {
          navigate("/home");
        }
      }, 700);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`freewill-login ${
        passwordMode ? "password-active" : ""
      } ${emailMode ? "email-active" : ""}`}
      onClick={() => {
        if (!loading) {
          setErrorMessage("");
        }
      }}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="ocean-background">
        <div className="moon-glow" />
        <div className="ambient-light ambient-one" />
        <div className="ambient-light ambient-two" />
        <div className="ambient-light ambient-three" />

        <div className="stars">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="star"
              style={{
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>

        <div className="wave wave-back" />
        <div className="wave wave-middle" />
        <div className="wave wave-front" />

        <div className="water-reflection" />
      </div>

      {/* =========================================================
          TOP BRAND
      ========================================================= */}

      <div className="top-brand">
        <div className="brand-symbol">
          F
        </div>

        <div>
          <div className="brand-name">FREEWILL</div>
          <div className="brand-subtitle">HUMAN EMPOWERMENT</div>
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="login-stage">

        {/* =====================================================
            3D HUSKY
        ===================================================== */}

        <div
          className={`husky-wrapper ${
            passwordMode ? "husky-sleep" : ""
          }`}
          style={{
            transform: `
              perspective(1000px)
              rotateY(${mouse.x * 8}deg)
              rotateX(${mouse.y * -5}deg)
              translateY(${passwordMode ? 8 : 0}px)
            `,
          }}
        >
          <div className="husky-shadow" />

          <div className="husky">

            {/* Back ears */}
            <div className="ear ear-left">
              <div className="ear-inner" />
            </div>

            <div className="ear ear-right">
              <div className="ear-inner" />
            </div>

            {/* Head */}
            <div className="husky-head">

              {/* forehead highlight */}
              <div className="forehead-light" />

              {/* White face stripe */}
              <div className="face-stripe" />

              {/* Left eye */}
              <div className="husky-eye eye-left">
                <div className="eye-white">
                  <div
                    className="pupil"
                    style={{
                      transform:
                        passwordMode
                          ? "translate(-50%, -50%) scaleY(0.08)"
                          : `translate(
                              calc(-50% + ${mouse.x * 5}px),
                              calc(-50% + ${mouse.y * 3}px)
                            )`,
                    }}
                  />
                </div>

                <div className="eyelid" />
              </div>

              {/* Right eye */}
              <div className="husky-eye eye-right">
                <div className="eye-white">
                  <div
                    className="pupil"
                    style={{
                      transform:
                        passwordMode
                          ? "translate(-50%, -50%) scaleY(0.08)"
                          : `translate(
                              calc(-50% + ${mouse.x * 5}px),
                              calc(-50% + ${mouse.y * 3}px)
                            )`,
                    }}
                  />
                </div>

                <div className="eyelid" />
              </div>

              {/* Nose */}
              <div className="husky-nose">
                <div className="nose-shine" />
              </div>

              {/* Muzzle */}
              <div className="muzzle muzzle-left" />
              <div className="muzzle muzzle-right" />

              {/* Mouth */}
              <div className="mouth">
                <span />
              </div>

              {/* Cheeks */}
              <div className="cheek cheek-left" />
              <div className="cheek cheek-right" />
            </div>

            {/* Neck */}
            <div className="husky-neck" />

            {/* Body */}
            <div className="husky-body">
              <div className="body-highlight" />

              {/* Collar */}
              <div className="husky-collar">
                <div className="collar-tag">F</div>
              </div>
            </div>

            {/* Floating glow */}
            <div className="husky-aura" />
          </div>

          {/* 3D floating label */}
          <div className="husky-label">
            <span className="label-dot" />
            <span>
              {passwordMode
                ? "Privacy mode"
                : emailMode
                ? "I'm listening..."
                : "Welcome back"}
            </span>
          </div>
        </div>

        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div
          className="login-card"
          onClick={(event) => event.stopPropagation()}
          style={{
            transform: `
              perspective(1400px)
              rotateY(${mouse.x * -2.5}deg)
              rotateX(${mouse.y * 1.5}deg)
            `,
          }}
        >
          <div className="glass-shine" />

          <div className="card-content">

            <div className="welcome-text">
              <span className="small-line">
                YOUR SPACE • YOUR JOURNEY
              </span>

              <h1>
                Welcome
                <br />
                <span>back.</span>
              </h1>

              <p>
                Continue your journey towards
                <br />
                a calmer and stronger self.
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}

              <div
                className={`field ${
                  focusedField === "email"
                    ? "field-focused"
                    : ""
                }`}
              >
                <div className="field-icon">
                  @
                </div>

                <div className="field-body">
                  <label>Email address</label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    onFocus={() => {
                      setFocusedField("email");
                      setErrorMessage("");
                    }}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="field-glow" />
              </div>

              {/* Password */}

              <div
                className={`field ${
                  focusedField === "password"
                    ? "field-focused"
                    : ""
                }`}
              >
                <div className="field-icon password-icon">
                  •••
                </div>

                <div className="field-body">
                  <label>Password</label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    onFocus={() => {
                      setFocusedField("password");
                      setErrorMessage("");
                    }}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>

                <div className="field-glow" />
              </div>

              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span className="custom-checkbox">
                    ✓
                  </span>
                  Remember me
                </label>

                <button
                  type="button"
                  className="forgot"
                  onClick={() => {
                    alert(
                      "Please contact FREEWILL support to reset your password."
                    );
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Error */}

              {errorMessage && (
                <div className="message error-message">
                  <span>!</span>
                  {errorMessage}
                </div>
              )}

              {/* Success */}

              {successMessage && (
                <div className="message success-message">
                  <span>✓</span>
                  {successMessage}
                </div>
              )}

              {/* Login button */}

              <button
                type="submit"
                className={`login-button ${
                  loading ? "button-loading" : ""
                }`}
                disabled={loading}
              >
                <span className="button-text">
                  {loading
                    ? "Entering your space..."
                    : "Enter FREEWILL"}
                </span>

                {!loading && (
                  <span className="button-arrow">
                    →
                  </span>
                )}

                {loading && (
                  <span className="spinner" />
                )}
              </button>
            </form>

            <div className="register-area">
              <span>New to FREEWILL?</span>

              <Link to="/register">
                Create your account
                <span className="register-arrow">
                  ↗
                </span>
              </Link>
            </div>

            <div className="security-note">
              <span className="lock-icon">⌁</span>
              Your personal space is protected
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <div className="login-footer">
        <span>© FREEWILL Human Empowerment</span>

        <span className="footer-divider">•</span>

        <span>Understand Yourself · Empower Your Mind</span>
      </div>

      {/* =========================================================
          STYLES
      ========================================================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .freewill-login {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          color: white;
          background:
            radial-gradient(
              circle at 50% 25%,
              rgba(38, 108, 122, 0.24),
              transparent 32%
            ),
            linear-gradient(
              180deg,
              #02070c 0%,
              #03131b 42%,
              #021016 100%
            );
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* ================================
           OCEAN
        ================================= */

        .ocean-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .moon-glow {
          position: absolute;
          width: 430px;
          height: 430px;
          left: 50%;
          top: -260px;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(176, 240, 246, 0.18) 0%,
              rgba(58, 174, 190, 0.08) 38%,
              transparent 70%
            );
          filter: blur(10px);
        }

        .ambient-light {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: ambientFloat 9s ease-in-out infinite alternate;
        }

        .ambient-one {
          width: 320px;
          height: 320px;
          left: -120px;
          top: 20%;
          background: #0e6575;
        }

        .ambient-two {
          width: 380px;
          height: 380px;
          right: -160px;
          top: 40%;
          background: #125e70;
          animation-delay: 2s;
        }

        .ambient-three {
          width: 300px;
          height: 300px;
          left: 40%;
          bottom: -200px;
          background: #0d4e5c;
          animation-delay: 4s;
        }

        @keyframes ambientFloat {
          from {
            transform: translate3d(
              -15px,
              -10px,
              0
            );
          }

          to {
            transform: translate3d(
              18px,
              15px,
              0
            );
          }
        }

        /* ================================
           STARS
        ================================= */

        .stars {
          position: absolute;
          inset: 0;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(216, 250, 255, 0.9);
          box-shadow:
            0 0 8px rgba(164, 241, 255, 0.55);
          animation:
            starFloat
            8s
            ease-in-out
            infinite;
        }

        @keyframes starFloat {
          0%,
          100% {
            transform:
              translateY(0)
              scale(0.8);
          }

          50% {
            transform:
              translateY(-25px)
              scale(1.35);
          }
        }

        /* ================================
           WAVES
        ================================= */

        .wave {
          position: absolute;
          left: -10%;
          width: 120%;
          height: 260px;
          bottom: -75px;
          border-radius: 50% 50% 0 0;
          transform-origin: center;
        }

        .wave-back {
          background:
            linear-gradient(
              180deg,
              rgba(29, 122, 137, 0.13),
              rgba(3, 32, 40, 0.9)
            );
          filter: blur(1px);
          animation:
            waveMoveBack
            12s
            ease-in-out
            infinite;
        }

        .wave-middle {
          bottom: -110px;
          background:
            linear-gradient(
              180deg,
              rgba(25, 104, 119, 0.19),
              rgba(2, 24, 31, 0.95)
            );
          animation:
            waveMove
            9s
            ease-in-out
            infinite;
        }

        .wave-front {
          bottom: -155px;
          background:
            linear-gradient(
              180deg,
              rgba(14, 74, 87, 0.28),
              #020b10
            );
          animation:
            waveMoveFront
            14s
            ease-in-out
            infinite;
        }

        @keyframes waveMove {
          0%,
          100% {
            transform:
              translateX(-2%)
              rotate(-1deg);
          }

          50% {
            transform:
              translateX(3%)
              rotate(1deg);
          }
        }

        @keyframes waveMoveBack {
          0%,
          100% {
            transform:
              translateX(2%)
              rotate(1deg);
          }

          50% {
            transform:
              translateX(-3%)
              rotate(-1deg);
          }
        }

        @keyframes waveMoveFront {
          0%,
          100% {
            transform:
              translateX(2%)
              rotate(-1deg);
          }

          50% {
            transform:
              translateX(-2%)
              rotate(1deg);
          }
        }

        .water-reflection {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 38%;
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(3, 29, 36, 0.3),
              rgba(1, 10, 15, 0.95)
            );
        }

        /* ================================
           BRAND
        ================================= */

        .top-brand {
          position: absolute;
          top: 28px;
          left: 34px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 20;
        }

        .brand-symbol {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
          font-size: 21px;
          color: #d9f9f7;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.16),
              rgba(255,255,255,0.035)
            );
          border:
            1px solid rgba(255,255,255,0.17);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 10px 30px rgba(0,0,0,0.25);
          backdrop-filter: blur(15px);
        }

        .brand-name {
          letter-spacing: 4px;
          font-size: 14px;
          font-weight: 700;
        }

        .brand-subtitle {
          margin-top: 2px;
          font-size: 7px;
          letter-spacing: 2.2px;
          color: rgba(211,239,242,0.58);
        }

        /* ================================
           STAGE
        ================================= */

        .login-stage {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 65px;
          padding:
            100px
            50px
            80px;
        }

        /* ================================
           HUSKY
        ================================= */

        .husky-wrapper {
          position: relative;
          width: 355px;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transition:
            transform
            0.35s
            cubic-bezier(.2,.8,.2,1);
          flex-shrink: 0;
        }

        .husky-shadow {
          position: absolute;
          width: 230px;
          height: 55px;
          bottom: 50px;
          left: 50%;
          transform:
            translateX(-50%)
            rotateX(70deg);
          background: rgba(0,0,0,0.65);
          border-radius: 50%;
          filter: blur(22px);
        }

        .husky {
          position: relative;
          width: 245px;
          height: 340px;
          transform-style: preserve-3d;
          animation:
            huskyFloat
            4.8s
            ease-in-out
            infinite;
        }

        @keyframes huskyFloat {
          0%,
          100% {
            transform:
              translateY(0)
              rotateZ(0deg);
          }

          50% {
            transform:
              translateY(-12px)
              rotateZ(0.6deg);
          }
        }

        .husky-aura {
          position: absolute;
          width: 250px;
          height: 250px;
          left: -2px;
          top: 15px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(103, 223, 229, 0.11),
              transparent 68%
            );
          filter: blur(12px);
          animation:
            auraPulse
            3s
            ease-in-out
            infinite;
        }

        @keyframes auraPulse {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.55;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        .husky-head {
          position: absolute;
          z-index: 6;
          width: 205px;
          height: 190px;
          left: 20px;
          top: 35px;
          border-radius:
            46%
            46%
            48%
            48%;
          background:
            linear-gradient(
              145deg,
              #e9edf0 0%,
              #cbd2d6 38%,
              #8b969e 100%
            );
          box-shadow:
            inset 13px 14px 20px rgba(255,255,255,0.42),
            inset -15px -18px 25px rgba(21,31,36,0.4),
            0 24px 40px rgba(0,0,0,0.4);
          transform:
            translateZ(40px);
        }

        .forehead-light {
          position: absolute;
          width: 70px;
          height: 60px;
          left: 68px;
          top: 2px;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,0.55),
              transparent 70%
            );
          filter: blur(8px);
        }

        .face-stripe {
          position: absolute;
          left: 78px;
          top: 8px;
          width: 52px;
          height: 137px;
          background:
            linear-gradient(
              180deg,
              #f8fafb,
              #dce3e5
            );
          clip-path:
            polygon(
              38% 0%,
              72% 0%,
              100% 100%,
              0% 100%
            );
          opacity: 0.95;
        }

        .ear {
          position: absolute;
          z-index: 3;
          width: 100px;
          height: 135px;
          top: 8px;
          background:
            linear-gradient(
              145deg,
              #9aa5ac,
              #303b42
            );
          box-shadow:
            inset 8px 7px 14px rgba(255,255,255,0.18),
            inset -10px -12px 18px rgba(0,0,0,0.5),
            0 18px 30px rgba(0,0,0,0.35);
          clip-path:
            polygon(
              50% 0%,
              100% 85%,
              82% 100%,
              50% 72%,
              18% 100%,
              0% 85%
            );
        }

        .ear-left {
          left: -7px;
          transform:
            rotate(-13deg)
            translateZ(10px);
        }

        .ear-right {
          right: -7px;
          transform:
            rotate(13deg)
            translateZ(10px);
        }

        .ear-inner {
          position: absolute;
          inset: 22px;
          background:
            linear-gradient(
              145deg,
              #4e3038,
              #15191d
            );
          clip-path:
            polygon(
              50% 0%,
              100% 85%,
              50% 67%,
              0% 85%
            );
          opacity: 0.9;
        }

        /* Eyes */

        .husky-eye {
          position: absolute;
          z-index: 10;
          top: 75px;
          width: 58px;
          height: 43px;
          border-radius: 50%;
          background:
            linear-gradient(
              145deg,
              #263238,
              #080c0f
            );
          box-shadow:
            inset 4px 4px 8px rgba(255,255,255,0.12),
            0 6px 12px rgba(0,0,0,0.45);
          overflow: hidden;
        }

        .eye-left {
          left: 27px;
          transform: rotate(-5deg);
        }

        .eye-right {
          right: 27px;
          transform: rotate(5deg);
        }

        .eye-white {
          position: absolute;
          inset: 5px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 48% 42%,
              #e8ffff,
              #b9d5d8 62%,
              #71868b 100%
            );
          overflow: hidden;
        }

        .pupil {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 35% 30%,
              #36434a 0%,
              #050708 55%,
              #000 100%
            );
          transition:
            transform
            0.25s
            ease;
        }

        .pupil::after {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          left: 4px;
          top: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          filter: blur(0.3px);
        }

        .eyelid {
          position: absolute;
          z-index: 12;
          left: -4px;
          right: -4px;
          top: 20px;
          height: 48px;
          border-radius: 50%;
          background:
            linear-gradient(
              180deg,
              #aeb8bd,
              #667279
            );
          transform:
            translateY(-52px);
          transition:
            transform
            0.42s
            cubic-bezier(.65,-0.2,.25,1.2);
        }

        .password-active .eyelid {
          transform:
            translateY(0);
        }

        .password-active .husky-eye {
          animation:
            sleepyBlink
            3s
            ease-in-out
            infinite;
        }

        @keyframes sleepyBlink {
          0%,
          100% {
            transform: scaleY(1);
          }

          50% {
            transform: scaleY(0.88);
          }
        }

        /* Nose */

        .husky-nose {
          position: absolute;
          z-index: 15;
          left: 81px;
          top: 119px;
          width: 43px;
          height: 31px;
          border-radius:
            45%
            45%
            55%
            55%;
          background:
            radial-gradient(
              circle at 35% 25%,
              #65727a,
              #161b1e 55%,
              #030506 100%
            );
          box-shadow:
            inset 5px 5px 7px rgba(255,255,255,0.14),
            0 8px 12px rgba(0,0,0,0.45);
        }

        .nose-shine {
          position: absolute;
          left: 10px;
          top: 5px;
          width: 10px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          filter: blur(1px);
        }

        .muzzle {
          position: absolute;
          z-index: 12;
          width: 64px;
          height: 48px;
          top: 124px;
          border-radius: 50%;
          background:
            linear-gradient(
              145deg,
              #f1f3f4,
              #b7c0c4
            );
          box-shadow:
            inset 5px 5px 8px rgba(255,255,255,0.35),
            inset -5px -7px 9px rgba(50,60,65,0.22);
        }

        .muzzle-left {
          left: 42px;
        }

        .muzzle-right {
          right: 42px;
        }

        .mouth {
          position: absolute;
          z-index: 16;
          left: 84px;
          top: 148px;
          width: 38px;
          height: 25px;
          border-bottom:
            3px solid
            rgba(27,31,33,0.75);
          border-radius: 0 0 50% 50%;
        }

        .mouth span {
          position: absolute;
          width: 17px;
          height: 5px;
          left: 10px;
          bottom: -4px;
          border-radius: 50%;
          background: #73535c;
        }

        .cheek {
          position: absolute;
          width: 45px;
          height: 30px;
          top: 145px;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,0.32),
              transparent
            );
          filter: blur(4px);
        }

        .cheek-left {
          left: 20px;
        }

        .cheek-right {
          right: 20px;
        }

        /* Body */

        .husky-neck {
          position: absolute;
          z-index: 2;
          left: 62px;
          top: 192px;
          width: 122px;
          height: 75px;
          background:
            linear-gradient(
              90deg,
              #5d6870,
              #dfe5e7,
              #667279
            );
          border-radius: 50%;
          filter: drop-shadow(
            0 15px 15px rgba(0,0,0,0.3)
          );
        }

        .husky-body {
          position: absolute;
          z-index: 1;
          left: 35px;
          top: 225px;
          width: 175px;
          height: 125px;
          border-radius:
            48%
            48%
            35%
            35%;
          background:
            linear-gradient(
              145deg,
              #dfe4e6,
              #89949a 45%,
              #3c474d
            );
          box-shadow:
            inset 10px 12px 20px rgba(255,255,255,0.2),
            inset -15px -18px 25px rgba(0,0,0,0.35),
            0 20px 30px rgba(0,0,0,0.4);
        }

        .body-highlight {
          position: absolute;
          left: 42px;
          top: 8px;
          width: 85px;
          height: 65px;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(255,255,255,0.35),
              transparent
            );
          filter: blur(8px);
        }

        .husky-collar {
          position: absolute;
          left: 15px;
          right: 15px;
          top: -3px;
          height: 23px;
          border-radius: 50%;
          background:
            linear-gradient(
              180deg,
              #68d5d4,
              #166b76
            );
          box-shadow:
            0 5px 12px rgba(0,0,0,0.35);
        }

        .collar-tag {
          position: absolute;
          left: 50%;
          top: 9px;
          transform: translateX(-50%);
          width: 27px;
          height: 27px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
          font-size: 14px;
          color: #fff;
          background:
            radial-gradient(
              circle at 35% 30%,
              #f8f3c4,
              #b69d48 60%,
              #69551c
            );
          box-shadow:
            0 5px 12px rgba(0,0,0,0.45);
        }

        .husky-label {
          position: absolute;
          bottom: 17px;
          left: 50%;
          transform: translateX(-50%);
          padding:
            8px
            14px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          font-size: 11px;
          color: rgba(227,248,249,0.72);
          background:
            rgba(4,22,28,0.45);
          border:
            1px solid
            rgba(194,242,244,0.1);
          backdrop-filter: blur(12px);
          box-shadow:
            0 10px 30px rgba(0,0,0,0.25);
        }

        .label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #69d5d1;
          box-shadow:
            0 0 10px #69d5d1;
          animation:
            labelPulse
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes labelPulse {
          0%,
          100% {
            opacity: 0.5;
          }

          50% {
            opacity: 1;
          }
        }

        /* ================================
           LOGIN CARD
        ================================= */

        .login-card {
          position: relative;
          width: 430px;
          max-width: 100%;
          border-radius: 30px;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.13),
              rgba(255,255,255,0.045)
            );
          border:
            1px solid
            rgba(255,255,255,0.14);
          box-shadow:
            0 35px 90px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(255,255,255,0.04);
          backdrop-filter:
            blur(30px)
            saturate(130%);
          -webkit-backdrop-filter:
            blur(30px)
            saturate(130%);
          transition:
            transform
            0.35s
            cubic-bezier(.2,.8,.2,1);
        }

        .glass-shine {
          position: absolute;
          width: 180px;
          height: 420px;
          left: -180px;
          top: -80px;
          transform: rotate(22deg);
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.07),
              transparent
            );
          animation:
            glassShine
            7s
            ease-in-out
            infinite;
        }

        @keyframes glassShine {
          0%,
          55% {
            left: -220px;
          }

          75%,
          100% {
            left: 520px;
          }
        }

        .card-content {
          position: relative;
          z-index: 2;
          padding: 42px 40px 30px;
        }

        .welcome-text {
          margin-bottom: 28px;
        }

        .small-line {
          display: inline-block;
          margin-bottom: 12px;
          font-size: 8px;
          letter-spacing: 2.5px;
          color:
            rgba(171,232,235,0.58);
        }

        .welcome-text h1 {
          margin: 0;
          font-size: 43px;
          line-height: 0.98;
          font-weight: 300;
          letter-spacing: -1.8px;
        }

        .welcome-text h1 span {
          font-weight: 650;
          background:
            linear-gradient(
              90deg,
              #eaffff,
              #8cd8dc
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .welcome-text p {
          margin:
            14px
            0
            0;
          color:
            rgba(218,237,239,0.57);
          font-size: 12px;
          line-height: 1.7;
        }

        /* ================================
           FIELDS
        ================================= */

        .field {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 68px;
          margin-bottom: 13px;
          padding:
            8px
            15px;
          border-radius: 17px;
          background:
            rgba(0,10,15,0.3);
          border:
            1px solid
            rgba(255,255,255,0.075);
          transition:
            all
            0.3s
            ease;
          overflow: hidden;
        }

        .field:hover {
          background:
            rgba(255,255,255,0.045);
          border-color:
            rgba(174,236,238,0.15);
        }

        .field-focused {
          border-color:
            rgba(112,220,222,0.5);
          background:
            rgba(5,37,43,0.42);
          box-shadow:
            0 0 0 3px
            rgba(92,213,215,0.055),
            0 10px 30px
            rgba(0,0,0,0.16);
        }

        .field-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          margin-right: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          color:
            rgba(176,235,237,0.75);
          font-size: 17px;
          background:
            rgba(111,211,215,0.075);
          border:
            1px solid
            rgba(141,228,231,0.09);
        }

        .password-icon {
          font-size: 9px;
          letter-spacing: 1px;
        }

        .field-body {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .field-body label {
          display: block;
          margin-bottom: 3px;
          font-size: 9px;
          letter-spacing: 0.5px;
          color:
            rgba(202,231,233,0.45);
        }

        .field-body input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #efffff;
          font-size: 13px;
          font-weight: 450;
        }

        .field-body input::placeholder {
          color:
            rgba(184,213,216,0.27);
        }

        .field-body input:disabled {
          opacity: 0.6;
        }

        .field-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          right: -50px;
          top: -50px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(89,215,218,0.13),
              transparent 68%
            );
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .field-focused .field-glow {
          opacity: 1;
        }

        /* ================================
           OPTIONS
        ================================= */

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin:
            14px
            2px
            20px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          color:
            rgba(208,230,232,0.47);
          font-size: 10px;
        }

        .remember input {
          display: none;
        }

        .custom-checkbox {
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border:
            1px solid
            rgba(171,226,228,0.2);
          border-radius: 5px;
          font-size: 9px;
          color: transparent;
          background:
            rgba(255,255,255,0.035);
          transition:
            all
            0.2s
            ease;
        }

        .remember input:checked
        + .custom-checkbox {
          color: #dfffff;
          background:
            rgba(77,189,194,0.35);
          border-color:
            rgba(111,224,226,0.6);
        }

        .forgot {
          border: 0;
          background: transparent;
          color:
            rgba(151,224,226,0.7);
          font-size: 10px;
          cursor: pointer;
        }

        .forgot:hover {
          color: #d9ffff;
        }

        /* ================================
           MESSAGES
        ================================= */

        .message {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          padding:
            10px
            12px;
          border-radius: 11px;
          font-size: 10px;
          line-height: 1.4;
        }

        .message span {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .error-message {
          color:
            rgba(255,211,211,0.85);
          background:
            rgba(145,42,52,0.16);
          border:
            1px solid
            rgba(255,103,116,0.14);
        }

        .error-message span {
          background:
            rgba(255,86,100,0.18);
          color:
            #ff9fa7;
        }

        .success-message {
          color:
            rgba(211,255,241,0.9);
          background:
            rgba(30,140,111,0.15);
          border:
            1px solid
            rgba(90,224,187,0.16);
        }

        .success-message span {
          background:
            rgba(90,224,187,0.18);
          color:
            #8effd9;
        }

        /* ================================
           BUTTON
        ================================= */

        .login-button {
          position: relative;
          width: 100%;
          min-height: 56px;
          border: 0;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          color: #031113;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: 0.3px;
          background:
            linear-gradient(
              135deg,
              #d9ffff 0%,
              #91e4e4 48%,
              #5cc3c8 100%
            );
          box-shadow:
            0 15px 35px
            rgba(72,203,208,0.18),
            inset 0 1px 0
            rgba(255,255,255,0.8);
          transition:
            transform
            0.2s
            ease,
            box-shadow
            0.2s
            ease;
        }

        .login-button::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          left: -100px;
          transform: skewX(-20deg);
          background:
            rgba(255,255,255,0.45);
          animation:
            buttonShine
            4s
            ease-in-out
            infinite;
        }

        @keyframes buttonShine {
          0%,
          55% {
            left: -100px;
          }

          80%,
          100% {
            left: 520px;
          }
        }

        .login-button:hover:not(:disabled) {
          transform:
            translateY(-2px)
            scale(1.01);
          box-shadow:
            0 20px 45px
            rgba(72,203,208,0.27),
            inset 0 1px 0
            rgba(255,255,255,0.85);
        }

        .login-button:active:not(:disabled) {
          transform:
            translateY(1px)
            scale(0.99);
        }

        .login-button:disabled {
          cursor: not-allowed;
          opacity: 0.75;
        }

        .button-text {
          position: relative;
          z-index: 2;
        }

        .button-arrow {
          position: absolute;
          right: 19px;
          top: 50%;
          transform:
            translateY(-50%);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #dfffff;
          background:
            rgba(2,25,29,0.2);
          font-size: 18px;
          transition:
            transform
            0.25s
            ease;
        }

        .login-button:hover
        .button-arrow {
          transform:
            translateY(-50%)
            translateX(4px);
        }

        .spinner {
          position: absolute;
          right: 20px;
          top: 50%;
          width: 17px;
          height: 17px;
          transform:
            translateY(-50%);
          border:
            2px solid
            rgba(2,35,39,0.2);
          border-top-color:
            #06373c;
          border-radius: 50%;
          animation:
            spin
            0.75s
            linear
            infinite;
        }

        @keyframes spin {
          to {
            transform:
              translateY(-50%)
              rotate(360deg);
          }
        }

        /* ================================
           REGISTER
        ================================= */

        .register-area {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 24px;
          font-size: 10px;
          color:
            rgba(210,230,232,0.4);
        }

        .register-area a {
          color:
            rgba(167,237,238,0.85);
          text-decoration: none;
          font-weight: 600;
        }

        .register-area a:hover {
          color: #e3ffff;
        }

        .register-arrow {
          display: inline-block;
          margin-left: 3px;
          transition:
            transform
            0.2s
            ease;
        }

        .register-area a:hover
        .register-arrow {
          transform:
            translate(2px,-2px);
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 23px;
          padding-top: 17px;
          border-top:
            1px solid
            rgba(255,255,255,0.06);
          color:
            rgba(202,229,231,0.28);
          font-size: 8px;
          letter-spacing: 0.3px;
        }

        .lock-icon {
          color:
            rgba(120,218,220,0.65);
          font-size: 13px;
        }

        /* ================================
           PASSWORD HUSKY
        ================================= */

        .husky-sleep .husky {
          animation:
            sleepyFloat
            4s
            ease-in-out
            infinite;
        }

        @keyframes sleepyFloat {
          0%,
          100% {
            transform:
              translateY(4px);
          }

          50% {
            transform:
              translateY(11px);
          }
        }

        .husky-sleep .husky-label {
          color:
            rgba(211,244,245,0.55);
        }

        /* ================================
           FOOTER
        ================================= */

        .login-footer {
          position: absolute;
          z-index: 20;
          left: 0;
          right: 0;
          bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color:
            rgba(190,218,220,0.25);
          font-size: 8px;
          letter-spacing: 0.4px;
          text-align: center;
        }

        .footer-divider {
          color:
            rgba(126,213,216,0.45);
        }

        /* ================================
           RESPONSIVE
        ================================= */

        @media (max-width: 950px) {
          .login-stage {
            gap: 20px;
            padding:
              90px
              25px
              70px;
          }

          .husky-wrapper {
            transform:
              scale(0.82);
            margin-right: -30px;
          }

          .login-card {
            width: 410px;
          }
        }

        @media (max-width: 760px) {
          .top-brand {
            top: 20px;
            left: 20px;
          }

          .login-stage {
            min-height: auto;
            padding:
              85px
              18px
              75px;
            flex-direction: column;
            gap: 0;
          }

          .husky-wrapper {
            width: 270px;
            height: 270px;
            transform:
              scale(0.62);
            margin:
              -50px
              0
              -30px;
          }

          .login-card {
            width: 100%;
            max-width: 430px;
            border-radius: 26px;
          }

          .card-content {
            padding:
              31px
              25px
              24px;
          }

          .welcome-text h1 {
            font-size: 38px;
          }

          .welcome-text p br {
            display: none;
          }

          .login-footer {
            bottom: 10px;
            padding: 0 15px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 430px) {
          .top-brand {
            transform:
              scale(0.9);
            transform-origin:
              left top;
          }

          .login-stage {
            padding:
              78px
              12px
              62px;
          }

          .husky-wrapper {
            transform:
              scale(0.55);
            margin:
              -65px
              0
              -55px;
          }

          .login-card {
            border-radius: 23px;
          }

          .card-content {
            padding:
              28px
              20px
              21px;
          }

          .welcome-text h1 {
            font-size: 35px;
          }

          .form-options {
            gap: 10px;
          }

          .forgot {
            font-size: 9px;
          }

          .register-area {
            flex-direction: column;
            gap: 5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave,
          .star,
          .ambient-light,
          .husky,
          .husky-aura,
          .glass-shine,
          .login-button::before,
          .label-dot {
            animation: none !important;
          }

          .login-card,
          .husky-wrapper {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
