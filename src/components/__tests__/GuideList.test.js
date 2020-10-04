import React from "react";
import { render } from "@testing-library/react";
import GuideList from "../GuideList";

it("renders without crashing", function() {
  render(<GuideList guides={ [{ type: ['ski', 'telemark'] }] } />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GuideList guides={ [{ type: ['ski', 'telemark'] }] } />);
  expect(asFragment()).toMatchSnapshot();
});
