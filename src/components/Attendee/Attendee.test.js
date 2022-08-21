import React from "react";
import ReactDom from "react-dom";
import Attendee from "./Attendee";
import AddLocationAltTwoToneIcon from '@mui/icons-material/AddLocationAltTwoTone';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"

it("renders Attendee without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Attendee></Attendee>, div);
})

it("renders Attendee component correctly", () => {
    const {getByTestId} = render(<Attendee username={"JohnCena"}></Attendee>);
    expect(getByTestId("attendee-container")).toHaveTextContent("JohnCena");
})