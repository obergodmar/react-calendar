/**
 * Sums up two numbers.
 *
 * @param {Date} value date value; If not Date type, then will use today's date.
 * @param {Function} onChange Change handler; Accepts one argument of date type.
 * @param {boolean} isOpen If true, then the calendar will be opened by default.
 * @param {number} zIndex Specify z-index property for calendar.
 * @param {Function} onOpen Will trigger when calendar opens.
 * @param {Function} onClose Will trigger when calendar closes.
 */
export declare type CalendarInput = {
  value: Date;
  onChange: (value: Date) => void;
  isOpen?: boolean;
  zIndex: number;
  onOpen: () => void;
  onClose: () => void;
};
