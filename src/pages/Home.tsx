<div className="relative">

  <div className="absolute -inset-5 rounded-[2rem] bg-[#e6d9bb]/50" />

  <div className="relative overflow-hidden rounded-[2rem] bg-[#0d4743] p-6 md:p-8">

    {/* PREMIUM MENTAL WELLNESS ANIMATION */}
    <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#083b38]">

      {/* Soft ambient glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[#eab34a]/10 blur-3xl animate-pulse" />

      {/* Floating particles */}
      <div className="absolute left-[18%] top-[20%] h-2 w-2 rounded-full bg-[#eab34a]/60 animate-pulse" />
      <div className="absolute right-[20%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
      <div className="absolute left-[25%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-[#eab34a]/50 animate-pulse" />
      <div className="absolute right-[27%] bottom-[22%] h-2 w-2 rounded-full bg-white/30 animate-pulse" />

      {/* Breathing rings */}
      <svg
        viewBox="0 0 400 400"
        className="relative z-10 h-[330px] w-[330px] md:h-[370px] md:w-[370px]"
      >

        <defs>

          <radialGradient id="wellnessGlow">
            <stop offset="0%" stopColor="#eab34a" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#eab34a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#eab34a" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="wellnessGold"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#eab34a" />
            <stop offset="100%" stopColor="#c88d22" />
          </linearGradient>

        </defs>

        {/* Outer breathing glow */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="url(#wellnessGlow)"
        >
          <animate
            attributeName="r"
            values="140;155;140"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.55;0.9;0.55"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Outer rings */}
        <circle
          cx="200"
          cy="200"
          r="125"
          fill="none"
          stroke="#eab34a"
          strokeOpacity="0.18"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="115;130;115"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="#eab34a"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        >
          <animate
            attributeName="r"
            values="92;105;92"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Human head / mind silhouette */}
        <path
          d="M200 105
             C153 105 125 139 125 184
             C125 218 143 241 165 254
             C177 261 180 274 180 292
             L220 292
             C220 274 223 261 235 254
             C257 241 275 218 275 184
             C275 139 247 105 200 105Z"
          fill="#f7f4ed"
          fillOpacity="0.96"
        />

        {/* Neck */}
        <path
          d="M178 286 L178 315
             C178 327 166 334 154 338
             L246 338
             C234 334 222 327 222 315
             L222 286Z"
          fill="#f7f4ed"
          fillOpacity="0.96"
        />

        {/* Inner mind glow */}
        <circle
          cx="200"
          cy="185"
          r="35"
          fill="url(#wellnessGlow)"
        >
          <animate
            attributeName="r"
            values="28;42;28"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Mind / consciousness lines */}
        <path
          d="M168 183
             C181 168 192 197 203 181
             C213 166 222 190 235 176"
          fill="none"
          stroke="url(#wellnessGold)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.45;1;0.45"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M170 207
             C183 192 193 218 204 202
             C215 187 224 211 233 199"
          fill="none"
          stroke="#0d4743"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Golden center point */}
        <circle
          cx="200"
          cy="185"
          r="5"
          fill="#eab34a"
        >
          <animate
            attributeName="r"
            values="4;7;4"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Small orbiting dot */}
        <circle
          cx="200"
          cy="65"
          r="4"
          fill="#eab34a"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

      </svg>

      {/* Animation caption */}
      <div className="absolute bottom-7 left-0 right-0 z-20 text-center">

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#eab34a]">
          Mind · Balance · Growth
        </p>

        <p className="mt-2 text-sm text-white/60">
          Pause. Understand. Transform.
        </p>

      </div>

    </div>

    <div className="border-t border-white/10 pt-5 text-center">

      <p className="text-xs uppercase tracking-[0.2em] text-[#eab34a]">
        Human Empowerment
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        FREEWILL
      </h3>

      <p className="mt-2 text-sm text-white/60">
        Empowering people to understand themselves better.
      </p>

    </div>

  </div>

</div>
