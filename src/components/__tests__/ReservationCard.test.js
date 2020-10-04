import React from "react";
import { render } from "@testing-library/react";
import ReservationCard from "../ReservationCard";

it("renders without crashing", function() {
  render(<ReservationCard date="2020-10-01" />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<ReservationCard date="2020-10-01" />);
  expect(asFragment()).toMatchSnapshot();
});
