/* ========================================================= */
/* ============== 3D VERTICAL EXPERT CAROUSEL ============= */
/* ========================================================= */

function ExpertCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const experts = [
    {
      image: bossImage,
      experience: "26 YEARS EXPERIENCE",
      role: "Founder / CEO",
      name: "Simon Anand Raj",
      title: "Emotional Intelligence Coach",
      description:
        "Simon Anand Raj is the Founder & CEO and an experienced Emotional Intelligence Coach with 26 years of professional experience in training, coaching, mentoring and human development.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Extended sessions and specialised programs may range from ₹5,000 to ₹50,000.",
    },

    {
      image: jeevithaImage,
      experience: "5 YEARS EXPERIENCE",
      role: "Clinical Psychologist / Project Head",
      name: "Jeevitha S",
      title: "Clinical Psychologist & Project Head",
      description:
        "Jeevitha S is a Clinical Psychologist and Project Head with 5 years of experience in counselling, coaching and professional training. She focuses on creating a supportive and structured environment where individuals can gain clarity and develop emotional awareness.",
      services: [
        ["One Hour", "₹1,500"],
        ["Psychometric Analysis", "₹2,500"],
        ["One-to-One Session", "₹3,000"],
        ["Training Sessions", "₹12,000"],
        ["Mentoring", "₹25,000"],
      ],
      note:
        "Session pricing may range from ₹1,000 to ₹10,000 depending on the service.",
    },

    {
      image: rahulImage,
      experience: "7 YEARS EXPERIENCE",
      role: "Life Coach / Content Head",
      name: "Rahul K.P",
      title: "Life Coach & Content Head",
      description:
        "Rahul K.P is a Life Coach and Content Head with 7 years of experience in training and content management. His work combines personal development, structured learning and effective communication.",
      services: [
        ["Life Coaching", "Available"],
        ["Personal Development", "Available"],
        ["Content Management", "Available"],
      ],
      note:
        "Service pricing will be available based on the selected program.",
    },
  ];

  /*
   * Each expert becomes a full vertical scroll stage.
   * When the user scrolls down/up, the active card changes.
   */

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      /*
       * Only control the carousel when the expert section
       * is roughly in the viewport.
       */

      const section = document.getElementById("experts");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const sectionVisible =
        rect.top < window.innerHeight * 0.65 &&
        rect.bottom > window.innerHeight * 0.35;

      if (!sectionVisible) return;

      if (Math.abs(event.deltaY) < 10) return;

      if (isAnimating) {
        event.preventDefault();
        return;
      }

      /*
       * SCROLL DOWN
       * Current → previous/back
       * Next expert comes from RIGHT SIDE.
       */

      if (event.deltaY > 0) {
        if (activeIndex < experts.length - 1) {
          event.preventDefault();

          setIsAnimating(true);

          setActiveIndex((prev) => prev + 1);

          setTimeout(() => {
            setIsAnimating(false);
          }, 850);
        }
      }

      /*
       * SCROLL UP
       * Previous expert returns from LEFT/BACK side.
       */

      if (event.deltaY < 0) {
        if (activeIndex > 0) {
          event.preventDefault();

          setIsAnimating(true);

          setActiveIndex((prev) => prev - 1);

          setTimeout(() => {
            setIsAnimating(false);
          }, 850);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, isAnimating, experts.length]);

  /*
   * Touch support for mobile.
   * User can still swipe naturally.
   */

  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStart.current === null) return;

      const endY = event.changedTouches[0].clientY;

      const difference =
        touchStart.current - endY;

      touchStart.current = null;

      if (Math.abs(difference) < 50) return;

      if (isAnimating) return;

      if (difference > 0) {
        if (activeIndex < experts.length - 1) {
          setIsAnimating(true);
          setActiveIndex((prev) => prev + 1);

          setTimeout(() => {
            setIsAnimating(false);
          }, 850);
        }
      } else {
        if (activeIndex > 0) {
          setIsAnimating(true);
          setActiveIndex((prev) => prev - 1);

          setTimeout(() => {
            setIsAnimating(false);
          }, 850);
        }
      }
    };

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, [activeIndex, isAnimating, experts.length]);

  /*
   * Book specific session
   */

  const bookSession = (
    expertName: string,
    serviceName: string
  ) => {
    /*
     * Booking page can read these query parameters.
     * This keeps the exact selected expert/session.
     */

    navigate(
      `/booking?expert=${encodeURIComponent(
        expertName
      )}&service=${encodeURIComponent(
        serviceName
      )}`
    );
  };

  return (
    <div className="mt-16">

      {/* ================= 3D CAROUSEL STAGE ================= */}

      <div
        className="relative mx-auto h-[760px] w-full max-w-5xl"
        style={{
          perspective: "1800px",
        }}
      >

        {experts.map((expert, index) => {
          const offset = index - activeIndex;

          /*
           * Only nearby cards participate in the animation.
           */

          if (Math.abs(offset) > 2) {
            return null;
          }

          let transform = "";
          let opacity = 0;
          let zIndex = 0;
          let filter = "";

          /*
           * CURRENT CARD
           */

          if (offset === 0) {
            transform =
              "translate3d(0, 0, 0) rotateY(0deg) scale(1)";

            opacity = 1;
            zIndex = 30;
            filter = "blur(0px)";
          }

          /*
           * NEXT CARD
           *
           * Comes from RIGHT SIDE.
           */

          if (offset === 1) {
            transform =
              "translate3d(48%, 35px, -260px) rotateY(-32deg) scale(0.82)";

            opacity = 0.45;
            zIndex = 20;
            filter = "blur(1px)";
          }

          /*
           * PREVIOUS CARD
           */

          if (offset === -1) {
            transform =
              "translate3d(-48%, 35px, -260px) rotateY(32deg) scale(0.82)";

            opacity = 0.45;
            zIndex = 20;
            filter = "blur(1px)";
          }

          /*
           * FAR NEXT CARD
           */

          if (offset === 2) {
            transform =
              "translate3d(70%, 70px, -520px) rotateY(-42deg) scale(0.68)";

            opacity = 0.12;
            zIndex = 10;
            filter = "blur(3px)";
          }

          /*
           * FAR PREVIOUS CARD
           */

          if (offset === -2) {
            transform =
              "translate3d(-70%, 70px, -520px) rotateY(42deg) scale(0.68)";

            opacity = 0.12;
            zIndex = 10;
            filter = "blur(3px)";
          }

          return (
            <div
              key={expert.name}
              className="absolute inset-0 flex justify-center"
              style={{
                transform,
                opacity,
                zIndex,
                filter,
                transformStyle: "preserve-3d",
                transition:
                  "transform 850ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms ease, filter 650ms ease",
                pointerEvents:
                  offset === 0 ? "auto" : "none",
              }}
            >

              {/* ================= GLASS CHARACTER CARD ================= */}

              <div
                className="
                  relative
                  h-fit
                  w-full
                  max-w-[720px]
                  overflow-hidden
                  rounded-[2.7rem]
                  border
                  border-[#d4a443]/35
                  bg-[#0d4743]/95
                  shadow-[0_40px_100px_rgba(8,47,45,0.30)]
                  backdrop-blur-2xl
                "
                style={{
                  transformStyle: "preserve-3d",
                }}
              >

                {/* GOLD GLOW */}

                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#e8a83b]/15 blur-[90px]" />

                <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#0b6a62]/30 blur-[100px]" />

                {/* ================= IMAGE ================= */}

                <div
                  className="
                    relative
                    h-[290px]
                    overflow-hidden
                    bg-[#0d4743]
                    md:h-[360px]
                  "
                >

                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-1000
                    "
                    style={{
                      transform:
                        offset === 0
                          ? "scale(1.04)"
                          : "scale(0.98)",
                    }}
                  />

                  {/* IMAGE FADE */}

                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d4743] via-[#0d4743]/60 to-transparent" />

                  {/* EXPERIENCE BADGE */}

                  <div className="
                    absolute
                    bottom-5
                    left-5
                    rounded-full
                    border
                    border-[#eab34a]/30
                    bg-[#0d4743]/75
                    px-4
                    py-2
                    text-[11px]
                    font-bold
                    tracking-[0.12em]
                    text-[#eab34a]
                    shadow-xl
                    backdrop-blur-xl
                  ">
                    {expert.experience}
                  </div>

                </div>

                {/* ================= CONTENT ================= */}

                <div className="relative px-6 pb-7 pt-3 md:px-9 md:pb-9">

                  <p className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#eab34a]
                  ">
                    {expert.role}
                  </p>

                  <h3 className="
                    mt-2
                    text-3xl
                    font-black
                    text-white
                    md:text-4xl
                  ">
                    {expert.name}
                  </h3>

                  <p className="
                    mt-2
                    font-semibold
                    text-white/75
                  ">
                    {expert.title}
                  </p>

                  <p className="
                    mt-4
                    text-sm
                    leading-6
                    text-white/60
                    md:leading-7
                  ">
                    {expert.description}
                  </p>

                  {/* ================= SESSION CARDS ================= */}

                  <div className="mt-7 border-t border-white/10 pt-6">

                    <p className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                    ">
                      Available Sessions
                    </p>

                    <div className="mt-4 space-y-3">

                      {expert.services.map(
                        ([service, price]) => (
                          <div
                            key={service}
                            className="
                              group/session
                              flex
                              items-center
                              gap-3
                              rounded-2xl
                              border
                              border-white/10
                              bg-white/[0.045]
                              px-4
                              py-3
                              transition
                              hover:border-[#eab34a]/35
                              hover:bg-white/[0.08]
                            "
                          >

                            <div className="flex min-w-0 flex-1 items-center gap-3">

                              <div className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#e8a83b]/15
                                text-sm
                                text-[#eab34a]
                              ">
                                ✦
                              </div>

                              <div className="min-w-0">

                                <p className="
                                  truncate
                                  text-sm
                                  font-semibold
                                  text-white/80
                                ">
                                  {service}
                                </p>

                                <p className="
                                  mt-0.5
                                  text-xs
                                  text-white/35
                                ">
                                  Personalised session
                                </p>

                              </div>

                            </div>

                            <div className="flex shrink-0 items-center gap-2">

                              <span className="
                                whitespace-nowrap
                                text-sm
                                font-black
                                text-[#eab34a]
                              ">
                                {price}
                              </span>

                              {/* EACH PRICE HAS ITS OWN BOOK BUTTON */}

                              <button
                                type="button"
                                onClick={() =>
                                  bookSession(
                                    expert.name,
                                    service
                                  )
                                }
                                className="
                                  hidden
                                  rounded-full
                                  bg-[#e8a83b]
                                  px-4
                                  py-2
                                  text-xs
                                  font-black
                                  text-[#173d3a]
                                  shadow-lg
                                  transition
                                  hover:bg-[#f2bd58]
                                  sm:block
                                "
                              >
                                Book this session
                              </button>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                    {/* MOBILE BOOK BUTTONS */}

                    <div className="mt-4 space-y-2 sm:hidden">

                      {expert.services.map(
                        ([service]) => (
                          <button
                            key={`mobile-${service}`}
                            type="button"
                            onClick={() =>
                              bookSession(
                                expert.name,
                                service
                              )
                            }
                            className="
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-full
                              border
                              border-[#eab34a]/30
                              bg-[#e8a83b]
                              px-5
                              py-3
                              text-sm
                              font-black
                              text-[#173d3a]
                              transition
                              hover:bg-[#f2bd58]
                            "
                          >
                            <span>
                              Book this session
                            </span>

                            <span>
                              →
                            </span>
                          </button>
                        )
                      )}

                    </div>

                    <p className="
                      mt-4
                      text-xs
                      leading-5
                      text-white/35
                    ">
                      {expert.note}
                    </p>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ================= CAROUSEL INDICATOR ================= */}

      <div className="
        relative
        z-40
        mt-2
        flex
        items-center
        justify-center
        gap-3
      ">

        {experts.map((expert, index) => (
          <button
            key={expert.name}
            type="button"
            onClick={() => {
              if (isAnimating) return;

              setIsAnimating(true);
              setActiveIndex(index);

              setTimeout(() => {
                setIsAnimating(false);
              }, 850);
            }}
            aria-label={`Show ${expert.name}`}
            className={`
              h-2.5
              rounded-full
              transition-all
              duration-500
              ${
                index === activeIndex
                  ? "w-10 bg-[#e8a83b]"
                  : "w-2.5 bg-[#0d4743]/20"
              }
            `}
          />
        ))}

      </div>

      {/* ================= SCROLL MESSAGE ================= */}

      <div className="
        relative
        z-40
        mt-6
        text-center
      ">

        {activeIndex < experts.length - 1 ? (
          <>
            <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#173d3a]/45
            ">
              Scroll to meet the next expert
            </p>

            <div className="
              mx-auto
              mt-3
              flex
              justify-center
              text-xl
              text-[#c88d22]
              animate-bounce
            ">
              ↓
            </div>
          </>
        ) : (
          <>
            <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#173d3a]/45
            ">
              Our experts are here for you
            </p>

            <div className="
              mx-auto
              mt-3
              text-xl
              text-[#c88d22]
            ">
              ✦
            </div>
          </>
        )}

      </div>

    </div>
  );
}
