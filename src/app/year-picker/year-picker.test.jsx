import React from "react";
import { shallow } from "enzyme";
import { describe, jest, test } from "@jest/globals";

import { YearPicker } from ".";

describe("Year Picker", () => {
  const handleAddYear = jest.fn();
  const date = 1970;
  const wrapper = shallow(<YearPicker addYear={handleAddYear} date={date} />);

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should decrease year by one", () => {
    wrapper.find(".left").simulate("click");
    expect(handleAddYear).toHaveBeenCalledWith(-1);
  });

  test("Should increase year by one", () => {
    wrapper.find(".right").simulate("click");
    expect(handleAddYear).toHaveBeenCalledWith(1);
  });

  test("Should decrease year by 25", () => {
    wrapper.find(".doubleLeft").simulate("click");
    expect(handleAddYear).toHaveBeenCalledWith(-25);
  });

  test("Should increase year by 25", () => {
    wrapper.find(".doubleRight").simulate("click");
    expect(handleAddYear).toHaveBeenCalledWith(25);
  });
});
