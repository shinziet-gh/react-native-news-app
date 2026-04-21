import { Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Calendar, DateData } from 'react-native-calendars';


export default function RightPanel() {

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

            //Reset state variable values to empty list or null
            if (startDate && endDate) {
                setStartDate(date);
                setEndDate(null);
                setMarkedDates({
                    [date.dateString]: markedDateStartStyle,
                });
                setDatesInBetween([]);
                return;
            }

            if (startDate) {
                //Store selected dates and their CSS styles
                const tempStyles: Record<string, Object> = {};

                //Temporary variables for iterating through while loop
                const selected = new Date(date.dateString);
                const current = new Date(startDate.dateString);

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

    return (
        <Box>
            <Calendar
                markingType={'period'}
                onDayPress={(date: DateData) => {
                    handleDateClick(date);
                }}
                maxDate={maxDate.toISOString()}
                markedDates={markedDates}
                disableAllTouchEventsForDisabledDays={true}
            />
        </Box>
    )
}