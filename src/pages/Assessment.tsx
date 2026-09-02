import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const questions = [
  "How often do you feel nervous, anxious, or on edge?",
  "How often do you find it difficult to relax?",
  "How often do you feel overwhelmed by your daily responsibilities?",
  "How often do you have trouble concentrating on tasks?",
  "How often do you feel tired or low in energy?",
  "How often do you lose interest in activities you usually enjoy?",
  "How often do you feel lonely or disconnected from others?",
  "How often do you have difficulty maintaining a regular sleep pattern?",
  "How often do you feel that your problems are difficult to manage?",
  "How often do you feel positive and hopeful about your future?",
];

const options = [
  { label: "Never", score: 0 },
  { label: "Rarely", score: 1 },
  { label: "Sometimes", score: 2 },
  { label: "Often", score: 3 },
  { label: "Always", score: 4 },
];

function Assessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedAnswer = answers[currentQuestion];

  const handleAnswer = (score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = score;

    setAnswers(updatedAnswers);
    setError("");
  };

  const getResultLevel = (score: number) => {
    if (score <= 10) {
      return {
        level: "Low",
        title: "Positive Wellbeing",
        message:
          "Your responses indicate a relatively positive wellbeing state. Continue maintaining healthy routines, meaningful connections and self-care.",
      };
    }

    if (score <= 20) {
      return {
        level: "Moderate",
        title: "Some Areas Need Attention",
        message:
          "Your responses suggest that you may be experiencing some areas of stress or emotional difficulty. Taking time for self-care and support may be helpful.",
      };
    }

    if (score <= 30) {
      return {
        level: "High",
        title: "Wellbeing Support Recommended",
        message:
          "Your responses suggest a higher level of emotional or daily-life difficulty. Consider speaking with a qualified professional for personalised support.",
      };
    }

    return {
      level: "Very High",
      title: "Professional Support Recommended",
      message:
        "Your responses indicate significant difficulty across several areas. Consider reaching out to a qualified mental health professional for appropriate guidance and support.",
    };
  };

  const handleNext = async () => {
    if (selectedAnswer === -1) {
      setError("Please select an answer before continuing.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const totalScore = answers.reduce(
        (total, score) => total + score,
        0
      );

      const maxScore = questions.length * 4;

      const result = getResultLevel(totalScore);

      const { error: insertError } = await supabase
        .from("assessment_results")
        .insert({
          user_id: user.id,
          total_score: totalScore,
          max_score: maxScore,
          result_level: result.level,
          result_title: result.title,
          result_message: result.message,
          answers: answers,
        });

      if (insertError) {
        console.error("Assessment save error:", insertError);

        setError(
          "We couldn't save your assessment result. Please try again."
        );

        return;
      }

      navigate("/result", {
        state: {
          score: totalScore,
          totalQuestions: questions.length,
          maxScore,
          resultLevel: result.level,
          resultTitle: result.title,
          resultMessage: result.message,
          answers,
        },
      });
    } catch (err) {
      console.error("Assessment error:", err);

      setError(
        "Something went wrong while saving your assessment. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setError("");
    }
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f7f4ed] px-5 py-28 text-[#173d3a]">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c88d22]">
            FREEWILL • Human Empowerment
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-black">
            Mental Wellness
            <span className="text-[#c88d22]"> Assessment</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Take a few moments to reflect on how you have been feeling
            recently. Answer honestly — there are no right or wrong answers.
          </p>

        </div>


        {/* Progress Card */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-[#173d3a]">
                Question {currentQuestion + 1} of {questions.length}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Your answers are used to calculate your wellbeing score.
              </p>

            </div>

            <span className="font-bold text-[#c88d22]">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#e7e4db]">

            <div
              className="h-full rounded-full bg-[#0d4743] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>


        {/* Question Card */}
        <div className="rounded-[2rem] bg-white p-7 shadow-xl md:p-10">

          <div className="mb-8">

            <span className="inline-flex rounded-full bg-[#f8f1e1] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#b27a18]">
              Question {currentQuestion + 1}
            </span>

            <h2 className="mt-5 text-2xl font-black leading-tight md:text-3xl">
              {questions[currentQuestion]}
            </h2>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}


          {/* Options */}
          <div className="space-y-3">

            {options.map((option) => {

              const isSelected =
                selectedAnswer === option.score;

              return (
                <button
                  key={option.score}
                  type="button"
                  onClick={() => handleAnswer(option.score)}
                  disabled={saving}
                  className={`w-full rounded-2xl border-2 p-5 text-left transition ${
                    isSelected
                      ? "border-[#c88d22] bg-[#f8f1e1]"
                      : "border-[#e4e5df] bg-white hover:border-[#9db5b1] hover:bg-[#f7f9f8]"
                  } ${
                    saving
                      ? "cursor-not-allowed opacity-60"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected
                          ? "border-[#c88d22]"
                          : "border-gray-300"
                      }`}
                    >

                      {isSelected && (
                        <div className="h-3 w-3 rounded-full bg-[#c88d22]" />
                      )}

                    </div>

                    <span
                      className={`font-semibold ${
                        isSelected
                          ? "text-[#173d3a]"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </span>

                  </div>

                </button>
              );
            })}

          </div>


          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-100 pt-7">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 || saving}
              className="rounded-full border border-gray-300 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswer === -1 || saving}
              className="rounded-full bg-[#0d4743] px-7 py-3 font-bold text-white shadow-lg transition hover:bg-[#12554f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving
                ? "Saving Result..."
                : currentQuestion === questions.length - 1
                ? "Finish Assessment"
                : "Next →"}
            </button>

          </div>

        </div>


        {/* Disclaimer */}
        <div className="mt-6 text-center">

          <p className="text-xs leading-5 text-gray-500">
            This self-assessment is intended for general wellbeing
            awareness and is not a medical diagnosis.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Assessment;
