import { sanitize } from "@utils/functions";

export const writeWord = async (word, page) => {
  word = sanitize(word);

  await page.waitForSelector("body > wc-kbd");
  await page.type("body > wc-kbd", word);
};

export const typeEnter = async page => {
  const buttonHandle = await page.evaluateHandle(
    `document.querySelector("body > wc-kbd").shadowRoot.querySelector("#kbd_enter")`
  );
  await buttonHandle.click();
};

export const getBoards = ({ page }) => {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll("wc-board")).map(element =>
      element.getAttribute("id")
    )
  );
};

export const getRows = ({ page, board }) => {
  return page.evaluate(
    ({ board: boardInPage }) =>
      Array.from(
        document
          .querySelector(`#${boardInPage}`)
          .shadowRoot.querySelectorAll("#hold > wc-row")
      ).map(element => parseInt(element.getAttribute("termo-row"))),
    { board }
  );
};

export const getLetters = ({ page, board, className }) => {
  return page.evaluate(
    async ({ board: boardInPage, className: classNameInPage }) => {
      const letters = [];
      const rows = document
        .querySelector(`#${boardInPage}`)
        .shadowRoot.querySelectorAll("#hold > wc-row");

      for (const row of rows) {
        const elements = row.shadowRoot.querySelectorAll(`.${classNameInPage}`);

        for (const element of elements) {
          // @ts-ignore
          // eslint-disable-next-line
          const letter = await sanitizeScrapping(element.innerHTML.toUpperCase());
          const position = element.getAttribute("lid");

          const existsLetter = letters.find(
            el => el.letter === letter && el.position === position
          );
          if (!existsLetter) letters.push({ letter, position });
        }
      }

      return letters;
    },
    { board, className }
  );
};
