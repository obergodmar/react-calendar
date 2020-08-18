import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";

import { MONTH_FORMAT, TEST_DATE } from "../../utils";

import style from "./month-select.css";

export const MonthSelect = ({ date, changeMonth }) => {
  // TODO: Add locale
  const months = useMemo(() => {
    let testDate = TEST_DATE;
    return [...Array(12).keys()].map(() => {
      const month = format(testDate, MONTH_FORMAT);
      testDate = addMonths(testDate, 1);
      return month;
    });
  }, []);

  const currentYear = useMemo(() => date.getFullYear(), [date]);
  const currentMonth = useMemo(() => date.getMonth(), [date]);

  const monthToday = useMemo(() => new Date().getMonth(), []);
  const yearToday = useMemo(() => new Date().getFullYear() === currentYear, [
    currentYear,
  ]);

  const handlePreventDefault = useCallback(
    (event) => event.preventDefault(),
    []
  );

  const handleKeyDown = useCallback(
    (event, value) => {
      const { keyCode } = event;
      if (keyCode === 13 || keyCode === 32) {
        changeMonth(value);
      }
    },
    [changeMonth]
  );

  return (
    <ul className={style.monthSelect}>
      {months.map((month, idx) => (
        <li
          key={idx}
          tabIndex={0}
          className={cn(style.monthSelectItem, {
            [style.monthSelectItemToday]: monthToday === idx + 1 && yearToday,
            [style.monthSelectItemSelected]: currentMonth === idx + 1,
          })}
          onMouseDown={handlePreventDefault}
          onClick={() => changeMonth(idx + 1)}
          onKeyDown={(e) => handleKeyDown(e, idx + 1)}
        >
          {month}
        </li>
      ))}
    </ul>
  );
};

MonthSelect.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  changeMonth: PropTypes.func.isRequired,
};

MonthSelect.displayName = "MonthSelect";
