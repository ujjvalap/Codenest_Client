/* eslint-disable react/prop-types */
function SubmissionResultCard({
  loading,
  totalTestCases,
  passedTestCases,
  score,
  language,
  penalty = 0,
  onClose,
  ErrorMessage,
}) {
  const allTestCasesPassed = passedTestCases === totalTestCases;

  return (
    <div className="fixed top-0 right-0 w-full max-w-md bg-gray-800 text-white shadow-lg rounded-lg p-6 m-4 border border-gray-700 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Submission Status</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none transition duration-200"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            <p className="text-sm">Hey Champ, hold on we are checking...</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span>1. Compilation check</span>
                <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </li>
              <li className="flex items-center space-x-2">
                <span>2. Large test cases check</span>
                <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </li>
              <li className="flex items-center space-x-2">
                <span>3. Optimal code test</span>
                <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className={`text-xl font-bold rounded-lg p-4 ${
              allTestCasesPassed && !ErrorMessage
                ? "border-2 border-green-500"
                : "border-2 border-red-500"
            }`}
          >
            {/* Only show Accepted/Wrong Answer if there is no ErrorMessage */}
            {!ErrorMessage && (
              <>
                <span
                  className={`${
                    allTestCasesPassed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {allTestCasesPassed ? "Accepted" : "Wrong Answer"}
                </span>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Test Cases:</strong> {passedTestCases}/
                    {totalTestCases}
                  </div>
                  <div>
                    <strong>SCORE:</strong> {allTestCasesPassed ? score : 0}
                  </div>
                  <div>
                    <strong>Language:</strong> {language}
                  </div>
                  <div>
                    <strong>Penalty:</strong> {penalty}%
                  </div>
                </div>
              </>
            )}

            {/* Display ErrorMessage if it exists */}
            {ErrorMessage && (
              <div
                className="mt-4 text-sm text-red-500 whitespace-pre-wrap"
                aria-live="assertive"
              >
                <strong>Error:</strong> {ErrorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionResultCard;
