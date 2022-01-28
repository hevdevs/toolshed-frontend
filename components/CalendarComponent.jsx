import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";

const CalendarComponent = ({ requestedDates, bookedDates }) => {
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const dateObject = {};

  if (bookedDates)
    bookedDates.forEach((date) => {
      dateObject[date] = {
        selected: true,
        selectedColor: "red",
        disableTouchEvent: true,
      };
    });

  if (requestedDates)
    requestedDates.forEach((date) => {
      dateObject[date] = {
        selected: true,
        selectedColor: "yellow",
      };
    });

  const currentDate = new Date().toJSON().slice(0, 10);

  return (
    <View>
      <Calendar
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          setSelectedStartDate(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        monthFormat={"MMMM yyyy"}
        minDate={currentDate}
        hideArrows={true}
        hideExtraDays={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        markedDates={dateObject}
      />
      <Text>{selectedStartDate}</Text>
      {selectedStartDate ? (
        <Button title={`Request for ${selectedStartDate}`} />
      ) : null}
    </View>
  );
};

export default CalendarComponent;
