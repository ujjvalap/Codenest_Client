/* eslint-disable react/prop-types */
import React from "react";

const SubmissionsTable = ({ submissions }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="border-b text-left px-6 py-3 text-sm font-semibold text-gray-700">
              Submitted At
            </th>
            <th className="border-b text-left px-6 py-3 text-sm font-semibold text-gray-700">
              Language
            </th>
            <th className="border-b text-left px-6 py-3 text-sm font-semibold text-gray-700">
              Score
            </th>
            <th className="border-b text-left px-6 py-3 text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr
              key={submission._id}
              className={`${
                submission.status === "pass" ? "bg-green-50" : "bg-red-50"
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <td className="border-t px-6 py-4 text-sm font-medium text-gray-800">
                {new Date(submission.submittedAt).toLocaleString()}
              </td>
              <td className="border-t px-6 py-4 text-sm font-medium text-gray-800">
                <span className="px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">
                  {submission.language || "Unknown"}
                </span>
              </td>
              <td className="border-t px-6 py-4 text-sm font-medium text-gray-800">
                {submission.score}
              </td>
              <td className="border-t px-6 py-4 text-sm font-medium">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    submission.status === "pass"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submission.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
