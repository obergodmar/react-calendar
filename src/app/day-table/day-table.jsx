import React, { Fragment, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import startOfWeek from "date-fns/startOfWeek";

import { TEST_DATE, WEEKDAY_FORMAT } from "../../utils";

import style from "./day-table.css";

export const DayTable = ({ calendar, changeDate }) => {
  // TODO: Add locale
  const weekdays = useMemo(() => {
    let date = startOfWeek(TEST_DATE);
    return [...Array(7).keys()].map(() => {
      const weekday = format(date, WEEKDAY_FORMAT);
      date = addDays(date, 1);
      return weekday;
    });
  }, []);

  const handlePreventDefault = useCallback(
    (event) => event.preventDefault(),
    []
  );

  const handleKeyDown = useCallback(
    (event, date, needClose) => {
      const { keyCode } = event;
      if (keyCode === 13 || keyCode === 32) {
        changeDate(date, needClose);
      }
    },
    [changeDate]
  );

  return (
    <Fragment>
      <ul className={style.row}>
        {weekdays.map((day, idx) => (
          <li key={idx} className={style.weekday}>
            {day}
          </li>
        ))}
      </ul>
      <ul className={style.list}>
        {calendar.map((row, rowIdx) => (
          <li key={rowIdx}>
            <ul className={style.row}>
              {row.map((day, dayIdx) => (
                <li
                  tabIndex={0}
                  onMouseDown={handlePreventDefault}
                  onClick={() => changeDate(day.date, day.isPart)}
                  onKeyDown={(e) => handleKeyDown(e, day.date, day.isPart)}
                  key={dayIdx}
                  className={cn(style.day, {
                    [style.dayOther]: !day.isPart,
                    [style.dayToday]: day.isToday,
                    [style.daySelected]: day.isSelected,
                  })}
                >
                  {day.date.getDate()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

DayTable.propTypes = {
  calendar: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        isToday: PropTypes.bool,
        isSelected: PropTypes.bool,
        isPart: PropTypes.bool,
      })
    )
  ).isRequired,
  changeDate: PropTypes.func.isRequired,
};

DayTable.displayName = "DayTable";
