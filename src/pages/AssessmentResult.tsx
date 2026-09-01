import { Link, useLocation } from "react-router-dom";

function AssessmentResult() {
  const location = useLocation();

  const score = location.state?.score ?? 0;
  const totalQuestions = location.state?.totalQuestions ?? 10;
  const maxScore = totalQuestions * 4;

  let level = "";
  let message = "";

  if (score <= 13) {
    level = "Low Concern";
    message =
      "Your responses indicate relatively low levels of concern. Continue maintaining healthy routines and positive connections.";
  } else if (score <= 26) {
    level = "Moderate Concern";
    message =
      "Your responses indicate some areas that may benefit from attention. Consider taking time for self-care and speaking with someone you trust.";
  } else {
    level = "Higher Concern";
    message =
      "Your responses indicate that you may be experiencing a higher level of emotional difficulty. Consider connecting with a qualified mental health professional for support.";
  }

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-indigo-600 font-semibold uppercase tracking-wider">
            FREEWILL
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Your Assessment Result
          </h1>

          <p className="text-gray-600 mt-3">
            Here is a summary of your self-assessment.
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <p className="text-gray-500 font-medium">
            Your Score
          </p>

          <div className="mt-4">
            <span className="text-6xl font-bold text-indigo-700">
              {score}
            </span>

            <span className="text-gray-500 text-xl">
              {" "} / {maxScore}
            </span>
          </div>

          <div className="w-full max-w-md mx-auto h-4 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            {level}
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {message}
          </p>

        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What You Can Do
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <div className="text-2xl">🌱</div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Take Care of Yourself
                </h3>

                <p className="text-gray-600 mt-1">
                  Maintain regular sleep, balanced meals, physical activity
                  and time for relaxation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">💬</div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Talk to Someone
                </h3>

                <p className="text-gray-600 mt-1">
                  Sharing your thoughts with a trusted person can provide
                  emotional support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">👩‍⚕️</div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Consider Professional Support
                </h3>

                <p className="text-gray-600 mt-1">
                  If you are struggling, consider speaking with a qualified
                  mental health professional.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/booking"
            className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-center hover:bg-indigo-700 transition"
          >
            Book Counselling
          </Link>

          <Link
            to="/"
            className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>

        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          This result is for general wellbeing awareness only and is not a
          medical diagnosis. If you are in immediate danger or crisis,
          contact local emergency services or a qualified professional.
        </p>

      </div>
    </div>
  );
}

export default AssessmentResult;
