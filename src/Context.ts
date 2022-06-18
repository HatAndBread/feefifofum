import { createContext, useContext } from "react";
import { ContextProps, TannerinProps, KeyboardProps, SequencerProps } from "./types/ContextProps";
export const AppContext = createContext<Partial<ContextProps>>({});
export const useAppContext = () => useContext(AppContext);

export const TannerinContext = createContext<Partial<TannerinProps>>({});
export const useTannerinContext = () => useContext(TannerinContext);

export const KeyboardContext = createContext<Partial<KeyboardProps>>({});

export const useKeyboardContext = () => useContext(KeyboardContext);

export const SequencerContext = createContext<Partial<SequencerProps>>({});

export const useSequencerContext = () => useContext(SequencerContext);
