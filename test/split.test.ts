import { splitCells, compile } from "../src/parser";

const cells = (src: string) =>
  splitCells(src).map(({ from, to }) => src.slice(from, to));

describe("splitCells", () => {
  it("splits independent statements by line", () => {
    expect(
      cells(
        "吾有一數。曰三。名之曰「甲」。\n吾有一言。曰「「問天地好在。」」。書之。"
      )
    ).toEqual([
      "吾有一數。曰三。名之曰「甲」。",
      "吾有一言。曰「「問天地好在。」」。書之。"
    ]);
  });

  it("keeps a pending value with the line that consumes it", () => {
    expect(cells("夫「甲」。\n書之。\n加一以二。\n名之曰「丙」。")).toEqual([
      "夫「甲」。\n書之。",
      "加一以二。\n名之曰「丙」。"
    ]);
  });

  it("keeps statements on one line together", () => {
    expect(cells("吾有一數。曰三。名之曰「甲」。夫「甲」。書之。")).toEqual([
      "吾有一數。曰三。名之曰「甲」。夫「甲」。書之。"
    ]);
  });

  it("keeps blocks whole", () => {
    const loop = "為是三遍。\n\t夫「甲」。書之。\n云云。";
    const fun =
      "吾有一術。名之曰「倍」。欲行是術。必先得一數。曰「元」。乃行是術曰。\n" +
      "\t乘「元」以二。名之曰「乙」。\n" +
      "\t乃得「乙」。\n" +
      "是謂「倍」之術也。";
    const cond =
      "若「甲」大於一者。\n\t夫「甲」。書之。\n若非。\n\t夫一。書之。\n云云。";
    expect(cells(`${loop}\n\n${fun}\n\n${cond}`)).toEqual([loop, fun, cond]);
  });

  it("closes a cell with a value nothing consumes at a blank line", () => {
    expect(cells("加一以二。\n\n吾有一數。曰三。名之曰「甲」。")).toEqual([
      "加一以二。",
      "吾有一數。曰三。名之曰「甲」。"
    ]);
    expect(cells("加一以二。\n吾有一數。曰三。名之曰「甲」。")).toEqual([
      "加一以二。\n吾有一數。曰三。名之曰「甲」。"
    ]);
  });

  it("ends a cell after 噫 discards pending values", () => {
    expect(cells("加一以二。噫。\n夫「甲」。書之。")).toEqual([
      "加一以二。噫。",
      "夫「甲」。書之。"
    ]);
  });

  it("makes comments their own cells", () => {
    expect(cells("批曰。「「註」」。\n夫「甲」。書之。")).toEqual([
      "批曰。「「註」」。",
      "夫「甲」。書之。"
    ]);
  });

  it("keeps comments and strings that span lines whole", () => {
    expect(
      cells(
        "注曰。「「多\n行」」。\n夫三。示之。\n\n吾有一言。曰「「上\n下」」。名之曰「甲」。"
      )
    ).toEqual([
      "注曰。「「多\n行」」。",
      "夫三。示之。",
      "吾有一言。曰「「上\n下」」。名之曰「甲」。"
    ]);
  });

  it("leaves blank lines between cells out of them", () => {
    expect(cells("夫三。示之。\n\n\n夫四。示之。\n\n")).toEqual([
      "夫三。示之。",
      "夫四。示之。"
    ]);
  });

  it("keeps declarations with bodies that start on a later line", () => {
    const fun =
      "吾有一術。名之曰「說」。\n是術曰。\n乃得一。\n是謂「說」之術也。";
    const withArgs =
      "吾有一術。名之曰「倍」。\n欲行是術。必先得一數。曰「元」。\n乃行是術曰。\n乃得「元」。\n是謂「倍」之術也。";
    const obj =
      "吾有一物。名之曰「甲」。\n其物如是。\n物之「「乙」」者。數曰三。\n是謂「甲」之物也。";
    expect(cells(`${fun}\n${withArgs}\n${obj}\n施「說」。書之。`)).toEqual([
      fun,
      withArgs,
      obj,
      "施「說」。書之。"
    ]);
    for (const cell of [fun, withArgs, obj]) {
      expect(() =>
        compile(cell, {
          logCallback: () => {},
          errorCallback: (e: any) => {
            throw new Error(String(e));
          }
        })
      ).not.toThrow();
    }
  });

  it("returns no cells for an empty program", () => {
    expect(splitCells("")).toEqual([]);
    expect(splitCells("\n\n")).toEqual([]);
  });

  it("produces cells that compile on their own", () => {
    const src =
      "吾有一數。曰零。名之曰「和」。\n\n" +
      "為是十遍。\n\t加「和」以一。昔之「和」者。今其是矣。\n云云。\n\n" +
      "夫「和」。\n書之。";
    for (const cell of cells(src)) {
      expect(() =>
        compile(cell, {
          logCallback: () => {},
          errorCallback: (e: any) => {
            throw new Error(String(e));
          }
        })
      ).not.toThrow();
    }
  });
});
