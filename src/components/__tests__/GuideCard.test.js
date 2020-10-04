import React from "react";
import { render } from "@testing-library/react";
import GuideCard from "../GuideCard";

it("renders without crashing", function() {
  render(<GuideCard type={['ski', 'telemark']} />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GuideCard type={['ski', 'telemark']} />);
  expect(asFragment()).toMatchSnapshot();
});
