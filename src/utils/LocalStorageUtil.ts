/**
 * Carga el estado desde localStorage.
 * @returns El estado deserializado o undefined si no existe o hay un error.
 */
export const loadFromLocalStorage = <T>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error("Error cargando desde localStorage", err);
    return undefined;
  }
};

/**
 * Guarda el estado en localStorage.
 * @param state El estado que se desea serializar y guardar.
 */
export const saveToLocalStorage = (state: unknown): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error guardando en localStorage", err);
  }
};