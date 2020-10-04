import React from "react";
import { render } from "@testing-library/react";
import DeleteModal from "../DeleteModal";

it("renders without crashing", function() {
  render(<DeleteModal />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<DeleteModal />);
  expect(asFragment()).toMatchSnapshot();
});
