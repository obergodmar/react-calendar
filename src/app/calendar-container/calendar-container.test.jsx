import React from "react";
import { shallow } from "enzyme";
import { describe, jest, test } from "@jest/globals";
import { YearPicker } from "../year-picker";
import { MonthSelect } from "../month-select";
import { DayTable } from "../day-table";
import { MonthSelectButton } from "../month-select-button";

import { CalendarContainer } from "./calendar-container";
import { TEST_DATE } from "../../utils";

describe("Calendar app", () => {
  const handleChangeDate = jest.fn();
  const date = new Date(TEST_DATE);

  const wrapper = shallow(
    <CalendarContainer changeDate={handleChangeDate} date={date} />
  );

  test("Should display DayTable by default", () => {
    expect(wrapper.find(YearPicker)).toHaveLength(0);
    expect(wrapper.find(MonthSelect)).toHaveLength(0);
    expect(wrapper.find(DayTable)).toHaveLength(1);
    expect(wrapper.find(MonthSelectButton)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  test("Should display YearPicker and MonthSelect when click on button", () => {
    wrapper.find(MonthSelectButton).props().onClick();
    expect(wrapper.find(YearPicker)).toHaveLength(1);
    expect(wrapper.find(MonthSelect)).toHaveLength(1);
    expect(wrapper.find(DayTable)).toHaveLength(0);
    expect(wrapper.find(MonthSelectButton)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  test("Should change date", () => {
    const mockChangeDate = jest.fn();
    const component = shallow(
      <CalendarContainer changeDate={mockChangeDate} date={date} />
    );

    component.find(MonthSelectButton).props().addMonth();
    expect(mockChangeDate).toHaveBeenCalledTimes(1);

    component.find(DayTable).props().changeDate();
    expect(mockChangeDate).toHaveBeenCalledTimes(2);

    component.find("button").simulate("click");
    expect(mockChangeDate).toHaveBeenCalledTimes(3);

    component.find(MonthSelectButton).props().onClick();
    component.find(YearPicker).props().addYear();
    expect(mockChangeDate).toHaveBeenCalledTimes(4);

    component.find(MonthSelect).props().changeMonth();
    expect(mockChangeDate).toHaveBeenCalledTimes(5);
  });
});
