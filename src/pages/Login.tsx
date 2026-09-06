import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("Login failed. Please try again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile error:", profileError);
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
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const characterStyle = {
    transform: `
      translate(
        ${mouse.x * 5}px,
        ${mouse.y * 3}px
      )
      rotateY(${mouse.x * 5}deg)
      rotateX(${mouse.y * -3}deg)
    `,
  };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="ocean-bg">
        <div className="stars"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>

        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>
      </div>

      {/* Small Wellness Character */}
      <div className="wellness-character-wrapper" style={characterStyle}>
        <div
          className={`wellness-character ${
            focusedField === "password" ? "password-mode" : ""
          }`}
        >
          {/* Hair */}
          <div className="character-hair">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Head */}
          <div className="character-head">
            {/* Ears */}
            <div className="ear ear-left"></div>
            <div className="ear ear-right"></div>

            {/* Eyes */}
            <div
              className={`eye eye-left ${
                focusedField === "password" ? "eyes-closed" : ""
              }`}
            >
              <span
                className="pupil"
                style={{
                  transform:
                    focusedField === "email"
                      ? `translate(${mouse.x * 2}px, ${
                          mouse.y * 1.5
                        }px)`
                      : "translate(0, 0)",
                }}
              ></span>
            </div>

            <div
              className={`eye eye-right ${
                focusedField === "password" ? "eyes-closed" : ""
              }`}
            >
              <span
                className="pupil"
                style={{
                  transform:
                    focusedField === "email"
                      ? `translate(${mouse.x * 2}px, ${
                          mouse.y * 1.5
                        }px)`
                      : "translate(0, 0)",
                }}
              ></span>
            </div>

            {/* Nose */}
            <div className="character-nose"></div>

            {/* Smile */}
            <div className="character-smile"></div>
          </div>

          {/* Neck */}
          <div className="character-neck"></div>

          {/* Doctor / Wellness Coat */}
          <div className="doctor-coat">
            <div className="coat-collar-left"></div>
            <div className="coat-collar-right"></div>

            <div className="stethoscope">
              <div className="stetho-left"></div>
              <div className="stetho-right"></div>
              <div className="stetho-chest"></div>
            </div>

            <div className="coat-button button-one"></div>
            <div className="coat-button button-two"></div>
          </div>

          {/* Tiny hands peeking */}
          <div className="tiny-hand hand-left"></div>
          <div className="tiny-hand hand-right"></div>
        </div>
      </div>

      {/* Login Card */}
      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
            <div className="logo-circle">
              <span>F</span>
            </div>

            <h1>FREEWILL</h1>
            <p>Human Empowerment</p>
          </div>

          <div className="welcome-text">
            <h2>Welcome Back</h2>
            <p>
              Take a moment for yourself.
              <br />
              Your wellbeing matters.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div
              className={`input-group ${
                focusedField === "email" ? "input-focused" : ""
              }`}
            >
              <label>Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

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

            {/* Password */}
            <div
              className={`input-group ${
                focusedField === "password" ? "input-focused" : ""
              }`}
            >
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

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

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={async () => {
                  if (!email) {
                    alert("Please enter your email first.");
                    return;
                  }

                  const { error } =
                    await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo:
                        `${window.location.origin}/login`,
                    });

                  if (error) {
                    alert(error.message);
                  } else {
                    alert(
                      "Password reset link has been sent to your email."
                    );
                  }
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="button-loading">
                  <span></span>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="register-section">
            <span>Don't have an account?</span>

            <Link to="/register">Create an account</Link>
          </div>

          <div className="security-text">
            <span>🔐</span>
            <span>Your information is securely protected</span>
          </div>
        </div>
      </div>

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
            radial-gradient(circle at 50% 15%, rgba(24, 112, 122, 0.20), transparent 35%),
            linear-gradient(145deg, #02090d 0%, #03151b 45%, #021015 100%);
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

        /* BACKGROUND */

        .ocean-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .stars {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-image:
            radial-gradient(circle, rgba(255,255,255,.75) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,.45) 1px, transparent 1px);
          background-size: 95px 95px, 145px 145px;
          background-position: 20px 30px, 70px 90px;
        }

        .ambient {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: .22;
        }

        .ambient-one {
          width: 300px;
          height: 300px;
          background: #0d8b8b;
          top: -120px;
          left: -100px;
        }

        .ambient-two {
          width: 350px;
          height: 350px;
          background: #164d74;
          right: -160px;
          bottom: -150px;
        }

        .ambient-three {
          width: 220px;
          height: 220px;
          background: #4c9b88;
          left: 50%;
          top: 25%;
          opacity: .08;
        }

        .wave {
          position: absolute;
          width: 180%;
          left: -40%;
          border-radius: 50%;
          transform: rotate(-4deg);
          border: 1px solid rgba(120, 220, 210, .08);
          box-shadow:
            0 0 60px rgba(40, 180, 180, .05);
        }

        .wave-one {
          height: 280px;
          bottom: -180px;
        }

        .wave-two {
          height: 380px;
          bottom: -260px;
        }

        .wave-three {
          height: 500px;
          bottom: -360px;
        }

        /* LOGIN CONTAINER */

        .login-container {
          width: 100%;
          max-width: 460px;
          padding: 28px 18px;
          position: relative;
          z-index: 10;
          perspective: 1200px;
        }

        .login-card {
          position: relative;
          width: 100%;
          padding: 42px 38px 30px;
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.105),
              rgba(255,255,255,.035)
            );
          border: 1px solid rgba(255,255,255,.13);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 35px 90px rgba(0,0,0,.55),
            inset 0 1px 0 rgba(255,255,255,.10);
          animation: cardEnter .8s ease-out;
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(30px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* SMALL CHARACTER */

        .wellness-character-wrapper {
          position: absolute;
          z-index: 20;
          top: calc(50% - 275px);
          left: 50%;
          margin-left: -105px;
          width: 82px;
          height: 88px;
          pointer-events: none;
          perspective: 700px;
          transition: transform .12s ease-out;
        }

        .wellness-character {
          width: 82px;
          height: 88px;
          position: relative;
          transform-style: preserve-3d;
          animation: characterFloat 3.5s ease-in-out infinite;
        }

        @keyframes characterFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        .character-head {
          position: absolute;
          width: 54px;
          height: 55px;
          left: 14px;
          top: 5px;
          border-radius: 46% 46% 43% 43%;
          background: linear-gradient(
            145deg,
            #ffd9bc,
            #f2b894
          );
          box-shadow:
            inset -5px -6px 8px rgba(140,70,40,.13),
            0 5px 10px rgba(0,0,0,.2);
          z-index: 4;
        }

        .character-hair {
          position: absolute;
          width: 58px;
          height: 34px;
          left: 12px;
          top: 0;
          z-index: 7;
        }

        .character-hair span {
          position: absolute;
          background: linear-gradient(
            145deg,
            #18232a,
            #071116
          );
          border-radius: 50%;
        }

        .character-hair span:nth-child(1) {
          width: 36px;
          height: 25px;
          left: 2px;
          top: 1px;
          transform: rotate(-15deg);
        }

        .character-hair span:nth-child(2) {
          width: 38px;
          height: 28px;
          left: 19px;
          top: 0;
          transform: rotate(13deg);
        }

        .character-hair span:nth-child(3) {
          width: 21px;
          height: 17px;
          left: 20px;
          top: 17px;
          transform: rotate(5deg);
        }

        .ear {
          position: absolute;
          width: 9px;
          height: 17px;
          top: 20px;
          background: #f1b28f;
          border-radius: 50%;
        }

        .ear-left {
          left: -6px;
        }

        .ear-right {
          right: -6px;
        }

        .eye {
          position: absolute;
          width: 9px;
          height: 11px;
          top: 27px;
          background: white;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: inset 0 0 2px rgba(0,0,0,.25);
          transition: height .25s ease;
        }

        .eye-left {
          left: 12px;
        }

        .eye-right {
          right: 12px;
        }

        .pupil {
          position: absolute;
          width: 4px;
          height: 6px;
          left: 2.5px;
          top: 2px;
          border-radius: 50%;
          background: #182127;
          transition: transform .15s ease;
        }

        .eyes-closed {
          height: 2px;
          top: 31px;
          background: #573d36;
          border-radius: 100%;
        }

        .eyes-closed .pupil {
          display: none;
        }

        .character-nose {
          position: absolute;
          width: 4px;
          height: 5px;
          left: 25px;
          top: 35px;
          border-radius: 50%;
          background: #d48e6f;
        }

        .character-smile {
          position: absolute;
          width: 12px;
          height: 6px;
          left: 21px;
          top: 41px;
          border-bottom: 2px solid #9d5e53;
          border-radius: 0 0 20px 20px;
        }

        .character-neck {
          position: absolute;
          width: 14px;
          height: 12px;
          left: 34px;
          top: 51px;
          background: #efb18e;
          z-index: 2;
        }

        .doctor-coat {
          position: absolute;
          width: 64px;
          height: 37px;
          left: 9px;
          top: 56px;
          background: linear-gradient(
            145deg,
            #ffffff,
            #dce9e8
          );
          border-radius: 18px 18px 8px 8px;
          z-index: 3;
          box-shadow:
            0 7px 13px rgba(0,0,0,.25),
            inset 0 2px 0 rgba(255,255,255,.8);
        }

        .coat-collar-left,
        .coat-collar-right {
          position: absolute;
          width: 14px;
          height: 21px;
          top: 0;
          background: #eef7f6;
        }

        .coat-collar-left {
          left: 19px;
          transform: skewY(28deg);
        }

        .coat-collar-right {
          right: 19px;
          transform: skewY(-28deg);
        }

        .stethoscope {
          position: absolute;
          width: 24px;
          height: 27px;
          left: 20px;
          top: 3px;
        }

        .stetho-left,
        .stetho-right {
          position: absolute;
          width: 2px;
          height: 17px;
          background: #4e7779;
          top: 0;
        }

        .stetho-left {
          left: 4px;
          transform: rotate(-8deg);
        }

        .stetho-right {
          right: 4px;
          transform: rotate(8deg);
        }

        .stetho-chest {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 2px solid #4e7779;
          border-radius: 50%;
          left: 8px;
          top: 18px;
        }

        .coat-button {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #76999a;
          border-radius: 50%;
          left: 31px;
        }

        .button-one {
          top: 19px;
        }

        .button-two {
          top: 27px;
        }

        .tiny-hand {
          position: absolute;
          width: 12px;
          height: 15px;
          background: #ffd0ae;
          border-radius: 50%;
          z-index: 8;
          top: 66px;
        }

        .hand-left {
          left: 0;
          transform: rotate(20deg);
        }

        .hand-right {
          right: 0;
          transform: rotate(-20deg);
        }

        /* LOGO */

        .logo-section {
          text-align: center;
          margin-bottom: 25px;
        }

        .logo-circle {
          width: 54px;
          height: 54px;
          margin: 0 auto 12px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              rgba(70,194,177,.35),
              rgba(204,171,80,.20)
            );
          border: 1px solid rgba(255,255,255,.16);
          box-shadow:
            0 8px 25px rgba(0,0,0,.3),
            inset 0 1px 0 rgba(255,255,255,.15);
        }

        .logo-circle span {
          font-size: 25px;
          font-weight: 700;
          color: #d8c276;
        }

        .logo-section h1 {
          margin: 0;
          font-size: 24px;
          letter-spacing: 4px;
          font-weight: 700;
        }

        .logo-section p {
          margin: 5px 0 0;
          color: rgba(255,255,255,.52);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .welcome-text {
          text-align: center;
          margin-bottom: 26px;
        }

        .welcome-text h2 {
          margin: 0 0 7px;
          font-size: 24px;
          font-weight: 600;
        }

        .welcome-text p {
          margin: 0;
          color: rgba(255,255,255,.53);
          font-size: 13px;
          line-height: 1.6;
        }

        /* INPUTS */

        .input-group {
          margin-bottom: 19px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 12px;
          color: rgba(255,255,255,.62);
          font-weight: 500;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          opacity: .48;
          font-size: 14px;
          z-index: 2;
        }

        .input-wrapper input {
          width: 100%;
          height: 50px;
          padding: 0 15px 0 43px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.20);
          color: white;
          outline: none;
          font-size: 14px;
          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .input-wrapper input::placeholder {
          color: rgba(255,255,255,.30);
        }

        .input-focused .input-wrapper input {
          border-color: rgba(92,206,193,.55);
          background: rgba(20,90,94,.12);
          box-shadow:
            0 0 0 3px rgba(76,184,174,.07),
            0 8px 20px rgba(0,0,0,.14);
        }

        /* OPTIONS */

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2px 0 22px;
          font-size: 11px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,.46);
          cursor: pointer;
        }

        .remember input {
          accent-color: #57b9ae;
        }

        .forgot-password {
          border: 0;
          background: none;
          color: #8bcac2;
          cursor: pointer;
          font-size: 11px;
          padding: 0;
        }

        /* BUTTON */

        .login-button {
          width: 100%;
          height: 52px;
          border: 0;
          border-radius: 15px;
          cursor: pointer;
          color: #071113;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .3px;
          background:
            linear-gradient(
              135deg,
              #b9d9c8,
              #d9c57a
            );
          box-shadow:
            0 10px 28px rgba(72,153,137,.18),
            inset 0 1px 0 rgba(255,255,255,.6);
          transition:
            transform .2s ease,
            box-shadow .2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 14px 34px rgba(72,153,137,.25),
            inset 0 1px 0 rgba(255,255,255,.6);
        }

        .login-button:disabled {
          opacity: .65;
          cursor: not-allowed;
          transform: none;
        }

        .arrow {
          font-size: 19px;
        }

        .button-loading {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .button-loading span {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0,0,0,.25);
          border-top-color: #071113;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* REGISTER */

        .register-section {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: rgba(255,255,255,.40);
        }

        .register-section a {
          margin-left: 5px;
          color: #b9d9c8;
          text-decoration: none;
          font-weight: 600;
        }

        .register-section a:hover {
          text-decoration: underline;
        }

        .security-text {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 19px;
          color: rgba(255,255,255,.25);
          font-size: 9px;
        }

        /* MOBILE */

        @media (max-width: 520px) {
          .login-container {
            max-width: 430px;
            padding: 24px 14px;
          }

          .login-card {
            padding: 38px 24px 26px;
            border-radius: 24px;
          }

          .wellness-character-wrapper {
            top: calc(50% - 268px);
            margin-left: -86px;
            transform: scale(.88);
          }

          .welcome-text h2 {
            font-size: 22px;
          }
        }

        @media (max-height: 720px) {
          .wellness-character-wrapper {
            top: 22px;
          }

          .login-card {
            padding-top: 32px;
          }

          .logo-section {
            margin-bottom: 17px;
          }

          .welcome-text {
            margin-bottom: 18px;
          }

          .input-group {
            margin-bottom: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
