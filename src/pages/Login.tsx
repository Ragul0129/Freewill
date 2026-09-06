import { useState } from "react";
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
          HEALING BACKGROUND
      ========================== */}

      <div className="ocean-bg">

        <div className="stars"></div>

        {/* 3D HEALING PARTICLES */}

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

        {/* SOFT HEALING LIGHT STREAMS */}

        <div className="healing-stream stream-one"></div>
        <div className="healing-stream stream-two"></div>
        <div className="healing-stream stream-three"></div>
        <div className="healing-stream stream-four"></div>

        {/* AMBIENT LIGHT */}

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>

        {/* OCEAN WAVES */}

        <div className="wave wave-one"></div>
        <div className="wave wave-two"></div>
        <div className="wave wave-three"></div>

      </div>

      {/* =========================
          LOGIN CONTAINER
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
                SIGN IN
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
                      TINY GLOWING 3D CAT
                  ========================== */}

                  <div className="cat-runner">

                    <div className="cat-glow"></div>

                    <div className="cat-shadow"></div>

                    {/* BODY */}

                    <div className="cat-body">

                      {/* HEAD */}

                      <div className="cat-head">

                        {/* EARS */}

                        <div className="cat-ear cat-ear-left"></div>
                        <div className="cat-ear cat-ear-right"></div>

                        {/* FACE */}

                        <div className="cat-face">

                          <span className="cat-eye cat-eye-left"></span>
                          <span className="cat-eye cat-eye-right"></span>

                        </div>

                      </div>

                      {/* BODY GLOW */}

                      <div className="cat-body-glow"></div>

                    </div>

                    {/* LEGS */}

                    <div className="cat-leg cat-leg-left"></div>
                    <div className="cat-leg cat-leg-right"></div>

                    {/* TAIL */}

                    <div className="cat-tail"></div>

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

      {/* =========================
          STYLES
      ========================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =================================
           PAGE
        ================================= */

        .login-page {
          min-height: 100vh;
          width: 100%;

          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 12%,
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

        /* =================================
           BACKGROUND
        ================================= */

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

        /* =================================
           HEALING PARTICLES
        ================================= */

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

        .p1 {
          left: 5%;
          bottom: -10px;
          animation-duration: 13s;
        }

        .p2 {
          left: 11%;
          bottom: -20px;
          animation-duration: 17s;
          animation-delay: -5s;
          transform: scale(.55);
        }

        .p3 {
          left: 18%;
          bottom: -10px;
          animation-duration: 15s;
          animation-delay: -8s;
        }

        .p4 {
          left: 26%;
          bottom: -20px;
          animation-duration: 19s;
          animation-delay: -11s;
          transform: scale(.65);
        }

        .p5 {
          left: 33%;
          bottom: -10px;
          animation-duration: 14s;
          animation-delay: -4s;
        }

        .p6 {
          left: 40%;
          bottom: -20px;
          animation-duration: 18s;
          animation-delay: -13s;
          transform: scale(.55);
        }

        .p7 {
          left: 47%;
          bottom: -10px;
          animation-duration: 16s;
          animation-delay: -7s;
        }

        .p8 {
          left: 54%;
          bottom: -20px;
          animation-duration: 20s;
          animation-delay: -15s;
          transform: scale(.65);
        }

        .p9 {
          left: 61%;
          bottom: -10px;
          animation-duration: 15s;
          animation-delay: -6s;
        }

        .p10 {
          left: 68%;
          bottom: -20px;
          animation-duration: 18s;
          animation-delay: -10s;
          transform: scale(.55);
        }

        .p11 {
          left: 75%;
          bottom: -10px;
          animation-duration: 14s;
          animation-delay: -3s;
        }

        .p12 {
          left: 82%;
          bottom: -20px;
          animation-duration: 21s;
          animation-delay: -16s;
          transform: scale(.65);
        }

        .p13 {
          left: 89%;
          bottom: -10px;
          animation-duration: 17s;
          animation-delay: -9s;
        }

        .p14 {
          left: 95%;
          bottom: -20px;
          animation-duration: 15s;
          animation-delay: -5s;
          transform: scale(.55);
        }

        .p15 {
          left: 22%;
          bottom: -20px;
          animation-duration: 22s;
          animation-delay: -18s;
          transform: scale(.45);
        }

        .p16 {
          left: 44%;
          bottom: -10px;
          animation-duration: 19s;
          animation-delay: -14s;
          transform: scale(.5);
        }

        .p17 {
          left: 57%;
          bottom: -20px;
          animation-duration: 23s;
          animation-delay: -19s;
          transform: scale(.45);
        }

        .p18 {
          left: 73%;
          bottom: -10px;
          animation-duration: 20s;
          animation-delay: -12s;
          transform: scale(.5);
        }

        .p19 {
          left: 84%;
          bottom: -20px;
          animation-duration: 24s;
          animation-delay: -20s;
          transform: scale(.45);
        }

        .p20 {
          left: 38%;
          bottom: -10px;
          animation-duration: 18s;
          animation-delay: -9s;
          transform: scale(.4);
        }

        @keyframes healingParticle {

          0% {
            transform:
              translate3d(0,0,0)
              scale(.45);

            opacity: 0;
          }

          12% {
            opacity: .65;
          }

          30% {
            transform:
              translate3d(
                24px,
                -28vh,
                70px
              )
              scale(1);
          }

          55% {
            transform:
              translate3d(
                -18px,
                -57vh,
                20px
              )
              scale(.8);
          }

          78% {
            transform:
              translate3d(
                30px,
                -82vh,
                -40px
              )
              scale(.6);
          }

          100% {
            transform:
              translate3d(
                -10px,
                -112vh,
                -80px
              )
              scale(.2);

            opacity: 0;
          }
        }

        /* =================================
           LIGHT STREAMS
        ================================= */

        .healing-stream {
          position: absolute;

          width: 2px;
          height: 60%;

          top: 110%;

          border-radius: 50%;

          background:
            linear-gradient(
              to top,
              transparent,
              rgba(96,225,204,.28),
              transparent
            );

          filter: blur(1px);

          animation:
            streamFlow
            13s
            ease-in-out
            infinite;
        }

        .stream-one {
          left: 14%;
        }

        .stream-two {
          left: 37%;
          animation-delay: -5s;
        }

        .stream-three {
          left: 65%;
          animation-delay: -9s;
        }

        .stream-four {
          left: 88%;
          animation-delay: -3s;
        }

        @keyframes streamFlow {

          0% {
            transform:
              translateY(0)
              rotate(-8deg);

            opacity: 0;
          }

          20% {
            opacity: .35;
          }

          65% {
            opacity: .18;
          }

          100% {
            transform:
              translateY(-145vh)
              rotate(8deg);

            opacity: 0;
          }
        }

        /* =================================
           AMBIENT
        ================================= */

        .ambient {
          position: absolute;

          border-radius: 50%;

          filter: blur(90px);

          opacity: .16;
        }

        .ambient-one {
          width: 320px;
          height: 320px;

          top: -140px;
          left: -120px;

          background: #0b8e89;
        }

        .ambient-two {
          width: 360px;
          height: 360px;

          right: -170px;
          bottom: -170px;

          background: #1c5573;
        }

        .ambient-three {
          width: 260px;
          height: 260px;

          left: 45%;
          top: 28%;

          background: #42a996;

          opacity: .045;
        }

        /* =================================
           WAVES
        ================================= */

        .wave {
          position: absolute;

          width: 180%;

          left: -40%;

          border-radius: 50%;

          transform: rotate(-4deg);

          border:
            1px solid
            rgba(110,224,209,.08);

          box-shadow:
            0 0 70px
            rgba(46,185,177,.05);
        }

        .wave-one {
          height: 280px;
          bottom: -180px;
        }

        .wave-two {
          height: 390px;
          bottom: -270px;
        }

        .wave-three {
          height: 520px;
          bottom: -380px;
        }

        /* =================================
           CONTAINER
        ================================= */

        .login-container {
          width: 100%;
          max-width: 460px;

          padding:
            28px
            18px;

          position: relative;

          z-index: 10;
        }

        /* =================================
           GLASS CARD
        ================================= */

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

        /* =================================
           LOGO
        ================================= */

        .logo-section {
          text-align: center;

          margin-bottom: 25px;
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

        /* =================================
           WELCOME
        ================================= */

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

        /* =================================
           INPUT
        ================================= */

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

        /* =================================
           OPTIONS
        ================================= */

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

        /* =================================
           BUTTON
        ================================= */

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

        /* =================================
           LOADING BUTTON
        ================================= */

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
            rgba(43,155,145,.28);
        }

        /* =================================
           FLUID
        ================================= */

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

          bottom: -136%;

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
          opacity: .35;

          animation:
            fluidRiseTwo
            4.5s
            ease-in-out
            infinite;

          animation-delay:
            -.7s;
        }

        .fluid-wave-three {
          opacity: .18;

          animation:
            fluidRiseThree
            5s
            ease-in-out
            infinite;

          animation-delay:
            -1.2s;
        }

        @keyframes fluidRise {

          0% {
            transform:
              translateX(-7%)
              rotate(0deg);

            bottom: -136%;
          }

          50% {
            transform:
              translateX(7%)
              rotate(2deg);

            bottom: -113%;
          }

          100% {
            transform:
              translateX(-7%)
              rotate(0deg);

            bottom: -136%;
          }
        }

        @keyframes fluidRiseTwo {

          0% {
            transform:
              translateX(7%)
              rotate(0deg);

            bottom: -140%;
          }

          50% {
            transform:
              translateX(-7%)
              rotate(-2deg);

            bottom: -118%;
          }

          100% {
            transform:
              translateX(7%)
              rotate(0deg);

            bottom: -140%;
          }
        }

        @keyframes fluidRiseThree {

          0% {
            transform:
              translateX(-6%)
              rotate(1deg);

            bottom: -144%;
          }

          50% {
            transform:
              translateX(6%)
              rotate(-1deg);

            bottom: -121%;
          }

          100% {
            transform:
              translateX(-6%)
              rotate(1deg);

            bottom: -144%;
          }
        }

        /* =================================
           TINY 3D CAT
        ================================= */

        .cat-runner {
          position: absolute;

          left: 7%;
          bottom: 10px;

          width: 23px;
          height: 28px;

          z-index: 30;

          transform-origin:
            center bottom;

          animation:
            catRun
            6.5s
            linear
            infinite;
        }

        @keyframes catRun {

          0% {
            left: 6%;

            transform:
              translateY(0)
              scale(.9);
          }

          12% {
            transform:
              translateY(-1px)
              scale(.93);
          }

          25% {
            transform:
              translateY(0)
              scale(.9);
          }

          42% {
            left: 35%;

            transform:
              translateY(-1px)
              scale(.93);
          }

          60% {
            left: 55%;

            transform:
              translateY(0)
              scale(.9);
          }

          78% {
            left: 76%;

            transform:
              translateY(-1px)
              scale(.93);
          }

          100% {
            left: 96%;

            transform:
              translateY(0)
              scale(.9);
          }
        }

        /* =================================
           CAT GLOW
        ================================= */

        .cat-glow {
          position: absolute;

          width: 25px;
          height: 25px;

          left: -1px;
          top: 2px;

          border-radius: 50%;

          background:
            rgba(210,255,238,.30);

          filter:
            blur(7px);

          animation:
            catGlow
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes catGlow {

          0%,100% {
            opacity: .45;

            transform:
              scale(.75);
          }

          50% {
            opacity: .9;

            transform:
              scale(1.12);
          }
        }

        /* =================================
           CAT BODY
        ================================= */

        .cat-body {
          position: absolute;

          left: 5px;
          top: 9px;

          width: 14px;
          height: 14px;

          border-radius:
            45%
            48%
            42%
            42%;

          background:
            linear-gradient(
              145deg,
              #eef9f4,
              #9ebdb5
            );

          box-shadow:
            inset
            -3px
            -3px
            4px
            rgba(0,0,0,.22),

            inset
            2px
            2px
            4px
            rgba(255,255,255,.5),

            0 2px 8px
            rgba(0,0,0,.35);
        }

        /* =================================
           CAT HEAD
        ================================= */

        .cat-head {
          position: absolute;

          width: 15px;
          height: 13px;

          left: -1px;
          top: -7px;

          border-radius:
            48%
            48%
            45%
            45%;

          background:
            linear-gradient(
              145deg,
              #f5fff9,
              #a8c5bd
            );

          box-shadow:
            inset
            -2px
            -2px
            3px
            rgba(0,0,0,.18),

            inset
            2px
            2px
            3px
            rgba(255,255,255,.55);
        }

        /* =================================
           CAT EARS
        ================================= */

        .cat-ear {
          position: absolute;

          width: 6px;
          height: 6px;

          top: -3px;

          background:
            linear-gradient(
              145deg,
              #f3fbf7,
              #92b3aa
            );

          transform:
            rotate(45deg);

          border-radius:
            2px 3px 1px 3px;
        }

        .cat-ear-left {
          left: 1px;
        }

        .cat-ear-right {
          right: 1px;
        }

        /* =================================
           CAT FACE
        ================================= */

        .cat-face {
          position: absolute;

          inset: 0;
        }

        .cat-eye {
          position: absolute;

          width: 2px;
          height: 2px;

          top: 6px;

          border-radius: 50%;

          background:
            #5ce3cd;

          box-shadow:
            0 0 4px
            rgba(92,227,205,.9);
        }

        .cat-eye-left {
          left: 4px;
        }

        .cat-eye-right {
          right: 4px;
        }

        /* =================================
           BODY GLOW
        ================================= */

        .cat-body-glow {
          position: absolute;

          width: 7px;
          height: 7px;

          left: 4px;
          top: 4px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.28);

          filter:
            blur(3px);
        }

        /* =================================
           CAT LEGS
        ================================= */

        .cat-leg {
          position: absolute;

          width: 3px;
          height: 8px;

          top: 20px;

          border-radius: 3px;

          background:
            linear-gradient(
              180deg,
              #c7ddd7,
              #769890
            );

          transform-origin:
            top center;
        }

        .cat-leg-left {
          left: 7px;

          animation:
            catLegOne
            .48s
            ease-in-out
            infinite
            alternate;
        }

        .cat-leg-right {
          left: 13px;

          animation:
            catLegTwo
            .48s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes catLegOne {

          from {
            transform:
              rotate(35deg);
          }

          to {
            transform:
              rotate(-35deg);
          }
        }

        @keyframes catLegTwo {

          from {
            transform:
              rotate(-35deg);
          }

          to {
            transform:
              rotate(35deg);
          }
        }

        /* =================================
           CAT TAIL
        ================================= */

        .cat-tail {
          position: absolute;

          width: 12px;
          height: 9px;

          left: 14px;
          top: 8px;

          border:
            3px solid
            #a5c0b8;

          border-left:
            0;

          border-bottom:
            0;

          border-radius:
            0
            10px
            10px
            0;

          transform:
            rotate(-20deg);

          transform-origin:
            left bottom;

          animation:
            catTail
            .7s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes catTail {

          from {
            transform:
              rotate(-25deg);
          }

          to {
            transform:
              rotate(18deg);
          }
        }

        /* =================================
           CAT SHADOW
        ================================= */

        .cat-shadow {
          position: absolute;

          width: 16px;
          height: 3px;

          left: 3px;
          bottom: -2px;

          border-radius: 50%;

          background:
            rgba(0,0,0,.30);

          filter:
            blur(2px);

          animation:
            catShadow
            .48s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes catShadow {

          from {
            transform:
              scaleX(.72);
          }

          to {
            transform:
              scaleX(1);
          }
        }

        /* =================================
           SIGNING TEXT
        ================================= */

        .signing-text {
          position: relative;

          z-index: 40;

          color: white;

          font-weight: 700;

          text-shadow:
            0 1px 6px
            rgba(0,0,0,.55);

          animation:
            signingPulse
            1.8s
            ease-in-out
            infinite;
        }

        @keyframes signingPulse {

          0%,100% {
            opacity: .72;
          }

          50% {
            opacity: 1;
          }
        }

        /* =================================
           REGISTER
        ================================= */

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

        /* =================================
           SECURITY
        ================================= */

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

        /* =================================
           MOBILE
        ================================= */

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
