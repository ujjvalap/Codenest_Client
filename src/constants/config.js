// export const server = import.meta.env.VITE_SERVER || "http://localhost:5000";
export const server = import.meta.env.VITE_SERVER || "https://codenest-server-chi.vercel.app"

export const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};
