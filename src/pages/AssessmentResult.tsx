import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ResultData = {
  score: number;
  maxScore: number;
  totalQuestions: number;
  resultLevel: string;
  resultTitle: string;
  resultMessage: string;
};

function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      // First, check data passed from Assessment page
      const state = location.state as Partial<ResultData> | null;

      if (
        state?.score !== undefined &&
        state?.maxScore !== undefined &&
        state?.resultLevel &&
        state?.resultTitle &&
        state?.resultMessage
      ) {
        setResult({
          score: state.score,
          maxScore: state.maxScore,
          totalQuestions:
            state.totalQuestions || 10,
          resultLevel: state.resultLevel,
          resultTitle: state.resultTitle,
          resultMessage: state.resultMessage,
        });

        setLoading(false);
        return;
      }

      // If page is opened directly, load latest result from Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("assessment_results")
        .select(`
          total_score,
          max_score,
          result_level,
          result_title,
          result_message
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Result loading error:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        navigate("/assessment");
        return;
      }

      setResult({
        score: data.total_score,
        maxScore: data.max_score,
        totalQuestions: 10,
        resultLevel: data.result_level,
        resultTitle:
          data.result_title || "Assessment Result",
        resultMessage:
          data.result_message || "Thank you for completing the assessment.",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelStyle = (level: string) => {
    const value = level.toLowerCase();

    if (value.includes("low")) {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
      };
    }

    if (value.includes("moderate")) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
      };
    }

    if (value.includes("high")) {
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-200",
      };
    }

    return {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"></div>

          <p className="text-gray-600">
            Preparing your assessment result...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">📋</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No Result Found
          </h1>

          <p className="text-gray-600 mb-6">
            Please complete the assessment to view your result.
          </p>

          <Link
            to="/assessment"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  const levelStyle = getLevelStyle(result.resultLevel);

  const percentage = Math.round(
    (result.score / result.maxScore) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              FREEWILL
            </h1>

            <p className="text-xs text-gray-500">
              Human Empowerment
            </p>
          </div>

          <Link
            to="/home"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Assessment Completed
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Your Wellbeing Result
          </h1>

          <p className="text-gray-500 mt-3">
            Here's a summary based on your responses.
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Your Score
            </p>

            <div className="flex items-end justify-center gap-2">
              <span className="text-6xl font-bold text-gray-900">
                {result.score}
              </span>

              <span className="text-lg text-gray-400 mb-2">
                / {result.maxScore}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {result.totalQuestions} questions completed
            </p>
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0</span>
              <span>{result.maxScore}</span>
            </div>
          </div>

          {/* Result Level */}
          <div
            className={`mt-8 rounded-2xl border p-6 text-center ${levelStyle.bg} ${levelStyle.border}`}
          >
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
              Wellbeing Level
            </p>

            <h2
              className={`text-3xl font-bold ${levelStyle.text}`}
            >
              {result.resultLevel}
            </h2>
          </div>

          {/* Result Message */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {result.resultTitle}
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4 max-w-2xl mx-auto">
              {result.resultMessage}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/booking"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium text-center hover:bg-gray-800 transition"
            >
              Book a Counseling Session
            </Link>

            <Link
              to="/assessment"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium text-center hover:bg-gray-50 transition"
            >
              Retake Assessment
            </Link>

            <Link
              to="/home"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium text-center hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            <strong className="text-gray-700">
              Important:
            </strong>{" "}
            This assessment is intended for general wellbeing
            awareness and self-reflection. It is not a medical
            diagnosis or a substitute for professional mental
            health evaluation.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AssessmentResult;
