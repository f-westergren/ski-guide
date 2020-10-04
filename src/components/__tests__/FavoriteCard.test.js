import React from "react";
import { render } from "@testing-library/react";
import FavoriteCard from "../FavoriteCard";

it("renders without crashing", function() {
  render(<FavoriteCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<FavoriteCard />);
  expect(asFragment()).toMatchSnapshot();
});
