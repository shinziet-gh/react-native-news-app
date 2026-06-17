import { useWindowDimensions } from 'react-native';

//Custom hook for device screen size
export function useResponsive() {

    //Determine UI layout based on screen width
    const { width, height } = useWindowDimensions();

    return {
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
    };
}

// fsd