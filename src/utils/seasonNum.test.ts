import { seasonNum } from "./seasonNum";

test("seaonNum returns a string, after being passed two numbers", () => {
  expect(seasonNum(2, 3)).toBe("S02E03");
  expect(seasonNum(12, 31)).toBe("S12E31");
  expect(seasonNum(121, -1)).toBe("S121E0-1");
});
