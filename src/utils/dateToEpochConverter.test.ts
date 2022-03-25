import dateConverter from "./dateToEpochConverter";

test("dateConverter converts human readable dates into epochs and returns a string of the epoch", () => {
  expect(dateConverter("1989-12-17")).toBe("629856000");
  expect(dateConverter("2019-04-14")).toBe("1555200000");
});
