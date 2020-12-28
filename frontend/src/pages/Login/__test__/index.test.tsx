import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import Login from "../";
function renderLogin(){
    return render(Login());
}
describe("<Login />", () => {
  test("should display a blank login form", async () => {
    const { findByTestId } = renderLogin();
    const loginForm = await findByTestId("loginForm");
        expect(loginForm).toHaveFormValues({
        username: "",
        password: ""
        });
  });
  test("should allow entering a ")
});