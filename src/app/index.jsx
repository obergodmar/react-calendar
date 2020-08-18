import "@babel/polyfill";
import React, {
  createRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import isValid from "date-fns/isValid";

import { CalendarContainer } from "./calendar-container";
import { DATE_FORMAT } from "../utils";

import style from "./style.css";

export const CalendarInput = ({
  value,
  onChange,
  isOpened,
  zIndex,
  onOpen,
  onClose,
}) => {
  const date = useMemo(() => (isValid(value) ? value : new Date()), [value]);
  const dateFormatted = useMemo(() => format(date, DATE_FORMAT), [date]);
  const calendarRef = createRef();
  const buttonRef = createRef();
  const [isCalendarShown, setCalendarShown] = useState(isOpened);
  const [position, setPosition] = useState({
    offset: 0,
    onTop: false,
  });

  const handleScroll = useCallback(() => {
    if (!calendarRef.current || !buttonRef.current) {
      return;
    }
    const {
      height: buttonHeight,
      top,
    } = buttonRef.current.getBoundingClientRect();
    const { offsetHeight: calendarHeight } = calendarRef.current;
    const onTop = top > calendarHeight;
    const offset = onTop ? 0 : buttonHeight;
    setPosition({ offset, onTop });
  }, [calendarRef, buttonRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line
  }, [isCalendarShown]);

  const handleClickChangeDate = useCallback(() => {
    handleScroll();
    if (!isCalendarShown && onOpen) {
      onOpen();
    }
    if (isCalendarShown && onClose) {
      onClose();
    }
    setCalendarShown(!isCalendarShown);
  }, [isCalendarShown, handleScroll, onOpen, onClose]);

  const handleChangeDate = useCallback(
    (newValue, needClose) => {
      onChange(newValue);

      if (!needClose) {
        return;
      }
      setTimeout(() => {
        setCalendarShown(!isCalendarShown);
      }, 100);
    },
    [onChange, isCalendarShown]
  );

  return (
    <Fragment>
      <div className={style.calendarContainer}>
        <button
          ref={buttonRef}
          onClick={handleClickChangeDate}
          className={style.input}
        >
          {dateFormatted}
        </button>
        {isCalendarShown && (
          <div
            ref={calendarRef}
            style={{
              zIndex: Number(zIndex) || 1,
              transition: "transform .2s ease-out",
              top: position.onTop ? -position.offset : position.offset,
              transform: `translateY(${position.onTop ? "-100%" : 0})`,
            }}
            className={style.calendar}
          >
            <CalendarContainer date={date} changeDate={handleChangeDate} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

CalendarContainer.defaultProps = {
  isOpened: false,
  zIndex: 1,
  onOpen: () => {},
  onClose: () => {},
};

CalendarInput.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  isOpened: PropTypes.bool,
  zIndex: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

CalendarInput.displayName = "CalendarInput";
