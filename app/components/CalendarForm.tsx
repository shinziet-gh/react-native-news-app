import { Box, HStack, Text, Input, Button, InputIcon, InputSlot, CalendarDaysIcon, InputField, VStack, Pressable } from "@gluestack-ui/themed";
import { useState, useEffect, useRef } from "react";
import { Calendar, DateData } from 'react-native-calendars';
import SearchBar from "./SearchBar";
import { useResponsive } from "../hooks/UseResponsive";
import Animated, { FadeIn, SequencedTransition, CurvedTransition } from 'react-native-reanimated';

export default function CalendarForm({ handleParams, isClose, handleClick }: Readonly<{ handleParams: (params: { searchQuery: string; fromDate: string; toDate: string; }) => void; isClose: boolean, handleClick: (isCloseVal: boolean) => void }>) {

    //Get window dimensions
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

    //Layout animation
    const [isResizing, setIsResizing] = useState(false);

    //State variables for search query
    const [searchQuery, setSearchQuery] = useState("");

    //Flag for calendar display & click event
    const [showCalendar, setShowCalendar] = useState(false);
    const [fromDateClicked, setFromDateClicked] = useState(false);
    const [toDateClicked, setToDateClicked] = useState(false);

    //Reference attribute
    const calendarRef = useRef<any>(null);
    const searchBarRef = useRef<any>(null);
    const fromInputRef = useRef<any>(null);
    const toInputRef = useRef<any>(null);

    //Declare date variables
    const dateNow = new Date();
    const minDate = new Date(dateNow);
    const maxDate = new Date(dateNow);

    //Limit date selection to the last three months
    minDate.setMonth(minDate.getMonth() - 3);
    maxDate.setDate(maxDate.getDate() - 1);

    //Use state variables to store date info
    const [startDate, setStartDate] = useState<DateData | null>(null);
    const [endDate, setEndDate] = useState<DateData | null>(null);
    const [datesInBetween, setDatesInBetween] = useState<DateData[]>([]);
    const [markedDates, setMarkedDates] = useState<Record<string, Object>>({});

    //CSS styles for markedDate property on react native calendar
    const markedDateStartStyle = { startingDay: true, color: 'black', textColor: 'white' };
    const markedDateStyle = { color: 'black', textColor: 'white' };
    const markedDateEndStyle = { endingDay: true, color: 'black', textColor: 'white' };

    useEffect(() => {
        //Handle click event, hides calendar when mouse goes outside the calendar component
        function handleClickOutside(event: MouseEvent) {

            const isClickInsideRefElement = [calendarRef, searchBarRef, fromInputRef, toInputRef].some(ref =>
                ref.current?.contains(event.target as Node)
            );

            if (!isClickInsideRefElement) {
                setShowCalendar(false);
                setFromDateClicked(false);
                setToDateClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    useEffect(() => {
        setIsResizing(true);

        const t = setTimeout(() => {
            setIsResizing(false);
        }, 150);
        return () => clearTimeout(t);
    }, [width, height]);


    const handleDateClick = (date: DateData) => {
        try {
            //Mark selected date on calendar, if startDate is initially empty
            if (!startDate) {
                setStartDate(date);
                setMarkedDates({
                    [date.dateString]: markedDateStartStyle,
                });
                return;
            };

            //Update starting date value to selected date
            if (fromDateClicked && showCalendar) {
                setStartDate(date);
                setEndDate(null);
                setMarkedDates({
                    [date.dateString]: markedDateStartStyle,
                });
                setDatesInBetween([]);
                return;
            }

            //Update ending date value to selected date
            if (toDateClicked && showCalendar) {
                let tempEndDate = new Date(date.dateString);
                let tempStartDate = new Date(startDate.dateString);
                if (tempEndDate > tempStartDate) {
                    console.log("update end date");
                    setEndDate(date);
                    setMarkedDates({
                        [date.dateString]: markedDateEndStyle,
                    });
                    setDatesInBetween([]);
                }
            }

            if (startDate && toDateClicked) {
                //Store selected dates and their CSS styles
                const tempStyles: Record<string, Object> = {};

                //Temporary variables for iterating through while loop
                const selected = new Date(date.dateString);
                const current = new Date(startDate.dateString);

                //Update start date, if selected date is earlier than current date
                if (selected < current) {
                    setStartDate(date);
                    setEndDate(null);
                    setMarkedDates({
                        [date.dateString]: markedDateStartStyle,
                    });
                    setDatesInBetween([]);
                    return;
                }

                //Store dates between the starting date and selected date in array
                if (selected > current) {
                    let tempDate = new Date(current);
                    let tempDatesInBetween: DateData[] = [];

                    while (tempDate < selected) {
                        console.log("temp date");
                        tempDate.setDate(tempDate.getDate() + 1);

                        //Create temporary DateData object
                        const tempDateDate: DateData = {
                            year: tempDate.getFullYear(),
                            month: tempDate.getMonth(),
                            day: tempDate.getDay(),
                            timestamp: tempDate.getTime(),
                            dateString: tempDate.toISOString().split("T")[0],
                        };

                        //Store DateData object to array
                        tempDatesInBetween.push(tempDateDate);
                    }

                    //Do CSS binding to mark dates on calendar
                    tempStyles[startDate.dateString] = markedDateStartStyle;
                    for (const tempDate of tempDatesInBetween) {
                        tempStyles[tempDate.dateString] = markedDateStyle;
                    }
                    tempStyles[date.dateString] = markedDateEndStyle;

                    //Set state variables for selected dates
                    setMarkedDates(tempStyles);
                    setEndDate(date);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEnterBtn = () => {
        if (searchQuery) {
            //Create a set of params data
            let params = {
                searchQuery: searchQuery,
                fromDate: startDate?.dateString ?? "",
                toDate: endDate?.dateString ?? ""
            };
            handleParams(params);
        }
    }

    return (
        <Animated.View layout={isResizing ? undefined : isClose ? CurvedTransition.duration(200) : undefined} >
            <HStack
                width={isTablet && isClose ? "$1" : "$full"}
                borderTopWidth="$2"
                borderTopColor="#52525223"
                borderBottomWidth="$1"
                borderColor="#52525223"
                shadowOpacity={0.1}
                shadowRadius={6}
                borderTopLeftRadius="$lg"
                borderBottomLeftRadius="$lg"
                borderRadius="$sm"
                backgroundColor="white"
            >
                <Pressable onPress={() => { handleClick(!isClose) }}>
                    <Text></Text>
                    <Text
                        p="$2"
                        minHeight={300}
                        height="$full"
                        bgColor="black"
                        color="white"
                        alignContent="center"
                        borderTopLeftRadius="$lg"
                        borderBottomLeftRadius="$lg"
                        fontSize="$sm"
                    >{isClose ? '◀' : '▶'}</Text>
                </Pressable>

                {!isClose && (
                    <Animated.View
                        entering={FadeIn.duration(300)}
                    >
                        <VStack
                            width="$5/6"
                            alignSelf="center"
                            gap="$3"
                            paddingVertical="$6"
                            paddingLeft="$6"
                        >
                            <Text fontWeight={400} fontSize="$lg" paddingBottom="$2">Search News</Text>

                            <Box ref={searchBarRef}>
                                <SearchBar placeholder={isTablet || isMobile ? "Search Keyword" : "Enter Keyword(s) .."} barWidth="$full" setKeyword={setSearchQuery} />
                            </Box>
                            <Pressable ref={fromInputRef} onPress={() => { setShowCalendar(true); setFromDateClicked(true); }}>
                                <Input variant="outline" borderRadius="10" py="$1" px="$2" isReadOnly={true}>
                                    <InputSlot className="pl-3">
                                        <InputIcon as={CalendarDaysIcon} />
                                    </InputSlot>
                                    <InputField size={isDesktop ? "lg" : "sm"}
                                        placeholder={
                                            startDate ? startDate?.dateString.slice(8, 10) + "-"
                                                + startDate?.dateString.slice(5, 7) + "-"
                                                + startDate?.dateString.slice(0, 4)
                                                : "From"} />
                                </Input>
                            </Pressable>

                            <Pressable ref={toInputRef} onPress={() => { setShowCalendar(true); setToDateClicked(true); }}>
                                <Input variant="outline" borderRadius="10" py="$1" px="$2" isReadOnly={true}>
                                    <InputSlot className="pl-3">
                                        <InputIcon as={CalendarDaysIcon} />
                                    </InputSlot>
                                    <InputField size={isDesktop ? "lg" : "sm"}
                                        placeholder={
                                            endDate ? endDate?.dateString.slice(8, 10) + "-"
                                                + endDate?.dateString.slice(5, 7) + "-"
                                                + endDate?.dateString.slice(0, 4) : "To"} />
                                </Input>
                            </Pressable>

                            <Box ref={calendarRef}>
                                <Calendar
                                    markingType={'period'}
                                    onDayPress={(date: DateData) => {
                                        handleDateClick(date);
                                    }}
                                    maxDate={maxDate.toISOString()}
                                    markedDates={markedDates}
                                    disableAllTouchEventsForDisabledDays={true}

                                    style={{
                                        display: showCalendar ? 'flex' : 'none',
                                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                            </Box>
                            <Button size={isDesktop ? "lg" : "sm"} bg="black" onPress={() => handleEnterBtn()}>
                                <Text color='white' size={isDesktop ? "lg" : "xs"}>Search</Text>
                            </Button>
                        </VStack>
                    </Animated.View>
                )}

            </HStack >
        </Animated.View>
    )
}