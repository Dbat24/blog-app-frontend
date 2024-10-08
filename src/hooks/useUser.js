import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    }, (error) => {
      console.error("Error with Firebase authentication:", error);
      setIsLoading(false); // Make sure to stop loading even if there's an error
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return { user, isLoading };
};

export default useUser;
