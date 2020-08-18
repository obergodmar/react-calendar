import React, { useCallback } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import style from "./month-select-button.css";

export const MonthSelectButton = ({
  currentDate,
  onClick,
  isShown,
  addMonth,
}) => {
  const handleRemoveMonth = useCallback(() => addMonth(-1), [addMonth]);
  const handleAddMonth = useCallback(() => addMonth(1), [addMonth]);

  return (
    <div className={style.buttonGroup}>
      <button
        onClick={onClick}
        className={cn(style.monthSelectButton, {
          [style.selectShown]: isShown,
        })}
      >
        <span>{currentDate}</span>
        <span
          className={cn(style.selectIcon, {
            [style.selectIconShown]: isShown,
          })}
        />
      </button>
      {!isShown && (
        <div className={style.buttonUpDown}>
          <button onClick={handleRemoveMonth} className={style.buttonUp} />
          <button onClick={handleAddMonth} className={style.buttonDown} />
        </div>
      )}
    </div>
  );
};

MonthSelectButton.propTypes = {
  currentDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  addMonth: PropTypes.func.isRequired,
};

MonthSelectButton.displayNmae = "MonthSelectButton";
