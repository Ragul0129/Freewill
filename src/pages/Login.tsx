import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const startPageTransition = (destination: string) => {
    setTransitioning(true);

    setTimeout(() => {
      navigate(destination);
    }, 1050);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      if (!data.user || !data.session) {
        alert("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Login is successful.
      // Do not block login because of a profiles/role query.
      // ProtectedRoute will handle role-based access.
      const redirectTo = searchParams.get("redirect");
      const destination =
        redirectTo && redirectTo.startsWith("/")
          ? redirectTo
          : "/home";

      setLoading(false);
      startPageTransition(destination);
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in. Please try again.");
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
    <div
      className={`login-page ${
        transitioning ? "page-transitioning" : ""
      }`}
    >

      {/* =====================================================
          NORMAL HEALING BACKGROUND
      ====================================================== */}

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

      {/* =====================================================
          LOGIN CONTAINER
      ====================================================== */}

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
                  閴侊拷
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

                <span className="input-icon">
                  棣冩晙
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
                  disabled={transitioning}
                />

              </div>

            </div>

            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember">

                <input
                  type="checkbox"
                  disabled={transitioning}
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
                disabled={transitioning}
              >
                Forgot password?
              </button>

            </div>

            {/* SIGN IN */}

            <button
              type="submit"
              disabled={loading || transitioning}
              className={`login-button ${
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

                  <div className="cat-runner">

                    <div className="cat-glow"></div>
                    <div className="cat-shadow"></div>

                    <div className="cat-body">

                      <div className="cat-head">

                        <div className="cat-ear cat-ear-left"></div>
                        <div className="cat-ear cat-ear-right"></div>

                        <div className="cat-face">

                          <span className="cat-eye cat-eye-left"></span>
                          <span className="cat-eye cat-eye-right"></span>

                        </div>

                      </div>

                      <div className="cat-body-glow"></div>

                    </div>

                    <div className="cat-leg cat-leg-left"></div>
                    <div className="cat-leg cat-leg-right"></div>

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
                    閳拷
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

            <span>棣冩敿</span>

            <span>
              Your information is securely protected
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          PREMIUM HEALING PAGE TRANSITION
      ====================================================== */}

      {transitioning && (

        <div className="transition-overlay">

          {/* BACK DEPTH */}

          <div className="transition-depth"></div>

          {/* PARTICLE FIELD */}

          <div className="transition-particles">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </div>

          {/* CENTER ENERGY */}

          <div className="healing-core">

            <div className="core-ring ring-one"></div>
            <div className="core-ring ring-two"></div>
            <div className="core-ring ring-three"></div>

            <div className="core-light"></div>

          </div>

          {/* 3D WAVES */}

          <div className="transition-wave wave-front"></div>
          <div className="transition-wave wave-middle"></div>
          <div className="transition-wave wave-back"></div>

          {/* LIGHT SWEEP */}

          <div className="light-sweep"></div>

          {/* FREEWILL BRAND */}

          <div className="transition-brand">

            <div className="transition-logo">
              F
            </div>

            <div className="transition-title">
              FREEWILL
            </div>

            <div className="transition-subtitle">
              Human Empowerment
            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================================
           PAGE
        ====================================================== */

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

        /* =====================================================
           BACKGROUND
        ====================================================== */

        .ocean-bg {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;

          transition:
            transform 1s ease,
            filter 1s ease;
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

        /* =====================================================
           PARTICLES
        ====================================================== */

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

        .p1 { left: 5%; bottom: -10px; animation-duration: 13s; }
        .p2 { left: 11%; bottom: -20px; animation-duration: 17s; animation-delay: -5s; transform: scale(.55); }
        .p3 { left: 18%; bottom: -10px; animation-duration: 15s; animation-delay: -8s; }
        .p4 { left: 26%; bottom: -20px; animation-duration: 19s; animation-delay: -11s; transform: scale(.65); }
        .p5 { left: 33%; bottom: -10px; animation-duration: 14s; animation-delay: -4s; }
        .p6 { left: 40%; bottom: -20px; animation-duration: 18s; animation-delay: -13s; transform: scale(.55); }
        .p7 { left: 47%; bottom: -10px; animation-duration: 16s; animation-delay: -7s; }
        .p8 { left: 54%; bottom: -20px; animation-duration: 20s; animation-delay: -15s; transform: scale(.65); }
        .p9 { left: 61%; bottom: -10px; animation-duration: 15s; animation-delay: -6s; }
        .p10 { left: 68%; bottom: -20px; animation-duration: 18s; animation-delay: -10s; transform: scale(.55); }
        .p11 { left: 75%; bottom: -10px; animation-duration: 14s; animation-delay: -3s; }
        .p12 { left: 82%; bottom: -20px; animation-duration: 21s; animation-delay: -16s; transform: scale(.65); }
        .p13 { left: 89%; bottom: -10px; animation-duration: 17s; animation-delay: -9s; }
        .p14 { left: 95%; bottom: -20px; animation-duration: 15s; animation-delay: -5s; transform: scale(.55); }
        .p15 { left: 22%; bottom: -20px; animation-duration: 22s; animation-delay: -18s; transform: scale(.45); }
        .p16 { left: 44%; bottom: -10px; animation-duration: 19s; animation-delay: -14s; transform: scale(.5); }
        .p17 { left: 57%; bottom: -20px; animation-duration: 23s; animation-delay: -19s; transform: scale(.45); }
        .p18 { left: 73%; bottom: -10px; animation-duration: 20s; animation-delay: -12s; transform: scale(.5); }
        .p19 { left: 84%; bottom: -20px; animation-duration: 24s; animation-delay: -20s; transform: scale(.45); }
        .p20 { left: 38%; bottom: -10px; animation-duration: 18s; animation-delay: -9s; transform: scale(.4); }

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

            opacity: 0;
          }
        }

        /* =====================================================
           STREAMS
        ====================================================== */

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

        .stream-one { left: 14%; }
        .stream-two { left: 37%; animation-delay: -5s; }
        .stream-three { left: 65%; animation-delay: -9s; }
        .stream-four { left: 88%; animation-delay: -3s; }

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

        /* =====================================================
           AMBIENT
        ====================================================== */

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

        /* =====================================================
           WAVES
        ====================================================== */

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

        /* =====================================================
           CONTAINER
        ====================================================== */

        .login-container {
          width: 100%;
          max-width: 460px;

          padding:
            28px
            18px;

          position: relative;

          z-index: 10;

          transition:
            transform 1s cubic-bezier(.2,.8,.2,1),
            opacity .8s ease,
            filter .8s ease;
        }

        /* =====================================================
           GLASS CARD
        ====================================================== */

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

        /* =====================================================
           SUCCESS EXIT
        ====================================================== */

        .page-transitioning .login-container {
          opacity: 0;
          transform:
            scale(.72)
            translateY(-20px);

          filter:
            blur(12px);
        }

        .page-transitioning .ocean-bg {
          transform:
            scale(1.15);

          filter:
            blur(4px);
        }

        /* =====================================================
           LOGO
        ====================================================== */

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

        /* =====================================================
           WELCOME
        ====================================================== */

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

        /* =====================================================
           INPUT
        ====================================================== */

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

        /* =====================================================
           OPTIONS
        ====================================================== */

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

        /* =====================================================
           BUTTON
        ====================================================== */

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

        /* =====================================================
           LOADING BUTTON
        ====================================================== */

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

        /* =====================================================
           FLUID BUTTON
        ====================================================== */

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

        /* =====================================================
           CAT RUNNER
        ====================================================== */

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
            transform: scale(.75);
          }

          50% {
            opacity: .9;
            transform: scale(1.12);
          }
        }

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

        .cat-tail {
          position: absolute;

          width: 12px;
          height: 9px;

          left: 14px;
          top: 8px;

          border:
            3px solid
            #a5c0b8;

          border-left: 0;
          border-bottom: 0;

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

        /* =====================================================
           REGISTER
        ====================================================== */

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

        /* =====================================================
           SECURITY
        ====================================================== */

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

        /* =====================================================
           PREMIUM TRANSITION OVERLAY
        ====================================================== */

        .transition-overlay {
          position: fixed;

          inset: 0;

          z-index: 9999;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(36,135,132,.30),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #01090d,
              #032128 48%,
              #011015
            );

          pointer-events: all;

          animation:
            overlayAppear
            1.05s
            cubic-bezier(.2,.8,.2,1)
            forwards;
        }

        @keyframes overlayAppear {

          0% {
            opacity: 0;
          }

          18% {
            opacity: 1;
          }

          100% {
            opacity: 1;
          }
        }

        /* =====================================================
           DEPTH
        ====================================================== */

        .transition-depth {
          position: absolute;

          inset: -30%;

          background:
            radial-gradient(
              ellipse at center,
              rgba(78,211,191,.18),
              transparent 35%
            );

          filter:
            blur(50px);

          transform:
            scale(.4);

          animation:
            depthExpand
            1.05s
            cubic-bezier(.16,.8,.2,1)
            forwards;
        }

        @keyframes depthExpand {

          0% {
            transform:
              scale(.35)
              rotate(0deg);

            opacity: .2;
          }

          45% {
            transform:
              scale(1)
              rotate(2deg);

            opacity: .75;
          }

          100% {
            transform:
              scale(1.45)
              rotate(-3deg);

            opacity: .15;
          }
        }

        /* =====================================================
           TRANSITION PARTICLES
        ====================================================== */

        .transition-particles {
          position: absolute;

          inset: 0;

          perspective: 900px;
        }

        .transition-particles span {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #e8fff8,
              #62d7c3
            );

          box-shadow:
            0 0 8px
            rgba(108,226,204,.9),

            0 0 25px
            rgba(80,199,181,.5);

          opacity: 0;

          animation:
            transitionParticle
            1.05s
            cubic-bezier(.15,.75,.2,1)
            forwards;
        }

        .transition-particles span:nth-child(1) { --x: -48vw; --y: -38vh; --s: 1.2; }
        .transition-particles span:nth-child(2) { --x: 43vw; --y: -32vh; --s: .7; }
        .transition-particles span:nth-child(3) { --x: -36vw; --y: 34vh; --s: .9; }
        .transition-particles span:nth-child(4) { --x: 39vw; --y: 38vh; --s: 1.1; }
        .transition-particles span:nth-child(5) { --x: -22vw; --y: -42vh; --s: .6; }
        .transition-particles span:nth-child(6) { --x: 18vw; --y: -39vh; --s: .8; }
        .transition-particles span:nth-child(7) { --x: -45vw; --y: 5vh; --s: .7; }
        .transition-particles span:nth-child(8) { --x: 44vw; --y: -5vh; --s: .9; }
        .transition-particles span:nth-child(9) { --x: -17vw; --y: 40vh; --s: 1; }
        .transition-particles span:nth-child(10) { --x: 23vw; --y: 42vh; --s: .6; }
        .transition-particles span:nth-child(11) { --x: -49vw; --y: -15vh; --s: .5; }
        .transition-particles span:nth-child(12) { --x: 48vw; --y: 18vh; --s: .7; }
        .transition-particles span:nth-child(13) { --x: -30vw; --y: -10vh; --s: .5; }
        .transition-particles span:nth-child(14) { --x: 31vw; --y: 12vh; --s: .8; }
        .transition-particles span:nth-child(15) { --x: -10vw; --y: -45vh; --s: .7; }
        .transition-particles span:nth-child(16) { --x: 9vw; --y: 45vh; --s: .8; }
        .transition-particles span:nth-child(17) { --x: -40vw; --y: 25vh; --s: .5; }
        .transition-particles span:nth-child(18) { --x: 40vw; --y: -24vh; --s: .7; }
        .transition-particles span:nth-child(19) { --x: -25vw; --y: 25vh; --s: .6; }
        .transition-particles span:nth-child(20) { --x: 26vw; --y: -27vh; --s: .9; }

        @keyframes transitionParticle {

          0% {
            transform:
              translate3d(
                var(--x),
                var(--y),
                180px
              )
              scale(0);

            opacity: 0;
          }

          38% {
            opacity: 1;
          }

          68% {
            transform:
              translate3d(
                calc(var(--x) * .28),
                calc(var(--y) * .28),
                80px
              )
              scale(var(--s));

            opacity: 1;
          }

          100% {
            transform:
              translate3d(0,0,0)
              scale(0);

            opacity: 0;
          }
        }

        /* =====================================================
           HEALING CORE
        ====================================================== */

        .healing-core {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 150px;
          height: 150px;

          transform:
            translate(-50%,-50%)
            scale(.2);

          animation:
            coreAppear
            1.05s
            cubic-bezier(.16,.8,.2,1)
            forwards;
        }

        @keyframes coreAppear {

          0% {
            transform:
              translate(-50%,-50%)
              scale(.15);
          }

          45% {
            transform:
              translate(-50%,-50%)
              scale(1);
          }

          100% {
            transform:
              translate(-50%,-50%)
              scale(1.8);
          }
        }

        .core-light {
          position: absolute;

          width: 70px;
          height: 70px;

          left: 40px;
          top: 40px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(230,255,249,1),
              rgba(105,222,202,.45),
              transparent 70%
            );

          filter:
            blur(4px);

          box-shadow:
            0 0 50px
            rgba(93,224,203,.75);
        }

        .core-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            rgba(127,235,216,.55);

          transform:
            translate(-50%,-50%);

          animation:
            ringPulse
            1.05s
            ease-out
            forwards;
        }

        .ring-one {
          width: 80px;
          height: 80px;
        }

        .ring-two {
          width: 110px;
          height: 110px;

          opacity: .55;
        }

        .ring-three {
          width: 145px;
          height: 145px;

          opacity: .25;
        }

        @keyframes ringPulse {

          0% {
            transform:
              translate(-50%,-50%)
              scale(.3);

            opacity: 0;
          }

          35% {
            opacity: 1;
          }

          100% {
            transform:
              translate(-50%,-50%)
              scale(1.6);

            opacity: 0;
          }
        }

        /* =====================================================
           3D HEALING WAVES
        ====================================================== */

        .transition-wave {
          position: absolute;

          left: -65%;

          width: 230%;

          height: 115%;

          top: 5%;

          border-radius:
            48%
            52%
            48%
            52%;

          transform:
            translateX(-120%)
            rotate(-8deg)
            skewX(-8deg);

          transform-origin:
            center center;

          background:
            linear-gradient(
              120deg,
              rgba(8,55,66,.95),
              rgba(26,119,120,.96),
              rgba(78,205,186,.92),
              rgba(5,44,54,.98)
            );

          box-shadow:
            0 0 100px
            rgba(69,213,194,.28),

            inset
            0 0 100px
            rgba(192,255,241,.12);

          animation:
            waveSweep
            1.05s
            cubic-bezier(.18,.78,.2,1)
            forwards;
        }

        .wave-front {
          z-index: 7;

          filter:
            blur(0px);

          animation-delay:
            .08s;
        }

        .wave-middle {
          z-index: 6;

          opacity: .65;

          transform:
            translateX(-130%)
            rotate(-10deg)
            scale(1.08);

          animation:
            waveSweepMiddle
            1.05s
            cubic-bezier(.18,.78,.2,1)
            forwards;

          animation-delay:
            .03s;
        }

        .wave-back {
          z-index: 5;

          opacity: .3;

          transform:
            translateX(-140%)
            rotate(-12deg)
            scale(1.16);

          animation:
            waveSweepBack
            1.05s
            cubic-bezier(.18,.78,.2,1)
            forwards;
        }

        @keyframes waveSweep {

          0% {
            transform:
              translateX(-120%)
              rotate(-8deg)
              skewX(-8deg);

            opacity: 0;
          }

          20% {
            opacity: .9;
          }

          55% {
            transform:
              translateX(-5%)
              rotate(-3deg)
              skewX(-3deg);

            opacity: 1;
          }

          100% {
            transform:
              translateX(110%)
              rotate(5deg)
              skewX(5deg);

            opacity: 1;
          }
        }

        @keyframes waveSweepMiddle {

          0% {
            transform:
              translateX(-130%)
              rotate(-10deg)
              scale(1.08);
          }

          50% {
            transform:
              translateX(0)
              rotate(-2deg)
              scale(1.04);
          }

          100% {
            transform:
              translateX(120%)
              rotate(6deg)
              scale(1);
          }
        }

        @keyframes waveSweepBack {

          0% {
            transform:
              translateX(-140%)
              rotate(-12deg)
              scale(1.16);
          }

          50% {
            transform:
              translateX(5%)
              rotate(-3deg)
              scale(1.08);
          }

          100% {
            transform:
              translateX(125%)
              rotate(7deg)
              scale(1);
          }
        }

        /* =====================================================
           LIGHT SWEEP
        ====================================================== */

        .light-sweep {
          position: absolute;

          z-index: 15;

          top: -20%;

          left: -30%;

          width: 22%;

          height: 140%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(234,255,249,.8),
              rgba(117,232,211,.45),
              transparent
            );

          filter:
            blur(14px);

          transform:
            rotate(12deg)
            translateX(-100vw);

          animation:
            lightSweep
            1.05s
            cubic-bezier(.2,.75,.2,1)
            forwards;

          animation-delay:
            .15s;
        }

        @keyframes lightSweep {

          0% {
            transform:
              rotate(12deg)
              translateX(-100vw);

            opacity: 0;
          }

          25% {
            opacity: .9;
          }

          100% {
            transform:
              rotate(12deg)
              translateX(700vw);

            opacity: 0;
          }
        }

        /* =====================================================
           BRAND
        ====================================================== */

        .transition-brand {
          position: absolute;

          z-index: 20;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%,-50%)
            scale(.7);

          text-align: center;

          opacity: 0;

          animation:
            brandReveal
            1.05s
            ease-out
            forwards;

          animation-delay:
            .48s;
        }

        @keyframes brandReveal {

          0% {
            opacity: 0;

            transform:
              translate(-50%,-50%)
              scale(.7);
          }

          35% {
            opacity: 1;
          }

          70% {
            opacity: 1;

            transform:
              translate(-50%,-50%)
              scale(1);
          }

          100% {
            opacity: 0;

            transform:
              translate(-50%,-50%)
              scale(1.15);
          }
        }

        .transition-logo {
          width: 52px;
          height: 52px;

          margin:
            0
            auto
            12px;

          border-radius: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 25px;
          font-weight: 700;

          color:
            #e7fff8;

          border:
            1px solid
            rgba(222,255,248,.35);

          background:
            rgba(255,255,255,.08);

          box-shadow:
            0 0 35px
            rgba(97,224,204,.35),

            inset
            0 0 20px
            rgba(196,255,242,.08);
        }

        .transition-title {
          font-size: 25px;

          letter-spacing: 5px;

          font-weight: 700;

          color:
            white;

          text-shadow:
            0 0 25px
            rgba(118,236,216,.5);
        }

        .transition-subtitle {
          margin-top: 6px;

          font-size: 10px;

          letter-spacing: 3px;

          text-transform: uppercase;

          color:
            rgba(225,255,249,.62);
        }

        /* =====================================================
           MOBILE
        ====================================================== */

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

          .transition-title {
            font-size: 22px;
            letter-spacing: 4px;
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

        /* =====================================================
           REDUCE MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .transition-overlay,
          .transition-wave,
          .transition-particles span,
          .healing-core,
          .transition-brand,
          .light-sweep {
            animation-duration:
              .7s;
          }

        }

      `}</style>

    </div>
  );
}

export default Login;
