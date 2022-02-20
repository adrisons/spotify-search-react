import App from "App";
import Dashboard from "components/Dashboard";
import LoginPage from "components/login/LoginPage";
import NotFoundPage from "components/NotFoundPage";
import { shallow } from "enzyme";
import React from "react";
import { Navigate, Route } from "react-router-dom";

let pathMap: any = {};
describe("WHEN: routes", () => {
  let component: any;
  beforeAll(() => {
    component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap: any, route: any) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.element.type;
      return pathMap;
    }, {});
    console.log(pathMap);
  });
  it("THEN: should show LoginPage component for /login router", () => {
    expect(pathMap["/login"]).toBe(LoginPage);
  });
  it("THEN: should show Dashboard component for / router", () => {
    expect(pathMap["/"]).toBe(Dashboard);
  });
  it("THEN: should show NotFoundPage component for /not-found router", () => {
    expect(pathMap["/not-found"]).toBe(NotFoundPage);
  });
  it("THEN: should Navigate to NotFoundPage component for route not defined", () => {
    const actual = pathMap["*"];
    expect(actual).toEqual(Navigate);
    //TODO: expect(actual.arguments).toEqual('/not-found');
  });
});
