/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useAddTestCaseMutation,
  useDeleteTestCaseMutation,
  useGetTestCasesQuery,
  useUpdateTestCaseMutation,
} from "../../redux/api/api";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";

function TestCasesPanel() {
  const { questionID } = useSelector((state) => state.auth);
  const [testCases, setTestCases] = useState([]);
  const { data, isSuccess, isLoading } = useGetTestCasesQuery(questionID);

  const [addTestCase, addTestCaseStatus] = useAddTestCaseMutation();
  const [updateTestCase, updateTestCaseStatus] = useUpdateTestCaseMutation();
  const [deleteTestCase, deleteTestCaseStatus] = useDeleteTestCaseMutation();

  useMutationToast({
    ...addTestCaseStatus,
    loadingMessage: "Adding test case...",
    successMessage:
      addTestCaseStatus.data?.message || "Test case added successfully!",
  });

  useMutationToast({
    ...updateTestCaseStatus,
    loadingMessage: "Updating test case...",
    successMessage:
      updateTestCaseStatus.data?.message || "Test case updated successfully!",
  });

  useMutationToast({
    ...deleteTestCaseStatus,
    loadingMessage: "Deleting test case...",
    successMessage:
      deleteTestCaseStatus.data?.message || "Test case deleted successfully!",
  });

  // Handle API response and update testCases
  useEffect(() => {
    if (isSuccess && Array.isArray(data.testCases)) {
      setTestCases(data.testCases);
    }
  }, [isSuccess, data?.testCases]);

  const [newTestCase, setNewTestCase] = useState({
    input: "",
    output: "",
    type: "Single-line",
    isHidden: false,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTestCaseId, setUpdateTestCaseId] = useState("");
  const [testCaseToDelete, setTestCaseToDelete] = useState(null);

  const addOrUpdateTestCase = async () => {
    if (newTestCase.input && newTestCase.output) {
      try {
        const formattedData = {
          ...newTestCase,
          input: newTestCase.input.replace(/\n/g, "\n"), // Ensure new lines are formatted for JSON
          output: newTestCase.output.replace(/\n/g, "\n"), // Ensure new lines are formatted for JSON
        };

        if (updateTestCaseId) {
          await updateTestCase({
            id: updateTestCaseId,
            data: formattedData,
          });
        } else {
          await addTestCase({
            id: questionID,
            data: formattedData,
          });
        }

        // Reset form after submission
        setIsFormVisible(false);
        setNewTestCase({
          input: "",
          output: "",
          type: "Single-line",
          isHidden: false,
        });
        setUpdateTestCaseId(null);
      } catch (error) {
        toast.error(error.data?.error?.message || "Something went wrong");
      }
    } else {
      toast.error("Input and output are required");
    }
  };

  const confirmRemoveTestCase = (id) => {
    setTestCaseToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTestCase(testCaseToDelete)
      .then((res) => {
        toast.success(res?.data?.message || "Test case successfully deleted.");
      })
      .catch((error) => {
        toast.error(
          error?.data?.error?.message ||
            "Failed to delete the test case. Please try again later."
        );
      });

    setIsModalOpen(false);
    setTestCaseToDelete(null);
  };

  const editTestCase = (testCase) => {
    setNewTestCase({
      input: testCase.input,
      output: testCase.output,
      type: testCase.type,
      isHidden: testCase.isHidden,
    });
    setUpdateTestCaseId(testCase._id);
    setIsFormVisible(true);
  };

  const filteredTestCases = testCases?.filter((testCase) => {
    if (filter === "All") return true;
    return filter === "Hidden" ? testCase.isHidden : !testCase.isHidden;
  });

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-lg space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center bg-white p-4 rounded-md shadow relative">
        <h2 className="text-lg font-semibold text-gray-800">
          Manage Test Cases
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Visible">Visible</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            + New Test Case
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-md shadow space-y-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            value={newTestCase.type}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, type: e.target.value })
            }
          >
            <option value="Single-line">Single-line</option>
            <option value="Multi-line">Multi-line</option>
            <option value="Edge Case">Edge Case</option>
          </select>
          <textarea
            rows="3"
            placeholder="Enter test case input"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            value={newTestCase.input}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, input: e.target.value })
            }
          />
          <textarea
            rows="3"
            placeholder="Enter expected output"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
            value={newTestCase.output}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, output: e.target.value })
            }
          />
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={newTestCase.isHidden}
              onChange={() =>
                setNewTestCase({
                  ...newTestCase,
                  isHidden: !newTestCase.isHidden,
                })
              }
              id="hidden-checkbox"
            />
            <label htmlFor="hidden-checkbox" className="text-sm text-gray-700">
              Hidden
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsFormVisible(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={addOrUpdateTestCase}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
              {newTestCase._id ? "Update Test Case" : "Save Test Case"}
            </button>
          </div>
        </div>
      )}

      <ConfirmationDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Test Case"
        message="Are you sure you want to delete this test case?"
      />

      <div
        className={`space-y-4 max-h-60 ${isLoading ? "" : "overflow-y-auto"}`}
      >
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600 border-opacity-75"></div>
          </div>
        ) : filteredTestCases.length > 0 ? (
          filteredTestCases.map((testCase) => (
            <div
              key={testCase._id}
              className="bg-white p-4 rounded-md shadow flex items-start justify-between space-x-4"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Type:</strong>
                </p>
                <p className="text-sm text-gray-900 mb-2">{testCase.type}</p>

                <p className="text-sm text-gray-700 mb-1">
                  <strong>Input:</strong>
                </p>
                <p className="text-sm text-gray-900 mb-2 whitespace-pre-wrap">
                  {testCase.input}
                </p>

                <p className="text-sm text-gray-700 mb-1">
                  <strong>Output:</strong>
                </p>
                <p className="text-sm text-gray-900 mb-2 whitespace-pre-wrap">
                  {testCase.output}
                </p>

                <div className="text-xs text-gray-500">
                  {testCase.isHidden ? "Hidden" : "Visible"}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTestCase(testCase)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => confirmRemoveTestCase(testCase._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No test cases found.</p>
        )}
      </div>
    </div>
  );
}

export default TestCasesPanel;
