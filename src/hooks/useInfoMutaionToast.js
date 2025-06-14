import toast from "react-hot-toast";

export const infoNotify = (message, icon = "ℹ️") =>
  toast(message, {
    icon,
  });
