import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Replace this with your actual auth logic
      const userLoggedIn = false;
      setIsAuth(userLoggedIn);

      if (!userLoggedIn) {
        // Redirect only after mount
        router.replace("/auth");
      }
    }, 100); // small delay to let the router mount

    return () => clearTimeout(timeout);
  }, []);

  // if (isAuth === null) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="green" />
  //     </View>
  //   );
  // }

  return <>{children}</>;
};

export default RouteGuard;
