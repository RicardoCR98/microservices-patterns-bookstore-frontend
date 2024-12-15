import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setMiniDrawer } from 'src/store/config';
import { ConfigContext } from 'src/contexts/ConfigContext';

export const useConfig = () => {
  const dispatch = useDispatch();

  const { miniDrawer, container, menuOrientation, mode, presetColor, fontFamily, themeDirection } = useSelector(
    (state: RootState) => state.config
  );

  const handlerDrawerOpen = (isDashboardDrawerOpened: boolean) => dispatch(setMiniDrawer(isDashboardDrawerOpened));

  return {
    isMiniDrawer: miniDrawer,
    handlerDrawerOpen,
    container,
    menuOrientation,
    mode,
    presetColor,
    fontFamily,
    themeDirection
  };
};

export const useConfig2 = () => {
  return useContext(ConfigContext);
};
