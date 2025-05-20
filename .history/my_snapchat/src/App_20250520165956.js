import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";
import { useState, useEffect } from "react";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  });
  return [isShowSplash ? <SplashScreen /> : <HomeScreen />];
}
