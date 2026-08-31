import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const selectedAnswer = answers[currentQuestion];

  const handleAnswer = (score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = score;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === -1) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = answers.reduce((total, score) => total + score, 0);

      navigate("/result", {
        state: {
          score: totalScore,
          totalQuestions: questions.length,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-indigo-600 font-semibold uppercase tracking-wider">
            FREEWILL Assessment
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Mental Wellness Self-Assessment
          </h1>

          <p className="text-gray-600 mt-3">
            Answer each question honestly based on how you have been
            feeling recently.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between text-sm font-semibold text-gray-600 mb-3">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
            Q{currentQuestion + 1}. {questions[currentQuestion]}
          </h2>

          <div className="space-y-4">

            {options.map((option) => (
              <button
                key={option.score}
                type="button"
                onClick={() => handleAnswer(option.score)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition font-medium ${
                  selectedAnswer === option.score
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.score
                        ? "border-indigo-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === option.score && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    )}
                  </div>

                  <span>{option.label}</span>

                </div>
              </button>
            ))}

          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswer === -1}
              className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Assessment"
                : "Next →"}
            </button>

          </div>

        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          This self-assessment is for general wellbeing awareness and is
          not a medical diagnosis or emergency service.
        </p>

      </div>
    </div>
  );
}

export default Assessment;
