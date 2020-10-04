import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../NotFound";

it("renders without crashing", function() {
  render(<NotFound />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot();
});
