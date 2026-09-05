import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const isPasswordFocused =
    focusedField === "password" || password.length > 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error(profileError);
        navigate("/home");
        return;
      }

      if (profile?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (profile?.role === "expert") {
        navigate("/expert-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* =========================
          ANIMATED BACKGROUND
      ========================== */}

      <div className="background-animation">
        <div className="moon-glow" />

        <div className="wind wind-one" />
        <div className="wind wind-two" />
        <div className="wind wind-three" />

        <div className="wave wave-one" />
        <div className="wave wave-two" />
        <div className="wave wave-three" />

        <div className="floating-dot dot-one" />
        <div className="floating-dot dot-two" />
        <div className="floating-dot dot-three" />
        <div className="floating-dot dot-four" />
        <div className="floating-dot dot-five" />
      </div>

      {/* =========================
          BACK TO FREEWILL
      ========================== */}

      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to FREEWILL
      </button>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="login-content">

        {/* =========================
            FOX CHARACTER
        ========================== */}

        <div
          className={`fox-area ${
            focusedField === "email" ? "fox-email-mode" : ""
          } ${isPasswordFocused ? "fox-password-mode" : ""}`}
        >
          <div className="fox-shadow" />

          <div className="fox">

            {/* Ears */}
            <div className="ear ear-left">
              <div className="ear-inner" />
            </div>

            <div className="ear ear-right">
              <div className="ear-inner" />
            </div>

            {/* Head */}
            <div className="fox-head">

              {/* Forehead */}
              <div className="forehead-mark" />

              {/* Left eye */}
              <div
                className={`fox-eye fox-eye-left ${
                  isPasswordFocused ? "eyes-closed" : ""
                }`}
              >
                <span className="eye-white">
                  <span className="pupil" />
                </span>
              </div>

              {/* Right eye */}
              <div
                className={`fox-eye fox-eye-right ${
                  isPasswordFocused ? "eyes-closed" : ""
                }`}
              >
                <span className="eye-white">
                  <span className="pupil" />
                </span>
              </div>

              {/* Email glasses-style focus */}
              <div className="email-look-line" />

              {/* Muzzle */}
              <div className="muzzle muzzle-left" />
              <div className="muzzle muzzle-right" />

              {/* Nose */}
              <div className="fox-nose" />

              {/* Mouth */}
              <div className="fox-mouth">
                <span />
              </div>

              {/* Cheeks */}
              <div className="cheek cheek-left" />
              <div className="cheek cheek-right" />
            </div>

            {/* Body */}
            <div className="fox-body">
              <div className="fox-chest" />
            </div>

            {/* Tiny paws */}
            <div className="fox-paw paw-left" />
            <div className="fox-paw paw-right" />

            {/* Keyboard */}
            <div className="keyboard">
              <div className="keyboard-row">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="keyboard-row">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="keyboard-row">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="keyboard-space" />
            </div>
          </div>
        </div>

        {/* =========================
            LOGIN CARD
        ========================== */}

        <div className="login-card">

          <div className="brand-small">
            FREEWILL <span>•</span> HUMAN EMPOWERMENT
          </div>

          <h1>Welcome Back</h1>

          <p className="subtitle">
            Login to your FREEWILL account
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div
              className={`input-group ${
                focusedField === "email" ? "input-active" : ""
              }`}
            >
              <label>Email Address</label>

              <div className="input-wrapper">
                <div className="input-icon">
                  ✉
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div
              className={`input-group ${
                focusedField === "password" ? "input-active" : ""
              }`}
            >
              <label>Password</label>

              <div className="input-wrapper">
                <div className="input-icon">
                  🔒
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="error-message">
                <span>!</span>
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Login <span className="arrow">→</span>
                </>
              )}
            </button>

          </form>

          <div className="divider" />

          <p className="register-text">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </p>

        </div>

        {/* =========================
            BOTTOM MESSAGE
        ========================== */}

        <div className="bottom-message">
          <span>🌿</span>
          Take a breath. Your wellbeing matters.
          <span>🌊</span>
        </div>

      </div>

      {/* =========================
          ANIMATION CSS
      ========================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #f8f5ee 0%,
              #f5f2e9 55%,
              #eaf4f0 100%
            );
          color: #173f3b;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================
           BACKGROUND
        ========================== */

        .background-animation {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .moon-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          right: -180px;
          top: -160px;
          background:
            radial-gradient(
              circle,
              rgba(204, 166, 75, 0.16) 0%,
              rgba(204, 166, 75, 0.05) 38%,
              transparent 70%
            );
          animation: moonPulse 6s ease-in-out infinite;
        }

        @keyframes moonPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        /* WIND */

        .wind {
          position: absolute;
          width: 240px;
          height: 60px;
          border-top: 2px solid rgba(26, 101, 95, 0.13);
          border-radius: 50%;
          transform: rotate(-7deg);
          animation: windMove 8s linear infinite;
        }

        .wind-one {
          top: 15%;
          left: -260px;
          animation-delay: 0s;
        }

        .wind-two {
          top: 28%;
          left: -330px;
          width: 330px;
          animation-delay: 2.5s;
        }

        .wind-three {
          top: 42%;
          left: -300px;
          width: 280px;
          animation-delay: 5s;
        }

        @keyframes windMove {
          0% {
            transform:
              translateX(0)
              rotate(-7deg);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          80% {
            opacity: 0.6;
          }

          100% {
            transform:
              translateX(calc(100vw + 500px))
              rotate(-7deg);
            opacity: 0;
          }
        }

        /* WAVES */

        .wave {
          position: absolute;
          left: -10%;
          width: 120%;
          height: 150px;
          border-radius: 50%;
          border-top: 2px solid rgba(23, 98, 92, 0.12);
          border-bottom: 1px solid rgba(23, 98, 92, 0.06);
        }

        .wave-one {
          bottom: -85px;
          animation: waveMove 7s ease-in-out infinite;
        }

        .wave-two {
          bottom: -120px;
          animation: waveMove 9s ease-in-out infinite reverse;
          opacity: 0.7;
        }

        .wave-three {
          bottom: -155px;
          animation: waveMove 11s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes waveMove {
          0%,
          100% {
            transform:
              translateX(-2%)
              rotate(1deg);
          }

          50% {
            transform:
              translateX(2%)
              rotate(-1deg);
          }
        }

        /* FLOATING DOTS */

        .floating-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(201, 161, 69, 0.4);
          animation: floating 5s ease-in-out infinite;
        }

        .dot-one {
          top: 18%;
          left: 10%;
        }

        .dot-two {
          top: 32%;
          right: 14%;
          animation-delay: 1s;
        }

        .dot-three {
          top: 60%;
          left: 8%;
          animation-delay: 2s;
        }

        .dot-four {
          top: 72%;
          right: 10%;
          animation-delay: 3s;
        }

        .dot-five {
          top: 12%;
          right: 34%;
          animation-delay: 4s;
        }

        @keyframes floating {
          0%,
          100% {
            transform:
              translateY(0)
              scale(1);
            opacity: 0.3;
          }

          50% {
            transform:
              translateY(-18px)
              scale(1.4);
            opacity: 0.8;
          }
        }

        /* =========================
           BACK BUTTON
        ========================== */

        .back-button {
          position: relative;
          z-index: 10;
          display: block;
          margin: 0 auto;
          padding-top: 44px;
          border: none;
          background: transparent;
          color: #164d49;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .back-button:hover {
          transform: translateX(-4px);
        }

        /* =========================
           CONTENT
        ========================== */

        .login-content {
          position: relative;
          z-index: 5;
          min-height: calc(100vh - 90px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding:
            25px
            20px
            60px;
        }

        /* =========================
           FOX
        ========================== */

        .fox-area {
          width: 230px;
          height: 180px;
          position: relative;
          margin-bottom: -30px;
          z-index: 4;
          transition: transform 0.5s ease;
        }

        .fox-area.fox-email-mode {
          transform: translateY(5px);
        }

        .fox-area.fox-password-mode {
          transform: translateY(2px);
        }

        .fox-shadow {
          position: absolute;
          width: 150px;
          height: 22px;
          left: 40px;
          bottom: 6px;
          border-radius: 50%;
          background: rgba(20, 65, 61, 0.12);
          filter: blur(8px);
        }

        .fox {
          position: relative;
          width: 230px;
          height: 180px;
          animation: foxBreathing 4s ease-in-out infinite;
        }

        @keyframes foxBreathing {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        /* EARS */

        .ear {
          position: absolute;
          width: 64px;
          height: 74px;
          top: 18px;
          background: #c66f36;
          clip-path: polygon(
            50% 0%,
            100% 100%,
            0% 100%
          );
          z-index: 1;
        }

        .ear-left {
          left: 42px;
          transform: rotate(-12deg);
        }

        .ear-right {
          right: 42px;
          transform: rotate(12deg);
        }

        .ear-inner {
          position: absolute;
          width: 34px;
          height: 42px;
          left: 15px;
          top: 13px;
          background: #f1c0a2;
          clip-path: polygon(
            50% 0%,
            100% 100%,
            0% 100%
          );
        }

        /* HEAD */

        .fox-head {
          position: absolute;
          width: 135px;
          height: 112px;
          top: 42px;
          left: 48px;
          border-radius:
            45%
            45%
            48%
            48%;
          background:
            linear-gradient(
              145deg,
              #d77a3c,
              #b95e2e
            );
          box-shadow:
            inset
            0 -8px 18px
            rgba(83, 35, 17, 0.12);
          z-index: 3;
        }

        /* WHITE FACE */

        .muzzle {
          position: absolute;
          width: 65px;
          height: 65px;
          bottom: -3px;
          background: #f5eee4;
          border-radius: 50%;
        }

        .muzzle-left {
          left: 11px;
        }

        .muzzle-right {
          right: 11px;
        }

        /* FOREHEAD */

        .forehead-mark {
          position: absolute;
          width: 38px;
          height: 48px;
          top: 0;
          left: 48px;
          background: #f5eee4;
          clip-path: polygon(
            50% 0%,
            100% 100%,
            0% 100%
          );
          opacity: 0.92;
        }

        /* EYES */

        .fox-eye {
          position: absolute;
          top: 49px;
          width: 29px;
          height: 22px;
          z-index: 7;
          transition:
            transform 0.35s ease,
            height 0.3s ease;
        }

        .fox-eye-left {
          left: 25px;
        }

        .fox-eye-right {
          right: 25px;
        }

        .eye-white {
          display: flex;
          width: 29px;
          height: 20px;
          background: white;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pupil {
          width: 10px;
          height: 14px;
          border-radius: 50%;
          background: #172f2d;
          position: relative;
          transition:
            transform 0.35s ease;
        }

        /* FOX LOOKS TOWARDS EMAIL */

        .fox-email-mode .pupil {
          transform:
            translateX(6px)
            translateY(-1px);
        }

        .fox-email-mode .fox-eye-left {
          transform: rotate(-3deg);
        }

        .fox-email-mode .fox-eye-right {
          transform: rotate(3deg);
        }

        /* PASSWORD CLOSED EYES */

        .eyes-closed .eye-white {
          height: 4px;
          margin-top: 9px;
          background: #6d3824;
          border-radius: 50%;
        }

        .eyes-closed .pupil {
          opacity: 0;
        }

        .eyes-closed {
          transform: translateY(2px);
        }

        /* NOSE */

        .fox-nose {
          position: absolute;
          z-index: 10;
          width: 17px;
          height: 13px;
          background: #2c2421;
          left: 59px;
          top: 77px;
          border-radius:
            48%
            48%
            55%
            55%;
        }

        /* MOUTH */

        .fox-mouth {
          position: absolute;
          z-index: 9;
          left: 66px;
          top: 87px;
          width: 4px;
          height: 15px;
          background: #4b2921;
          border-radius: 5px;
        }

        .fox-mouth span {
          position: absolute;
          width: 20px;
          height: 9px;
          border-bottom: 2px solid #4b2921;
          border-radius: 50%;
          left: -8px;
          top: 4px;
        }

        /* CHEEKS */

        .cheek {
          position: absolute;
          width: 12px;
          height: 8px;
          background: rgba(224, 117, 91, 0.38);
          border-radius: 50%;
          top: 78px;
          z-index: 8;
        }

        .cheek-left {
          left: 16px;
        }

        .cheek-right {
          right: 16px;
        }

        /* BODY */

        .fox-body {
          position: absolute;
          width: 95px;
          height: 60px;
          left: 68px;
          bottom: 7px;
          border-radius:
            50%
            50%
            20%
            20%;
          background:
            linear-gradient(
              150deg,
              #b65d2e,
              #914820
            );
          z-index: 2;
        }

        .fox-chest {
          position: absolute;
          width: 56px;
          height: 48px;
          left: 20px;
          top: 10px;
          background: #f5eee4;
          border-radius: 50%;
        }

        /* PAWS */

        .fox-paw {
          position: absolute;
          width: 37px;
          height: 18px;
          background: #b95c2c;
          border-radius: 50%;
          bottom: 22px;
          z-index: 5;
        }

        .paw-left {
          left: 48px;
          transform: rotate(12deg);
        }

        .paw-right {
          right: 48px;
          transform: rotate(-12deg);
        }

        /* KEYBOARD */

        .keyboard {
          position: absolute;
          width: 105px;
          height: 35px;
          background: #253f3d;
          border-radius: 7px;
          bottom: 2px;
          left: 62px;
          padding: 5px;
          box-shadow:
            0 6px 12px
            rgba(0,0,0,0.15);
          z-index: 8;
        }

        .keyboard-row {
          display: flex;
          gap: 3px;
          margin-bottom: 3px;
        }

        .keyboard-row span {
          width: 12px;
          height: 5px;
          border-radius: 2px;
          background: #e4dccb;
        }

        .keyboard-space {
          width: 45px;
          height: 4px;
          border-radius: 3px;
          background: #e4dccb;
          margin: 1px auto 0;
        }

        /* =========================
           LOGIN CARD
        ========================== */

        .login-card {
          position: relative;
          width: min(100%, 560px);
          padding:
            42px
            42px
            36px;
          background:
            rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 32px;
          box-shadow:
            0 25px 70px
            rgba(30, 62, 58, 0.14),
            0 2px 10px
            rgba(0, 0, 0, 0.03);
          border:
            1px solid
            rgba(210, 198, 168, 0.35);
          text-align: center;
        }

        .brand-small {
          color: #bf9238;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 4px;
          margin-bottom: 17px;
        }

        .brand-small span {
          color: #164d49;
          margin: 0 4px;
        }

        .login-card h1 {
          margin: 0;
          color: #144d48;
          font-size: clamp(42px, 7vw, 58px);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -2px;
        }

        .subtitle {
          margin:
            15px
            0
            36px;
          color: #5d6672;
          font-size: 20px;
          line-height: 1.4;
        }

        /* =========================
           INPUTS
        ========================== */

        .input-group {
          text-align: left;
          margin-bottom: 25px;
        }

        .input-group label {
          display: block;
          color: #204b47;
          font-size: 17px;
          font-weight: 750;
          margin-bottom: 9px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper input {
          width: 100%;
          height: 68px;
          border:
            2px solid
            #e1e3e4;
          border-radius: 19px;
          padding:
            0
            20px
            0
            53px;
          font-size: 18px;
          color: #263e3c;
          background: #fff;
          outline: none;
          transition:
            border 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .input-wrapper input::placeholder {
          color: #98a2a4;
        }

        .input-wrapper input:focus {
          border-color: #1b5b55;
          box-shadow:
            0 0 0 4px
            rgba(27, 91, 85, 0.08);
          transform: translateY(-1px);
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          font-size: 19px;
          opacity: 0.65;
          pointer-events: none;
        }

        /* =========================
           ERROR
        ========================== */

        .error-message {
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          color: #a34032;
          background: #fff1ef;
          border: 1px solid #f2d0ca;
          border-radius: 13px;
          padding: 12px 15px;
          margin-bottom: 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .error-message span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #a34032;
          color: white;
          font-weight: 800;
          flex-shrink: 0;
        }

        /* =========================
           LOGIN BUTTON
        ========================== */

        .login-button {
          width: 100%;
          height: 72px;
          border: none;
          border-radius: 40px;
          background:
            linear-gradient(
              135deg,
              #14534e,
              #10443f
            );
          color: white;
          font-size: 20px;
          font-weight: 800;
          cursor: pointer;
          box-shadow:
            0 13px 30px
            rgba(20, 83, 78, 0.2);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 17px 34px
            rgba(20, 83, 78, 0.26);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .arrow {
          margin-left: 7px;
          font-size: 23px;
        }

        .loading-spinner {
          display: inline-block;
          width: 19px;
          height: 19px;
          border:
            3px solid
            rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          margin-right: 8px;
          vertical-align: -3px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* =========================
           DIVIDER
        ========================== */

        .divider {
          height: 1px;
          background: #ececec;
          margin:
            31px
            0
            25px;
        }

        .register-text {
          margin: 0;
          color: #5c6572;
          font-size: 18px;
        }

        .register-text button {
          border: none;
          background: transparent;
          padding: 0;
          color: #14534e;
          font-size: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        .register-text button:hover {
          text-decoration: underline;
        }

        /* =========================
           BOTTOM MESSAGE
        ========================== */

        .bottom-message {
          margin-top: 24px;
          color: #60716e;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .bottom-message span {
          margin: 0 8px;
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 640px) {

          .back-button {
            padding-top: 28px;
            font-size: 15px;
          }

          .login-content {
            padding:
              10px
              15px
              35px;
          }

          .fox-area {
            transform: scale(0.82);
            transform-origin: bottom center;
            margin-bottom: -52px;
          }

          .fox-area.fox-email-mode {
            transform:
              scale(0.82)
              translateY(5px);
          }

          .fox-area.fox-password-mode {
            transform:
              scale(0.82)
              translateY(2px);
          }

          .login-card {
            padding:
              32px
              20px
              28px;
            border-radius: 27px;
          }

          .brand-small {
            font-size: 13px;
            letter-spacing: 2.8px;
          }

          .login-card h1 {
            font-size: 42px;
          }

          .subtitle {
            font-size: 17px;
            margin-bottom: 28px;
          }

          .input-group label {
            font-size: 15px;
          }

          .input-wrapper input {
            height: 62px;
            font-size: 16px;
            border-radius: 16px;
          }

          .login-button {
            height: 64px;
            font-size: 18px;
          }

          .register-text {
            font-size: 16px;
          }

          .bottom-message {
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {

          .login-card {
            padding:
              28px
              16px
              25px;
          }

          .login-card h1 {
            font-size: 36px;
          }

          .brand-small {
            font-size: 11px;
          }
        }

        /* REDUCE MOTION ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }

      `}</style>
    </div>
  );
}

export default Login;
