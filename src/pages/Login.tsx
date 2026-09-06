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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
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

      const { data: profile, error: profileError } =
        await supabase
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
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link has been sent to your email.");
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          BACKGROUND
      ========================== */}

      <div className="ocean-bg">

        <div className="stars"></div>

        {/* HEALING PARTICLES */}

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
        </div>

        {/* FLOWING LIGHT STREAMS */}

        <div className="healing-stream stream-one"></div>
        <div className="healing-stream stream-two"></div>
        <div className="healing-stream stream-three"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>

        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>

      </div>

      {/* =========================
          LOGIN
      ========================== */}

      <div className="login-container">

        <div className="login-card">

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

            <h2>Welcome Back</h2>

            <p>
              Take a moment for yourself.
              <br />
              Your wellbeing matters.
            </p>

          </div>

          {/* FORM */}

          <form onSubmit={handleLogin}>

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

                <span className="input-icon">
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

            <div
              className={`input-group ${
                focusedField === "password"
                  ? "input-focused"
                  : ""
              }`}
            >

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
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
                  autoComplete="current-password"
                />

              </div>

            </div>

            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>

            </div>

            {/* =========================
                SIGN IN BUTTON
            ========================== */}

            <button
              type="submit"
              disabled={loading}
              className={`login-button ${
                loading
                  ? "button-loading-state"
                  : ""
              }`}
            >

              {loading ? (

                <>
                  {/* LIQUID */}

                  <div className="fluid-container">

                    <div className="fluid-wave fluid-wave-one"></div>

                    <div className="fluid-wave fluid-wave-two"></div>

                    <div className="fluid-wave fluid-wave-three"></div>

                  </div>

                  {/* =========================
                      SMALL 3D RUNNER
                  ========================== */}

                  <div className="battery-runner">

                    {/* tiny shadow */}

                    <div className="runner-shadow"></div>

                    {/* battery body */}

                    <div className="battery-body">

                      <div className="battery-top"></div>

                      <div className="battery-highlight"></div>

                      <div className="battery-stripe"></div>

                    </div>

                    {/* little legs */}

                    <div className="battery-leg leg-one"></div>
                    <div className="battery-leg leg-two"></div>

                    {/* little arms */}

                    <div className="battery-arm arm-one"></div>
                    <div className="battery-arm arm-two"></div>

                  </div>

                  <span className="signing-text">
                    Signing...
                  </span>
                </>

              ) : (

                <>
                  <span>
                    Sign In
                  </span>

                  <span className="arrow">
                    →
                  </span>
                </>

              )}

            </button>

          </form>

          {/* REGISTER */}

          <div className="register-section">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create an account
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

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================
           MAIN
        ===================================== */

        .login-page {
          min-height: 100vh;
          width: 100%;

          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 15%,
              rgba(24,112,122,.20),
              transparent 35%
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
        ===================================== */

        .ocean-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .stars {
          position: absolute;
          inset: 0;

          opacity: .45;

          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.75) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,.40) 1px,
              transparent 1px
            );

          background-size:
            95px 95px,
            145px 145px;

          background-position:
            20px 30px,
            70px 90px;
        }

        /* =====================================
           HEALING PARTICLES
        ===================================== */

        .healing-particles {
          position: absolute;
          inset: 0;

          overflow: hidden;

          opacity: .8;
        }

        .particle {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(150,235,219,.85);

          box-shadow:
            0 0 8px
            rgba(89,214,196,.65);

          animation:
            healingFloat
            linear
            infinite;
        }

        .p1 {
          left: 8%;
          bottom: -10px;
          animation-duration: 8s;
          animation-delay: -2s;
        }

        .p2 {
          left: 15%;
          bottom: -20px;
          animation-duration: 11s;
          animation-delay: -6s;
          transform: scale(.7);
        }

        .p3 {
          left: 23%;
          bottom: -10px;
          animation-duration: 9s;
          animation-delay: -4s;
          transform: scale(.55);
        }

        .p4 {
          left: 31%;
          bottom: -20px;
          animation-duration: 12s;
          animation-delay: -8s;
        }

        .p5 {
          left: 39%;
          bottom: -10px;
          animation-duration: 10s;
          animation-delay: -3s;
          transform: scale(.6);
        }

        .p6 {
          left: 47%;
          bottom: -15px;
          animation-duration: 13s;
          animation-delay: -10s;
        }

        .p7 {
          left: 55%;
          bottom: -10px;
          animation-duration: 9s;
          animation-delay: -5s;
          transform: scale(.6);
        }

        .p8 {
          left: 64%;
          bottom: -20px;
          animation-duration: 12s;
          animation-delay: -7s;
        }

        .p9 {
          left: 71%;
          bottom: -10px;
          animation-duration: 10s;
          animation-delay: -1s;
          transform: scale(.55);
        }

        .p10 {
          left: 79%;
          bottom: -20px;
          animation-duration: 14s;
          animation-delay: -9s;
        }

        .p11 {
          left: 87%;
          bottom: -10px;
          animation-duration: 9s;
          animation-delay: -6s;
          transform: scale(.65);
        }

        .p12 {
          left: 93%;
          bottom: -15px;
          animation-duration: 12s;
          animation-delay: -3s;
        }

        .p13 {
          left: 18%;
          bottom: -10px;
          animation-duration: 15s;
          animation-delay: -12s;
          transform: scale(.45);
        }

        .p14 {
          left: 36%;
          bottom: -20px;
          animation-duration: 11s;
          animation-delay: -5s;
          transform: scale(.5);
        }

        .p15 {
          left: 59%;
          bottom: -10px;
          animation-duration: 14s;
          animation-delay: -11s;
          transform: scale(.5);
        }

        .p16 {
          left: 76%;
          bottom: -15px;
          animation-duration: 10s;
          animation-delay: -4s;
          transform: scale(.6);
        }

        .p17 {
          left: 45%;
          bottom: -10px;
          animation-duration: 16s;
          animation-delay: -13s;
          transform: scale(.45);
        }

        .p18 {
          left: 68%;
          bottom: -20px;
          animation-duration: 13s;
          animation-delay: -7s;
          transform: scale(.5);
        }

        @keyframes healingFloat {

          0% {
            transform:
              translate3d(0, 0, 0)
              scale(.6);

            opacity: 0;
          }

          10% {
            opacity: .7;
          }

          35% {
            transform:
              translate3d(
                20px,
                -30vh,
                0
              )
              scale(1);
          }

          65% {
            transform:
              translate3d(
                -18px,
                -65vh,
                0
              )
              scale(.8);
          }

          90% {
            opacity: .4;
          }

          100% {
            transform:
              translate3d(
                25px,
                -110vh,
                0
              )
              scale(.2);

            opacity: 0;
          }
        }

        /* =====================================
           HEALING LIGHT STREAMS
        ===================================== */

        .healing-stream {
          position: absolute;

          width: 2px;
          height: 65%;

          top: 110%;

          border-radius: 50%;

          background:
            linear-gradient(
              to top,
              transparent,
              rgba(94,211,193,.28),
              transparent
            );

          filter: blur(1px);

          opacity: .45;

          animation:
            streamFlow
            9s
            ease-in-out
            infinite;
        }

        .stream-one {
          left: 18%;
          animation-delay: -3s;
        }

        .stream-two {
          left: 53%;
          animation-delay: -6s;
        }

        .stream-three {
          left: 82%;
          animation-delay: -1s;
        }

        @keyframes streamFlow {

          0% {
            transform:
              translateY(0)
              rotate(-8deg);

            opacity: 0;
          }

          20% {
            opacity: .45;
          }

          70% {
            opacity: .22;
          }

          100% {
            transform:
              translateY(-145vh)
              rotate(8deg);

            opacity: 0;
          }
        }

        /* =====================================
           AMBIENT LIGHT
        ===================================== */

        .ambient {
          position: absolute;

          border-radius: 50%;

          filter: blur(80px);

          opacity: .20;
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

          opacity: .07;
        }

        /* =====================================
           WAVES
        ===================================== */

        .wave {
          position: absolute;

          width: 180%;

          left: -40%;

          border-radius: 50%;

          transform: rotate(-4deg);

          border:
            1px solid
            rgba(120,220,210,.08);

          box-shadow:
            0 0 60px
            rgba(40,180,180,.05);
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

        /* =====================================
           CONTAINER
        ===================================== */

        .login-container {
          width: 100%;
          max-width: 460px;

          padding:
            28px
            18px;

          position: relative;

          z-index: 10;
        }

        /* =====================================
           GLASS CARD
        ===================================== */

        .login-card {
          position: relative;

          width: 100%;

          padding:
            38px
            38px
            30px;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.105),
              rgba(255,255,255,.035)
            );

          border:
            1px solid
            rgba(255,255,255,.13);

          backdrop-filter:
            blur(28px);

          -webkit-backdrop-filter:
            blur(28px);

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
            opacity: 0;

            transform:
              translateY(30px)
              scale(.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        /* =====================================
           LOGO
        ===================================== */

        .logo-section {
          text-align: center;

          margin-bottom: 25px;

          padding-top: 4px;
        }

        .logo-circle {
          width: 54px;
          height: 54px;

          margin:
            0
            auto
            12px;

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
          font-size: 25px;

          font-weight: 700;

          color:
            #d8c276;
        }

        .logo-section h1 {
          margin: 0;

          font-size: 24px;

          letter-spacing: 4px;

          font-weight: 700;
        }

        .logo-section p {
          margin: 5px 0 0;

          color:
            rgba(255,255,255,.52);

          font-size: 11px;

          letter-spacing: 2px;

          text-transform: uppercase;
        }

        /* =====================================
           WELCOME
        ===================================== */

        .welcome-text {
          text-align: center;

          margin-bottom: 26px;
        }

        .welcome-text h2 {
          margin:
            0 0 7px;

          font-size: 24px;

          font-weight: 600;
        }

        .welcome-text p {
          margin: 0;

          color:
            rgba(255,255,255,.53);

          font-size: 13px;

          line-height: 1.6;
        }

        /* =====================================
           INPUTS
        ===================================== */

        .input-group {
          margin-bottom: 19px;
        }

        .input-group label {
          display: block;

          margin-bottom: 8px;

          font-size: 12px;

          color:
            rgba(255,255,255,.62);

          font-weight: 500;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;

          left: 15px;
          top: 50%;

          transform:
            translateY(-50%);

          opacity: .48;

          font-size: 14px;

          z-index: 2;
        }

        .input-wrapper input {
          width: 100%;

          height: 50px;

          padding:
            0
            15px
            0
            43px;

          border-radius: 14px;

          border:
            1px solid
            rgba(255,255,255,.10);

          background:
            rgba(0,0,0,.20);

          color: white;

          outline: none;

          font-size: 14px;

          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background .25s ease;
        }

        .input-wrapper input::placeholder {
          color:
            rgba(255,255,255,.30);
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
           OPTIONS
        ===================================== */

        .login-options {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          margin:
            2px 0
            22px;

          font-size: 11px;
        }

        .remember {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(255,255,255,.46);

          cursor: pointer;
        }

        .remember input {
          accent-color:
            #57b9ae;
        }

        .forgot-password {
          border: 0;

          background: none;

          color:
            #8bcac2;

          cursor: pointer;

          font-size: 11px;

          padding: 0;
        }

        /* =====================================
           LOGIN BUTTON
        ===================================== */

        .login-button {
          width: 100%;

          height: 52px;

          border: 0;

          border-radius: 15px;

          cursor: pointer;

          color:
            #071113;

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
            0 10px 28px
            rgba(72,153,137,.18),

            inset
            0 1px 0
            rgba(255,255,255,.6);

          transition:
            transform .2s ease,
            box-shadow .2s ease;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          position: relative;

          overflow: hidden;
        }

        .login-button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0 14px 34px
            rgba(72,153,137,.25),

            inset
            0 1px 0
            rgba(255,255,255,.6);
        }

        .login-button:disabled {
          cursor:
            not-allowed;

          transform:
            none;
        }

        .arrow {
          font-size: 19px;
        }

        /* =====================================
           LIQUID
        ===================================== */

        .button-loading-state {
          background:
            linear-gradient(
              135deg,
              #123f49,
              #236d70
            );

          color: white;

          box-shadow:
            0 10px 30px
            rgba(43,155,145,.25);
        }

        .fluid-container {
          position: absolute;

          inset: 0;

          overflow: hidden;

          pointer-events: none;
        }

        .fluid-wave {
          position: absolute;

          width: 180%;

          height: 160%;

          left: -40%;

          bottom: -132%;

          border-radius:
            45%
            55%
            0
            0;

          background:
            linear-gradient(
              180deg,
              rgba(207,241,222,.65),
              rgba(72,176,166,.78)
            );
        }

        .fluid-wave-one {
          animation:
            fluidRise
            2.4s
            ease-in-out
            infinite;
        }

        .fluid-wave-two {
          opacity: .38;

          bottom: -138%;

          animation:
            fluidRiseTwo
            2.8s
            ease-in-out
            infinite;

          animation-delay:
            -.5s;
        }

        .fluid-wave-three {
          opacity: .22;

          bottom: -142%;

          animation:
            fluidRiseThree
            3.2s
            ease-in-out
            infinite;

          animation-delay:
            -.9s;
        }

        @keyframes fluidRise {

          0% {
            transform:
              translateX(-8%)
              rotate(0deg);

            bottom: -132%;
          }

          50% {
            transform:
              translateX(8%)
              rotate(2deg);

            bottom: -112%;
          }

          100% {
            transform:
              translateX(-8%)
              rotate(0deg);

            bottom: -132%;
          }
        }

        @keyframes fluidRiseTwo {

          0% {
            transform:
              translateX(8%)
              rotate(0deg);

            bottom: -138%;
          }

          50% {
            transform:
              translateX(-8%)
              rotate(-2deg);

            bottom: -116%;
          }

          100% {
            transform:
              translateX(8%)
              rotate(0deg);

            bottom: -138%;
          }
        }

        @keyframes fluidRiseThree {

          0% {
            transform:
              translateX(-6%)
              rotate(1deg);

            bottom: -142%;
          }

          50% {
            transform:
              translateX(7%)
              rotate(-1deg);

            bottom: -120%;
          }

          100% {
            transform:
              translateX(-6%)
              rotate(1deg);

            bottom: -142%;
          }
        }

        /* =====================================
           SMALL 3D BATTERY RUNNER
        ===================================== */

        .battery-runner {
          position: absolute;

          left: 12%;

          bottom: 9px;

          width: 22px;
          height: 28px;

          z-index: 20;

          transform-origin:
            center bottom;

          animation:
            batteryRun
            3.8s
            linear
            infinite;
        }

        @keyframes batteryRun {

          0% {
            left: 8%;

            transform:
              translateY(0)
              rotate(0deg);
          }

          12% {
            transform:
              translateY(-1px)
              rotate(-2deg);
          }

          25% {
            transform:
              translateY(0)
              rotate(2deg);
          }

          50% {
            left: 45%;

            transform:
              translateY(-1px)
              rotate(-1deg);
          }

          75% {
            left: 70%;

            transform:
              translateY(0)
              rotate(2deg);
          }

          100% {
            left: 94%;

            transform:
              translateY(-1px)
              rotate(0deg);
          }
        }

        /* shadow */

        .runner-shadow {
          position: absolute;

          width: 15px;
          height: 3px;

          left: 3px;
          bottom: 0;

          border-radius: 50%;

          background:
            rgba(0,0,0,.25);

          filter: blur(2px);

          animation:
            shadowPulse
            .35s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes shadowPulse {

          from {
            transform:
              scaleX(.75);
          }

          to {
            transform:
              scaleX(1);
          }
        }

        /* battery body */

        .battery-body {
          position: absolute;

          width: 14px;
          height: 20px;

          left: 4px;
          top: 5px;

          border-radius: 4px;

          background:
            linear-gradient(
              145deg,
              #f1f3ef,
              #aabbb5
            );

          border:
            1px solid
            rgba(255,255,255,.65);

          box-shadow:
            inset
            -3px
            -3px
            4px
            rgba(0,0,0,.20),

            inset
            2px
            2px
            4px
            rgba(255,255,255,.45),

            0 2px 7px
            rgba(0,0,0,.35);
        }

        /* battery top */

        .battery-top {
          position: absolute;

          width: 6px;
          height: 3px;

          left: 3px;
          top: -4px;

          border-radius:
            2px 2px 1px 1px;

          background:
            linear-gradient(
              180deg,
              #dce6e1,
              #879b95
            );

          box-shadow:
            0 1px 2px
            rgba(0,0,0,.3);
        }

        /* battery highlight */

        .battery-highlight {
          position: absolute;

          width: 3px;
          height: 11px;

          left: 2px;
          top: 4px;

          border-radius: 3px;

          background:
            rgba(255,255,255,.55);

          filter:
            blur(.4px);
        }

        /* battery stripe */

        .battery-stripe {
          position: absolute;

          width: 8px;
          height: 3px;

          left: 3px;
          top: 10px;

          border-radius: 2px;

          background:
            rgba(75,145,137,.55);
        }

        /* =====================================
           RUNNER LEGS
        ===================================== */

        .battery-leg {
          position: absolute;

          width: 3px;
          height: 8px;

          top: 22px;

          border-radius: 3px;

          background:
            #9fb8b1;

          transform-origin:
            top center;
        }

        .leg-one {
          left: 6px;

          animation:
            legOne
            .32s
            ease-in-out
            infinite
            alternate;
        }

        .leg-two {
          left: 12px;

          animation:
            legTwo
            .32s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes legOne {

          from {
            transform:
              rotate(35deg);
          }

          to {
            transform:
              rotate(-35deg);
          }
        }

        @keyframes legTwo {

          from {
            transform:
              rotate(-35deg);
          }

          to {
            transform:
              rotate(35deg);
          }
        }

        /* =====================================
           RUNNER ARMS
        ===================================== */

        .battery-arm {
          position: absolute;

          width: 3px;
          height: 8px;

          top: 9px;

          border-radius: 3px;

          background:
            #a9c0ba;

          transform-origin:
            top center;
        }

        .arm-one {
          left: 2px;

          animation:
            armOne
            .32s
            ease-in-out
            infinite
            alternate;
        }

        .arm-two {
          right: 2px;

          animation:
            armTwo
            .32s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes armOne {

          from {
            transform:
              rotate(35deg);
          }

          to {
            transform:
              rotate(-35deg);
          }
        }

        @keyframes armTwo {

          from {
            transform:
              rotate(-35deg);
          }

          to {
            transform:
              rotate(35deg);
          }
        }

        /* =====================================
           SIGNING
        ===================================== */

        .signing-text {
          position: relative;

          z-index: 30;

          color: white;

          font-weight: 700;

          text-shadow:
            0 1px 5px
            rgba(0,0,0,.45);

          animation:
            signingPulse
            1.4s
            ease-in-out
            infinite;
        }

        @keyframes signingPulse {

          0%,100% {
            opacity: .75;
          }

          50% {
            opacity: 1;
          }
        }

        /* =====================================
           REGISTER
        ===================================== */

        .register-section {
          text-align: center;

          margin-top: 24px;

          font-size: 12px;

          color:
            rgba(255,255,255,.40);
        }

        .register-section a {
          margin-left: 5px;

          color:
            #b9d9c8;

          text-decoration: none;

          font-weight: 600;
        }

        .register-section a:hover {
          text-decoration: underline;
        }

        /* =====================================
           SECURITY
        ===================================== */

        .security-text {
          display: flex;

          justify-content: center;

          align-items: center;

          gap: 6px;

          margin-top: 19px;

          color:
            rgba(255,255,255,.25);

          font-size: 9px;
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 520px) {

          .login-container {
            max-width: 430px;

            padding:
              24px
              14px;
          }

          .login-card {
            padding:
              34px
              24px
              26px;

            border-radius: 24px;
          }

          .welcome-text h2 {
            font-size: 22px;
          }

        }

        @media (max-height: 720px) {

          .login-card {
            padding-top: 30px;
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
