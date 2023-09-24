"use client";
import { createContext, useContext } from "react";
import invariant from "tiny-invariant";

type TimerContext = {
  timer: React.ReactNode;
};

const TimerContext = createContext<TimerContext | null>(null);

export function TimerContextProvider({
  readingSince,
  children,
}: {
  readingSince: React.ReactNode;
  children: React.ReactNode;
}) {
  // const readingSince = useMemo(() => {
  //   console.log("useMemo in TimerContextProvider");
  //   return <ReadingSince key="from-context" label={"from context"} />;
  // }, []);
  // useEffect(() => {
  //   console.log("Effect in TimerContextProvider");
  // }, []);
  // console.log("Render TimerContextProvider");

  return (
    <TimerContext.Provider value={{ timer: readingSince }}>
      {children}
    </TimerContext.Provider>
  );
}

export default function useTimerContext(): TimerContext {
  const context = useContext(TimerContext);
  invariant(
    context,
    "TimerContext not initialized correctly, propably provider component missing",
  );

  return context;
}

export function TimerComponent() {
  const timer = useTimerContext();

  return timer.timer;
}
