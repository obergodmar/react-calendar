import React, { useCallback } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import style from "./year-picker.css";

export const YearPicker = ({ date, addYear }) => {
  const handleGoLeftDouble = useCallback(() => addYear(-25), [addYear]);
  const handleGoLeft = useCallback(() => addYear(-1), [addYear]);
  const handleGoRight = useCallback(() => addYear(1), [addYear]);
  const handleGoRightDouble = useCallback(() => addYear(25), [addYear]);

  return (
    <div className={style.yearPicker}>
      <button
        onClick={handleGoLeftDouble}
        className={cn(style.button, style.doubleLeft)}
      />
      <button onClick={handleGoLeft} className={cn(style.button, style.left)} />
      <span>{date}</span>
      <button
        onClick={handleGoRight}
        className={cn(style.button, style.right)}
      />
      <button
        onClick={handleGoRightDouble}
        className={cn(style.button, style.doubleRight)}
      />
    </div>
  );
};

YearPicker.propTypes = {
  date: PropTypes.number.isRequired,
  addYear: PropTypes.func.isRequired,
};

YearPicker.displayName = "YearPicker";
