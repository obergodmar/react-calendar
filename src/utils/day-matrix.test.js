/* eslint-disable no-console */
import { describe, test } from "@jest/globals";
import { dayMatrix, TEST_DATE } from ".";

describe("Checks if day matrix function works well", () => {
  const calendar = dayMatrix(TEST_DATE);

  test("Checks if day matrix has 6 rows", () => {
    expect(calendar).toHaveLength(6);
  });

  test("Checks if day matrix has 7 columns", () => {
    calendar.forEach((row) => expect(row).toHaveLength(7));
  });

  test("Checks if day matrix has right format", () => {
    const { hasOwnProperty } = Object.prototype;
    calendar.forEach((row) =>
      row.forEach((date) => {
        const dateProp = hasOwnProperty.call(date, "date");
        const isTodayProp = hasOwnProperty.call(date, "isToday");
        const isSelectedProp = hasOwnProperty.call(date, "isSelected");
        const isPartProp = hasOwnProperty.call(date, "isPart");

        if (!dateProp) {
          console.log("Don't have date prop");
        }
        if (!isTodayProp) {
          console.log("Don't have isToday prop");
        }
        if (!isSelectedProp) {
          console.log("Don't have isSelected prop");
        }
        if (!isPartProp) {
          console.log("Don't have isPart prop");
        }

        expect(dateProp && isTodayProp && isSelectedProp && isPartProp).toBe(
          true
        );
      })
    );
  });
});
