import { useWindowDimensions } from 'react-native';

//Custom hook for device screen size
export function useResponsive() {

    //Determine UI layout based on screen width
    const { width, height } = useWindowDimensions();
    return {
        width,
        height,
        isMobile: width < 768,
    };
}