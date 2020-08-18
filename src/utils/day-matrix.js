import { addDays, format, startOfWeek } from "date-fns";
import { FULL_FORMAT } from "./constants";

const rows = 6;
const cols = 7;
const length = rows * cols;

export default (currentDate) => {
  const today = format(new Date(), FULL_FORMAT);
  const currentDateFormat = format(currentDate, FULL_FORMAT);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const startDate = startOfWeek(new Date(year, month, 1));
  return Array.from({ length })
    .map((_, index) => {
      const date = addDays(startDate, index);
      const dateFormat = format(date, FULL_FORMAT);
      const currentMonth = date.getMonth();
      const isPart = currentMonth === month;
      const isToday = dateFormat === today;
      const isSelected = currentDateFormat === dateFormat;
      return {
        date,
        isToday,
        isSelected,
        isPart,
      };
    })
    .reduce(
      (matrix, _, index, days) =>
        !(index % cols !== 0)
          ? [...matrix, days.slice(index, index + cols)]
          : matrix,
      []
    );
};
