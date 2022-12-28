import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const useEscGoesToRoute = (route: string) => {
  const router = useRouter();

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // router.push("/gallery");
        router.push(route);
      }
    },
    [router, route]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
};

export default useEscGoesToRoute;

// const getSize = () => {
//   return {
//     innerHeight: typeof window !== "undefined" ? window.innerHeight : 0,
//     innerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
//   };
// };

// const useWindowSize = (): { innerHeight: number; innerWidth: number } => {
//   let [windowSize, setWindowSize] = useState(getSize());
//   const handleResize = () => {
//     setWindowSize(getSize());
//   };
//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return windowSize;
// };

// export default useWindowSize;
