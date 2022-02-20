import axios from "axios";
import { get } from "./httpRequests";
jest.mock("axios");

describe("GIVEN: httpRequest", () => {
  describe("with success", () => {
    const url = "http://test-url.com";
    const access_token = "access-token";
    let data = {};

    beforeEach(async () => {
      jest
        .spyOn(axios, "get")
        .mockReturnValue(Promise.resolve({ data: "result" }));
      data = await get(url, access_token);
    });

    it("THEN: should add auth header", () => {
      expect(axios.defaults.headers.common["Authorization"]).toEqual(
        `Bearer ${access_token}`
      );
    });
    it("THEN: should call axios get", () => {
      expect(axios.get).toHaveBeenCalledWith(url);
    });
    it("THEN: should return result", () => {
      expect(data).toEqual("result");
    });
  });
});
