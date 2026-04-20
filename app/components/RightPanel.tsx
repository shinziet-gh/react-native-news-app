import { Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Calendar, DateData } from 'react-native-calendars';


export default function RightPanel() {

    //Declare date variables
    const dateNow = new Date();
    const minDate = new Date(dateNow);
    const maxDate = new Date(dateNow);

    minDate.setMonth(minDate.getMonth() - 3);
    maxDate.setDate(maxDate.getDate() - 1);

    const [dateValue, setDateValue] = useState<DateData>();
    const [dateRangeBetween, setDateRangeBetween] = useState<DateData[]>([]);
    const [dateRangeEnd, setDateRangeEnd] = useState<DateData>();
    const [markingStyle, setMarkingStyle] = useState<Record<string, Object>>();

    const markedDateStartStyle = { startingDay: true, color: 'black', textColor: 'white' };
    const markedDateStyle = { color: 'black', textColor: 'white' };
    const markedDateEndStyle = { endingDay: true, color: 'black', textColor: 'white' };

    const handleDateClick = (date: DateData) => {
        try {
            console.log("Event clicked");

            setMarkingStyle({});
            setDateRangeBetween([]);

            const tempStyles: Record<string, Object> = {};



            if (!dateValue) return;

            tempStyles[dateValue.dateString] = markedDateStartStyle;

            setMarkingStyle(tempStyles);

            const selected = new Date(date.dateString);
            const current = new Date(dateValue.dateString);

            if (selected > current) {

                let tempDate = new Date(current);
                while (tempDate < selected) {

                    console.log("While loop");
                    tempDate.setDate(tempDate.getDate() + 1);

                    const newDateData: DateData = {
                        year: tempDate.getFullYear(),
                        month: tempDate.getMonth(),
                        day: tempDate.getDay(),
                        timestamp: tempDate.getTime(),
                        dateString: tempDate.toISOString().split("T")[0],
                    };

                    dateRangeBetween.push(newDateData);
                }
                setDateRangeEnd(date);

                //Do CSS binding

                for (const tempDate of dateRangeBetween) {
                    tempStyles[tempDate.dateString] = markedDateStyle;
                }
                tempStyles[date.dateString] = markedDateEndStyle;

                setMarkingStyle(tempStyles);

            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box>
            <Text>{dateValue?.dateString}</Text>
            <Text>{dateRangeEnd?.dateString}</Text>
            <Text>{JSON.stringify(markingStyle)}</Text>
            <Calendar
                markingType={'period'}
                onDayPress={(date: DateData) => {
                    setDateValue(date);
                    handleDateClick(date);
                }}
                maxDate={maxDate.toISOString()}
                markedDates={markingStyle}
                disableAllTouchEventsForDisabledDays={true}
            />
        </Box>
    )
}