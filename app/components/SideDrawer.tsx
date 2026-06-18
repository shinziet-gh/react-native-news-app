import { Box, HStack, Text } from '@gluestack-ui/themed';
import { useResponsive } from '../hooks/UseResponsive';
import CalendarForm from './CalendarForm';
import { useEffect, useState } from 'react';

export default function SideDrawer({ handleParams }: Readonly<{ handleParams: (params: { searchQuery: string; fromDate: string; toDate: string; }) => void; }>) {

    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();
    const [isClose, setIsClose] = useState<boolean>(false);

    const handleClick = (isCloseVal: boolean) => {
        setIsClose(isCloseVal)
    }

    return (
        <>
            {
                !isMobile && (
                    <Box
                        width={'auto'}
                        position='absolute'
                        top={'20%'}
                        right={(width < 1024 && isClose) ? "$10" : "$4"}
                    >
                        <CalendarForm handleParams={handleParams} isClose={isClose} handleClick={handleClick} />
                    </Box >)
            }
        </>
    )
}