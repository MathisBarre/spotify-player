import { createContext, createRef, MutableRefObject } from "react";

export const AudioRefContext = createContext<
  MutableRefObject<HTMLAudioElement | null> | undefined
>(undefined);

export function AudioRefContextProvider() {
  const ref = createRef<HTMLAudioElement | null>();
  return <AudioRefContext.Provider value={ref}></AudioRefContext.Provider>;
}
