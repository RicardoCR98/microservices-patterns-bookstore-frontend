import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Hook tipado para dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook tipado para selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;