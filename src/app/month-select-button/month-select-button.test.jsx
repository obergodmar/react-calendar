import React from "react";
import { shallow } from "enzyme";
import { describe, jest, test } from "@jest/globals";

import { MonthSelectButton } from ".";

describe("Month Select Button", () => {
  const handleClick = jest.fn();
  const currentDate = "January 1970";
  const handleAddMonth = jest.fn();
  const wrapper = shallow(
    <MonthSelectButton
      onClick={handleClick}
      currentDate={currentDate}
      addMonth={handleAddMonth}
      isShown={false}
    />
  );

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should remove month by click", () => {
    wrapper.find(".buttonUp").simulate("click");
    expect(handleAddMonth).toHaveBeenCalledWith(-1);
  });

  test("Should add month by click", () => {
    wrapper.find(".buttonDown").simulate("click");
    expect(handleAddMonth).toHaveBeenCalledWith(1);
  });
});
