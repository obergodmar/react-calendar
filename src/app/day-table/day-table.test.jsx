import React from "react";
import { describe, jest, test } from "@jest/globals";
import { shallow } from "enzyme";

import { dayMatrix, TEST_DATE } from "../../utils";
import { DayTable } from "./day-table";

describe("Day Table", () => {
  const handleChangeDate = jest.fn();
  const calendar = dayMatrix(new Date(TEST_DATE));
  const wrapper = shallow(
    <DayTable calendar={calendar} changeDate={handleChangeDate} />
  );

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should change date by click", () => {
    wrapper.find(".day").at(2).simulate("click");
    expect(handleChangeDate).toHaveBeenCalled();
  });

  test("Should change date by keydown", () => {
    wrapper.find(".day").at(5).simulate("keydown", { keyCode: 13 });
    expect(handleChangeDate).toHaveBeenCalled();

    wrapper.find(".day").at(7).simulate("keydown", { keyCode: 32 });
    expect(handleChangeDate).toHaveBeenCalled();
  });

  test("Should not change date by keydown", () => {
    const newChangeMonth = jest.fn();
    const component = shallow(
      <DayTable calendar={calendar} changeDate={handleChangeDate} />
    );

    component.find(".day").at(5).simulate("keydown", { keyCode: 37 });
    expect(newChangeMonth).not.toHaveBeenCalled();
  });

  test("Should be default prevented", () => {
    const event = { preventDefault: jest.fn() };

    wrapper.find(".day").at(10).simulate("mousedown", event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  test("Should be 1st of January", () => {
    expect(wrapper.find(".day").at(0).is(".daySelected")).toEqual(true);
  });
});
