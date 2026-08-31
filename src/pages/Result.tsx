import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score ?? 0;
  const totalQuestions = location.state?.totalQuestions ?? 10;
  const maxScore = totalQuestions * 4;

  let level = "";
  let message = "";

  if (score <= 10) {
    level = "Low Concern";
    message =
      "Your responses suggest a relatively positive wellbeing level. Continue maintaining healthy daily habits.";
  } else if (score <= 20) {
    level = "Moderate Concern";
    message =
      "Your responses indicate some areas that may need attention. Consider focusing on self-care, rest, and talking with someone you trust.";
  } else if (score <= 30) {
    level = "High Concern";
    message =
      "Your responses suggest that you may be experiencing several wellbeing challenges. Consider reaching out to a qualified mental health professional.";
  } else {
    level = "Very High Concern";
    message =
      "Your responses indicate significant areas of concern. Consider seeking support from a qualified mental health professional.";
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <p className="text-indigo-600 font-semibold uppercase tracking-wider">
            FREEWILL Assessment
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Your Assessment Result
          </h1>

          <p className="text-gray-600 mt-3">
            Here is a summary of your self-assessment responses.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

          <div className="text-center">
            <p className="text-gray-500 font-medium">
              Your Score
            </p>

            <div className="text-6xl font-bold text-indigo-600 mt-3">
              {score}
            </div>

            <p className="text-gray-500 mt-2">
              out of {maxScore}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
              <span>Assessment Score</span>
              <span>{Math.round((score / maxScore) * 100)}%</span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${(score / maxScore) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Wellbeing Level
            </p>

            <h2 className="text-2xl font-bold text-indigo-700 mt-2">
              {level}
            </h2>
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-5">
            <p className="text-gray-700 leading-relaxed text-center">
              {message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              type="button"
              onClick={() => navigate("/assessment")}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Retake Assessment
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Back to Home
            </button>

          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          This result is for general wellbeing awareness only and is not
          a medical diagnosis.
        </p>

      </div>
    </div>
  );
}

export default Result;
