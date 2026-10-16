import { compile, execute, splitCells } from "../src/parser";

const options = {
  logCallback: () => {},
  errorCallback: (e: any) => {
    throw new Error(String(e));
  }
};

const js = (src: string) => compile(src, options).trim();

function run(src: string) {
  const out: string[] = [];
  execute(src, {
    ...options,
    outputHanzi: false,
    scoped: true,
    output: (...args: any[]) => out.push(args.join(" "))
  });
  return out;
}

describe("獨行此", () => {
  it("runs its code in a function called right away", () => {
    expect(js("獨行此。夫三。書之。云云。")).toBe(
      "(()=>{const _ans1=3;console.log(_ans1);})();"
    );
  });

  it("keeps what it names inside", () => {
    expect(
      run("獨行此。吾有一數。曰三。名之曰「甲」。夫「甲」。書之。云云。")
    ).toEqual(["3"]);
    expect(() =>
      run("獨行此。吾有一數。曰三。名之曰「甲」。云云。夫「甲」。書之。")
    ).toThrow(/甲 is not defined/);
  });

  it("can change names from outside", () => {
    expect(
      run(
        "吾有一數。曰零。名之曰「和」。獨行此。加「和」以二。昔之「和」者。今其是矣。云云。夫「和」。書之。"
      )
    ).toEqual(["2"]);
  });

  it("hands a value out with 乃得", () => {
    expect(js("獨行此。乃得三。云云。名之曰「乙」。")).toBe(
      "const _ans1=(()=>{return 3;})();var 乙=_ans1;"
    );
    expect(
      run(
        "獨行此。乘三以四。名之曰「積」。乃得「積」。云云。名之曰「乙」。夫「乙」。書之。"
      )
    ).toEqual(["12"]);
  });

  it("returns from a function inside it, not from the block", () => {
    const src =
      "獨行此。吾有一術。名之曰「三之」。是術曰。乃得三。是謂「三之」之術也。施「三之」。書之。云云。";
    expect(js(src)).toMatch(/^\(\(\)=>\{.*\}\)\(\);$/);
    expect(run(src)).toEqual(["3"]);
  });

  it("nests inside other blocks", () => {
    expect(run("為是二遍。獨行此。夫一。書之。云云。云云。")).toEqual([
      "1",
      "1"
    ]);
  });

  it("stays in one cell, with the value it hands out", () => {
    const src =
      "獨行此。\n\t夫三。示之。\n云云。\n獨行此。\n\t乃得四。\n云云。\n名之曰「乙」。";
    expect(splitCells(src).map(({ from, to }) => src.slice(from, to))).toEqual([
      "獨行此。\n\t夫三。示之。\n云云。",
      "獨行此。\n\t乃得四。\n云云。\n名之曰「乙」。"
    ]);
  });

  it("compiles for the other target languages", () => {
    expect(
      compile("獨行此。夫三。書之。云云。", { ...options, lang: "py" })
    ).toContain("if True:");
    expect(
      compile("獨行此。夫三。書之。云云。", { ...options, lang: "rb" })
    ).toContain("begin");
  });
});
