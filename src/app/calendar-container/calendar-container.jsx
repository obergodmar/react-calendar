import React, { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import set from "date-fns/set";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";

import { dayMatrix, MONTH_YEAR } from "../../utils";
import { MonthSelect } from "../month-select";
import { MonthSelectButton } from "../month-select-button";
import { YearPicker } from "../year-picker";
import { DayTable } from "../day-table";

import style from "./calendar-container.css";

export const CalendarContainer = ({ date, changeDate }) => {
  const [isMonthSelectShown, setMonthSelectShown] = useState(false);
  const calendar = useMemo(() => dayMatrix(date), [date]);
  const currentDate = useMemo(() => {
    const monthYear = format(date, MONTH_YEAR);
    return monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
  }, [date]);

  const handleChangeDate = useCallback(
    (newDate, needClose = false) => {
      changeDate(newDate, needClose);
    },
    [changeDate]
  );

  const handleShowMonthSelect = useCallback(() => {
    setMonthSelectShown(!isMonthSelectShown);
  }, [isMonthSelectShown]);

  const handleChangeMonth = useCallback(
    (month) => {
      const newDate = set(date, { month });
      handleChangeDate(newDate);
      handleShowMonthSelect();
    },
    [date, handleChangeDate, handleShowMonthSelect]
  );

  const handleAddMonth = useCallback(
    (amount) => {
      const newDate = addMonths(date, amount);
      handleChangeDate(newDate);
    },
    [date, handleChangeDate]
  );

  const handleAddYear = useCallback(
    (amount) => {
      const newDate = addYears(date, amount);
      handleChangeDate(newDate);
    },
    [date, handleChangeDate]
  );

  const handleChangeToToday = useCallback(() => {
    handleChangeDate(new Date(), true);
  }, [handleChangeDate]);

  return (
    <div className={style.calendar}>
      <MonthSelectButton
        isShown={isMonthSelectShown}
        addMonth={handleAddMonth}
        onClick={handleShowMonthSelect}
        currentDate={currentDate}
      />
      {isMonthSelectShown ? (
        <Fragment>
          <YearPicker date={date.getFullYear()} addYear={handleAddYear} />
          <MonthSelect changeMonth={handleChangeMonth} date={date} />
        </Fragment>
      ) : (
        <Fragment>
          <DayTable calendar={calendar} changeDate={handleChangeDate} />
          <button onClick={handleChangeToToday} className={style.todayButton}>
            Today
          </button>
        </Fragment>
      )}
    </div>
  );
};

CalendarContainer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  changeDate: PropTypes.func.isRequired,
};

CalendarContainer.displayName = "CalendarContainer";
