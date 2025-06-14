import { useEffect } from "react";
import toast from "react-hot-toast";

const useMutationToast = ({
  isLoading,
  isSuccess,
  data,
  isError,
  error,
  loadingMessage,
  successMessage,
}) => {
  useEffect(() => {
    if (isLoading) {
      toast.loading(loadingMessage || "Processing...");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success(data?.message || successMessage || "Operation successful");
    } else if (isError) {
      toast.dismiss();
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isLoading, isSuccess, isError, data, error, successMessage]);
};

export default useMutationToast;
