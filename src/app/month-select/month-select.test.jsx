import React from "react";
import { shallow } from "enzyme";
import { describe, jest, test } from "@jest/globals";

import { MonthSelect } from ".";
import { TEST_DATE } from "../../utils";

describe("Month Select", () => {
  const handleChangeMonth = jest.fn();
  const date = new Date(TEST_DATE);
  const wrapper = shallow(
    <MonthSelect date={date} changeMonth={handleChangeMonth} />
  );

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should change month by click", () => {
    wrapper.find("li").at(5).simulate("click");
    expect(handleChangeMonth).toHaveBeenCalledWith(6);
  });

  test("Should change month by keydown", () => {
    wrapper.find("li").at(5).simulate("keydown", { keyCode: 13 });
    expect(handleChangeMonth).toHaveBeenCalledWith(6);

    wrapper.find("li").at(7).simulate("keydown", { keyCode: 32 });
    expect(handleChangeMonth).toHaveBeenCalledWith(8);
  });

  test("Should not change month by keydown", () => {
    const newChangeMonth = jest.fn();
    const component = shallow(
      <MonthSelect date={date} changeMonth={newChangeMonth} />
    );

    component.find("li").at(5).simulate("keydown", { keyCode: 37 });
    expect(newChangeMonth).not.toHaveBeenCalled();
  });

  test("Should be default prevented", () => {
    const event = { preventDefault: jest.fn() };

    wrapper.find("li").at(5).simulate("mousedown", event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  test("Should be 1st of January", () => {
    expect(wrapper.find("li").at(0).is(".monthSelectItemSelected")).toEqual(
      true
    );
  });

  test("Should be today's year", () => {
    const month = new Date().getMonth();
    const dateToday = new Date();
    const component = shallow(
      <MonthSelect date={dateToday} changeMonth={handleChangeMonth} />
    );

    expect(
      component
        .find("li")
        .at(month - 1)
        .is(".monthSelectItemToday")
    ).toEqual(true);
  });
});
