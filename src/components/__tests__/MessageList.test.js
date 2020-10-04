import React from "react";
import { render } from "@testing-library/react";
import MessageList from "../MessageList";

it("renders without crashing", function() {
  render(<MessageList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<MessageList />);
  expect(asFragment()).toMatchSnapshot();
});
