import { Box, HStack, Text, Input, Button, InputIcon, InputSlot, CalendarDaysIcon, InputField, VStack } from "@gluestack-ui/themed";
import { useState, useEffect, useRef } from "react";
import { Calendar, DateData } from 'react-native-calendars';
import SearchBar from "./SearchBar";
import { useResponsive } from "../hooks/UseResponsive";
import { Pressable } from "react-native";

export default function RightPanel({ handleParams }: Readonly<{ handleParams: (params: { searchQuery: string; fromDate: string; toDate: string; }) => void; }>) {

    //Get window dimensions
    const { width, height, isMobile } = useResponsive();

    //State variables for search query
    const [searchQuery, setSearchQuery] = useState("");

    //Flag for calendar display & click event
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const [fromDateClicked, setFromDateClicked] = useState(false);
    const [toDateClicked, setToDateClicked] = useState(false);

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
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
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
        <Box
            width="$5/6"
            alignSelf="center"
            gap="$3"
            p="$6"
            backgroundColor="white"
            borderTopWidth="$4"
            borderTopColor="black"
            borderBottomWidth="$1"
            borderBottomColor="#52525250"
            shadowOpacity={0.1}
            shadowRadius={6}
            borderRadius="$sm"
        >
            <Text fontWeight={400} fontSize="$lg" paddingBottom="$2">Search News</Text>
            <SearchBar placeholder="Enter keyword(s)..." barWidth="$full" setKeyword={setSearchQuery} />
            <Pressable onPress={() => { setShowCalendar(true); setFromDateClicked(true) }}>
                <Input variant="outline" borderRadius="10" py="$1" px="$2" isReadOnly={true}>
                    <InputSlot className="pl-3">
                        <InputIcon as={CalendarDaysIcon} />
                    </InputSlot>
                    <InputField placeholder={startDate ? startDate?.dateString.slice(5, 10) + "-" + startDate?.dateString.slice(0, 4) : "From"} />
                </Input>
            </Pressable>

            <Pressable onPress={() => { setShowCalendar(true); setToDateClicked(true) }}>
                <Input variant="outline" borderRadius="10" py="$1" px="$2" isReadOnly={true}>
                    <InputSlot className="pl-3">
                        <InputIcon as={CalendarDaysIcon} />
                    </InputSlot>
                    <InputField placeholder={endDate ? endDate?.dateString.slice(5, 10) + "-" + endDate?.dateString.slice(0, 4) : "To"} />
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
            <Button w="$3/5" size="lg" bg="black" onPress={() => handleEnterBtn()}>
                <Text color='white'>Search</Text>
            </Button>
        </Box>

    )
}