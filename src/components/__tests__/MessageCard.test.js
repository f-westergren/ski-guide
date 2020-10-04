import React from "react";
import { render } from "@testing-library/react";
import MessageCard from "../MessageCard";

it("renders without crashing", function() {
  render(<MessageCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<MessageCard />);
  expect(asFragment()).toMatchSnapshot();
});
