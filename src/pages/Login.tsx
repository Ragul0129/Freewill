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

  const catStyle = {
    transform: `
      translate(
        ${mouse.x * 2}px,
        ${mouse.y * 1.5}px
      )
      rotateY(${mouse.x * 3}deg)
    `,
  };

  return (
    <div className="login-page">

      {/* =========================
          OCEAN BACKGROUND
         ========================= */}
      <div className="ocean-bg">
        <div className="stars"></div>

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>

        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>
      </div>

      {/* =========================
          LOGIN CONTAINER
         ========================= */}
      <div className="login-container">

        <div className="login-card">

          {/* =========================================
              TINY MINIMAL 3D CAT
              HIDING BEHIND FREEWILL LOGO
             ========================================= */}
          <div
            className="cat-peek-wrapper"
            style={catStyle}
          >
            <div className="cat-peek">

              {/* Tail */}
              <div className="cat-tail"></div>

              {/* Body */}
              <div className="cat-body"></div>

              {/* Head */}
              <div className="cat-head">

                {/* Ears */}
                <div className="cat-ear cat-ear-left">
                  <div className="cat-ear-inner"></div>
                </div>

                <div className="cat-ear cat-ear-right">
                  <div className="cat-ear-inner"></div>
                </div>

                {/* Eyes */}
                <div className="cat-eye cat-eye-left">
                  <span></span>
                </div>

                <div className="cat-eye cat-eye-right">
                  <span></span>
                </div>

                {/* Nose */}
                <div className="cat-nose"></div>

                {/* Tiny smile */}
                <div className="cat-mouth"></div>

              </div>

              {/* Tiny paws */}
              <div className="cat-paw cat-paw-left"></div>
              <div className="cat-paw cat-paw-right"></div>

            </div>
          </div>

          {/* =========================
              LOGO
             ========================= */}
          <div className="logo-section">

            <div className="logo-circle">
              <span>F</span>
            </div>

            <h1>FREEWILL</h1>

            <p>Human Empowerment</p>

          </div>

          {/* =========================
              WELCOME
             ========================= */}
          <div className="welcome-text">

            <h2>Welcome Back</h2>

            <p>
              Take a moment for yourself.
              <br />
              Your wellbeing matters.
            </p>

          </div>

          {/* =========================
              FORM
             ========================= */}
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
                onClick={async () => {

                  if (!email) {
                    alert(
                      "Please enter your email first."
                    );
                    return;
                  }

                  const { error } =
                    await supabase.auth.resetPasswordForEmail(
                      email,
                      {
                        redirectTo:
                          `${window.location.origin}/login`,
                      }
                    );

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

            {/* =========================================
                SIGN IN BUTTON
                FLUID + RUNNING CHARACTER
               ========================================= */}
            <button
              type="submit"
              className={`login-button ${
                loading
                  ? "button-loading-state"
                  : ""
              }`}
              disabled={loading}
            >

              {loading ? (
                <>
                  {/* Fluid */}
                  <div className="fluid-container">

                    <div className="fluid-wave fluid-wave-one"></div>

                    <div className="fluid-wave fluid-wave-two"></div>

                    <div className="fluid-wave fluid-wave-three"></div>

                  </div>

                  {/* Tiny Running Character */}
                  <div className="running-character">

                    <div className="runner-body"></div>

                    <div className="runner-head"></div>

                    <div className="runner-arm runner-arm-left"></div>

                    <div className="runner-arm runner-arm-right"></div>

                    <div className="runner-leg runner-leg-left"></div>

                    <div className="runner-leg runner-leg-right"></div>

                  </div>

                  {/* Signing Text */}
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

            <span>
              🔐
            </span>

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

        /* =========================================
           PAGE
           ========================================= */

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

        /* =========================================
           BACKGROUND
           ========================================= */

        .ocean-bg {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;
        }

        .stars {
          position: absolute;
          inset: 0;

          opacity: .5;

          background-image:
            radial-gradient(
              circle,
              rgba(255,255,255,.75) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle,
              rgba(255,255,255,.45) 1px,
              transparent 1px
            );

          background-size:
            95px 95px,
            145px 145px;

          background-position:
            20px 30px,
            70px 90px;
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

        /* =========================================
           LOGIN
           ========================================= */

        .login-container {
          width: 100%;

          max-width: 460px;

          padding:
            28px
            18px;

          position: relative;

          z-index: 10;

          perspective: 1200px;
        }

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

            inset 0 1px 0
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

        /* =========================================
           TINY CAT
           ========================================= */

        .cat-peek-wrapper {
          position: absolute;

          /*
            Cat starts behind the logo.
          */

          top: 31px;

          left: 50%;

          margin-left: -34px;

          width: 68px;
          height: 58px;

          z-index: 5;

          pointer-events: none;

          perspective: 800px;

          transition:
            transform
            .15s
            ease;
        }

        .cat-peek {
          width: 68px;
          height: 58px;

          position: relative;

          transform-style:
            preserve-3d;

          /*
            Cat peeks up,
            waits,
            then goes back.
          */

          animation:
            catPeek
            5.5s
            ease-in-out
            infinite;
        }

        @keyframes catPeek {

          0% {
            transform:
              translateY(18px)
              scale(.88);

            opacity: 0;
          }

          8% {
            transform:
              translateY(4px)
              scale(.95);

            opacity: 1;
          }

          18% {
            transform:
              translateY(0)
              scale(1);
          }

          35% {
            transform:
              translateY(0)
              scale(1);
          }

          48% {
            transform:
              translateY(5px)
              scale(.98);
          }

          62% {
            transform:
              translateY(18px)
              scale(.88);

            opacity: 0;
          }

          100% {
            transform:
              translateY(18px)
              scale(.88);

            opacity: 0;
          }
        }

        /* CAT BODY */

        .cat-body {
          position: absolute;

          width: 36px;
          height: 25px;

          left: 16px;
          top: 34px;

          border-radius:
            50%
            50%
            35%
            35%;

          background:
            linear-gradient(
              145deg,
              #e9eef0,
              #aab8bd
            );

          box-shadow:
            inset
            -4px
            -5px
            7px
            rgba(0,0,0,.18),

            0 4px 8px
            rgba(0,0,0,.25);
        }

        /* CAT HEAD */

        .cat-head {
          position: absolute;

          width: 42px;
          height: 37px;

          left: 13px;
          top: 13px;

          border-radius:
            48%
            48%
            43%
            43%;

          background:
            linear-gradient(
              145deg,
              #f2f5f5,
              #aebbc0
            );

          box-shadow:
            inset
            -4px
            -5px
            7px
            rgba(0,0,0,.18),

            0 5px 10px
            rgba(0,0,0,.25);

          z-index: 4;
        }

        /* EARS */

        .cat-ear {
          position: absolute;

          width: 18px;
          height: 20px;

          top: -9px;

          background:
            linear-gradient(
              145deg,
              #dfe7e9,
              #8d9da2
            );

          clip-path:
            polygon(
              50% 0%,
              100% 100%,
              0% 100%
            );

          filter:
            drop-shadow(
              0 2px 2px
              rgba(0,0,0,.22)
            );
        }

        .cat-ear-left {
          left: 2px;

          transform:
            rotate(-7deg);
        }

        .cat-ear-right {
          right: 2px;

          transform:
            rotate(7deg);
        }

        .cat-ear-inner {
          position: absolute;

          width: 9px;
          height: 10px;

          left: 4.5px;
          top: 5px;

          background:
            #75888e;

          clip-path:
            polygon(
              50% 0%,
              100% 100%,
              0% 100%
            );

          opacity: .7;
        }

        /* CAT EYES */

        .cat-eye {
          position: absolute;

          width: 7px;
          height: 8px;

          top: 17px;

          border-radius: 50%;

          background:
            #142126;

          box-shadow:
            0 0 4px
            rgba(150,220,210,.35);

          animation:
            catBlink
            5.5s
            ease-in-out
            infinite;
        }

        .cat-eye-left {
          left: 10px;
        }

        .cat-eye-right {
          right: 10px;
        }

        .cat-eye span {
          position: absolute;

          width: 2px;
          height: 2px;

          top: 1px;
          left: 2px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.85);
        }

        @keyframes catBlink {

          0%,42% {
            transform:
              scaleY(1);
          }

          45% {
            transform:
              scaleY(.15);
          }

          48%,100% {
            transform:
              scaleY(1);
          }
        }

        /* CAT NOSE */

        .cat-nose {
          position: absolute;

          width: 4px;
          height: 3px;

          left: 19px;
          top: 26px;

          background:
            #6e858a;

          border-radius:
            50%;
        }

        /* CAT MOUTH */

        .cat-mouth {
          position: absolute;

          width: 7px;
          height: 4px;

          left: 17px;
          top: 28px;

          border-bottom:
            1px solid
            #63787d;

          border-radius:
            0 0 10px 10px;
        }

        /* CAT TAIL */

        .cat-tail {
          position: absolute;

          width: 23px;
          height: 20px;

          right: 5px;
          top: 35px;

          border:
            5px solid
            #9caeb2;

          border-left:
            0;

          border-bottom:
            0;

          border-radius:
            0
            22px
            0
            0;

          transform:
            rotate(20deg);

          z-index: 1;
        }

        /* CAT PAWS */

        .cat-paw {
          position: absolute;

          width: 13px;
          height: 9px;

          top: 40px;

          background:
            #dbe3e5;

          border-radius:
            50%;

          z-index: 7;

          box-shadow:
            0 2px 3px
            rgba(0,0,0,.18);
        }

        .cat-paw-left {
          left: 14px;
        }

        .cat-paw-right {
          right: 14px;
        }

        /* =========================================
           LOGO
           ========================================= */

        .logo-section {
          text-align: center;

          margin-bottom: 25px;

          /*
            Logo remains in front of cat.
          */

          padding-top: 55px;

          position: relative;

          z-index: 10;
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

        /* =========================================
           WELCOME
           ========================================= */

        .welcome-text {
          text-align: center;

          margin-bottom: 26px;
        }

        .welcome-text h2 {
          margin:
            0
            0
            7px;

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

        /* =========================================
           INPUT
           ========================================= */

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
            border-color
            .25s
            ease,

            box-shadow
            .25s
            ease,

            background
            .25s
            ease;
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

        /* =========================================
           OPTIONS
           ========================================= */

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

        /* =========================================
           SIGN IN BUTTON
           ========================================= */

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
            transform
            .2s
            ease,

            box-shadow
            .2s
            ease;

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

        /* =========================================
           FLUID WATER FILL
           ========================================= */

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
            1.55s
            ease-in-out
            infinite;
        }

        .fluid-wave-two {
          opacity: .38;

          bottom: -138%;

          animation:
            fluidRiseTwo
            1.9s
            ease-in-out
            infinite;

          animation-delay:
            -.35s;
        }

        .fluid-wave-three {
          opacity: .22;

          bottom: -142%;

          animation:
            fluidRiseThree
            2.25s
            ease-in-out
            infinite;

          animation-delay:
            -.7s;
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

        /* =========================================
           TINY RUNNING CHARACTER
           PUBG LOADING STYLE
           ========================================= */

        .running-character {
          position: absolute;

          left: 25%;

          bottom: 8px;

          width: 18px;
          height: 25px;

          z-index: 8;

          transform-origin:
            center bottom;

          animation:
            runnerMove
            1.15s
            linear
            infinite;
        }

        @keyframes runnerMove {

          0% {
            left: 18%;
            transform:
              scaleX(1)
              translateY(0);
          }

          25% {
            transform:
              scaleX(1)
              translateY(-1px);
          }

          50% {
            left: 50%;

            transform:
              scaleX(1)
              translateY(0);
          }

          75% {
            transform:
              scaleX(1)
              translateY(-1px);
          }

          100% {
            left: 82%;

            transform:
              scaleX(1)
              translateY(0);
          }

        }

        /* RUNNER BODY */

        .runner-body {
          position: absolute;

          width: 7px;
          height: 11px;

          left: 6px;
          top: 7px;

          border-radius:
            45%;

          background:
            linear-gradient(
              145deg,
              #f1f7f4,
              #9fc7bd
            );

          box-shadow:
            0 0 5px
            rgba(255,255,255,.4);
        }

        /* RUNNER HEAD */

        .runner-head {
          position: absolute;

          width: 6px;
          height: 6px;

          left: 6.5px;
          top: 0;

          border-radius: 50%;

          background:
            #eef5f2;

          box-shadow:
            0 0 4px
            rgba(255,255,255,.45);
        }

        /* RUNNER ARMS */

        .runner-arm {
          position: absolute;

          width: 3px;
          height: 10px;

          top: 8px;

          border-radius: 3px;

          background:
            #b8d9d1;

          transform-origin:
            top center;
        }

        .runner-arm-left {
          left: 4px;

          animation:
            armRun
            .28s
            ease-in-out
            infinite
            alternate;
        }

        .runner-arm-right {
          right: 4px;

          animation:
            armRunReverse
            .28s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes armRun {

          from {
            transform:
              rotate(38deg);
          }

          to {
            transform:
              rotate(-42deg);
          }

        }

        @keyframes armRunReverse {

          from {
            transform:
              rotate(-42deg);
          }

          to {
            transform:
              rotate(38deg);
          }

        }

        /* RUNNER LEGS */

        .runner-leg {
          position: absolute;

          width: 3px;
          height: 10px;

          top: 16px;

          border-radius: 3px;

          background:
            #a8ccc3;

          transform-origin:
            top center;
        }

        .runner-leg-left {
          left: 6px;

          animation:
            legRun
            .28s
            ease-in-out
            infinite
            alternate;
        }

        .runner-leg-right {
          left: 9px;

          animation:
            legRunReverse
            .28s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes legRun {

          from {
            transform:
              rotate(40deg);
          }

          to {
            transform:
              rotate(-42deg);
          }

        }

        @keyframes legRunReverse {

          from {
            transform:
              rotate(-42deg);
          }

          to {
            transform:
              rotate(40deg);
          }

        }

        /* SIGNING */

        .signing-text {
          position: relative;

          z-index: 12;

          color: white;

          font-weight: 700;

          text-shadow:
            0 1px 5px
            rgba(0,0,0,.45);

          animation:
            signingPulse
            1.1s
            ease-in-out
            infinite;
        }

        @keyframes signingPulse {

          0%,100% {
            opacity: .78;
          }

          50% {
            opacity: 1;
          }

        }

        /* =========================================
           REGISTER
           ========================================= */

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

        /* =========================================
           SECURITY
           ========================================= */

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

        /* =========================================
           MOBILE
           ========================================= */

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

          .cat-peek-wrapper {
            top: 30px;

            transform:
              scale(.90);
          }

          .logo-section {
            padding-top: 53px;
          }

          .welcome-text h2 {
            font-size: 22px;
          }

        }

        @media (max-height: 720px) {

          .login-card {
            padding-top: 30px;
          }

          .cat-peek-wrapper {
            top: 7px;
          }

          .logo-section {
            padding-top: 50px;
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
