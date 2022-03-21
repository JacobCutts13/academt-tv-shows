import searchFilter from "./searchFilter";
import got from "../data/got.json";

test("searchFilter checks episode title or summary contains search term and returns boolean", () => {
  expect(searchFilter(got[0], "winter")).toBe(true);
  expect(searchFilter(got[4], "01")).toBe(false);
  expect(searchFilter(got[1], "WALL,")).toBe(true);
});
