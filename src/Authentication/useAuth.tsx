import { useSelector } from "react-redux";

export const IsAuthenticated = () => {
  // Return authentication for logged User
  const data = useSelector((state: { auth: any }) => state.auth);
  return [data];
};
