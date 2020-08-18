import React from "react";
import { mount, shallow } from "enzyme";
import format from "date-fns/format";
import { describe, jest, test } from "@jest/globals";

import { CalendarInput } from ".";
import { CalendarContainer } from "./calendar-container";
import { DATE_FORMAT, TEST_DATE } from "../utils";

describe("Calendar app", () => {
  const handleChange = jest.fn();
  const handleOnOpen = jest.fn();
  const date = new Date(TEST_DATE);

  const wrapper = shallow(
    <CalendarInput value={date} onChange={handleChange} onOpen={handleOnOpen} />
  );

  test("Should match snapshot", () => {
    expect(wrapper.find(CalendarContainer)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  test("Should render calendar and match snapshot", () => {
    wrapper.find(".input").simulate("click");

    expect(wrapper.find(CalendarContainer)).toHaveLength(1);
    expect(handleOnOpen).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test("Should hide calendar and trigger onClose", () => {
    const handleOnClose = jest.fn();
    const component = shallow(
      <CalendarInput
        isOpened
        value={date}
        onChange={handleChange}
        onClose={handleOnClose}
      />
    );

    component.find(".input").simulate("click");
    expect(handleOnClose).toHaveBeenCalled();
    expect(component.find(CalendarContainer)).toHaveLength(0);
  });

  test("Should set today's date if date prop is not valid", () => {
    const component = shallow(
      <CalendarInput value={null} onChange={handleChange} />
    );

    expect(component.find(".input").props().children).toEqual(
      format(new Date(), DATE_FORMAT)
    );
  });

  test("Should change date", () => {
    const mockHandleChange = jest.fn();
    const component = shallow(
      <CalendarInput isOpened onChange={mockHandleChange} value={date} />
    );

    component.find(CalendarContainer).props().changeDate(new Date(), false);
    expect(mockHandleChange).toHaveBeenCalled();

    jest.useFakeTimers();
    jest.runOnlyPendingTimers();
    component.update();
    expect(component.find(".calendar")).toHaveLength(1);
  });

  test("Should change date and close", () => {
    const mockHandleChange = jest.fn();
    const component = shallow(
      <CalendarInput isOpened onChange={mockHandleChange} value={date} />
    );

    component.find(CalendarContainer).props().changeDate(new Date(), true);
    expect(mockHandleChange).toHaveBeenCalled();

    jest.useFakeTimers();
    jest.runOnlyPendingTimers();
    component.update();
    expect(component.find(".calendar")).toEqual({});
  });

  test("Should set correct z-index", () => {
    const zIndex = 15;
    const component = shallow(
      <CalendarInput
        isOpened
        onChange={handleChange}
        value={date}
        zIndex={zIndex}
      />
    );

    expect(component.find(".calendar").props().style.zIndex).toEqual(zIndex);
  });

  test("Should be on bottom", () => {
    const component = shallow(
      <CalendarInput isOpened onChange={handleChange} value={date} />
    );

    expect(component.find(".calendar").props().style.top).toEqual(0);
    expect(component.find(".calendar").props().style.transform).toEqual(
      "translateY(0)"
    );
  });

  test("Should trigger scroll listener", () => {
    window.addEventListener = jest.fn();
    mount(<CalendarInput isOpened onChange={handleChange} value={date} />);

    expect(window.addEventListener).toHaveBeenCalled();
  });

  test("Should be on top", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 50,
      left: 0,
      right: 0,
      top: 500,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    const component = mount(
      <CalendarInput isOpened onChange={handleChange} value={date} />
    );
    window.dispatchEvent(new Event("scroll"));

    expect(component.find(".calendar").at(0).props().style.top).not.toEqual(0);
    expect(
      component.find(".calendar").at(0).props().style.transform
    ).not.toEqual("translateY(0)");
  });
});
