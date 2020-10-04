import React from "react";
import { render } from "@testing-library/react";
import ReservationList from "../ReservationList";

it("renders without crashing", function() {
  render(<ReservationList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<ReservationList />);
  expect(asFragment()).toMatchSnapshot();
});
