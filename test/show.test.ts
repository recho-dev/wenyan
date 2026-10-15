import { compile, splitCells } from "../src/parser";

const js = (src: string, lang: "js" | "py" | "rb" = "js") =>
  compile(src, {
    lang,
    logCallback: () => {},
    errorCallback: (e: any) => {
      throw new Error(String(e));
    }
  }).trim();

describe("示之", () => {
  it("hands its values to echo()", () => {
    expect(js("夫「甲」。夫「乙」。示之。")).toBe(
      "const _ans1=甲;const _ans2=乙;echo(_ans1,_ans2);"
    );
  });

  it("leaves 書之 printing to the console", () => {
    expect(js("夫「甲」。書之。")).toBe("const _ans1=甲;console.log(_ans1);");
  });

  it("works inside functions", () => {
    expect(
      js(
        "吾有一術。名之曰「說」。是術曰。吾有一言。曰「「善」」。示之。是謂「說」之術也。"
      )
    ).toContain("echo(_ans1);");
  });

  it("consumes pending values like 書之 when splitting cells", () => {
    const src = "夫「甲」。\n示之。\n夫「乙」。示之。";
    expect(splitCells(src).map(({ from, to }) => src.slice(from, to))).toEqual([
      "夫「甲」。\n示之。",
      "夫「乙」。示之。"
    ]);
  });

  it("prints in the other target languages", () => {
    expect(js("夫三。示之。", "py")).toContain("print(");
    expect(js("夫三。示之。", "rb")).toContain("p([");
  });
});
