import React from "react";
import { render } from "@testing-library/react";
import MessageModal from "../MessageModal";

it("renders without crashing", function() {
  render(<MessageModal />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<MessageModal />);
  expect(asFragment()).toMatchSnapshot();
});
