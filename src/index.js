import puppeteer from "puppeteer";

import { getHeavyWord, sanitize } from "@/utils/functions";
import {
  writeWord,
  typeEnter,
  getLetters,
  getBoards,
  getRows,
} from "@utils/scrapping";
import {
  filterRandomLetters,
  filterNotRandomLetters,
  filterPositionedLetters,
  filterNotPositionedLetters,
  filterNotTermoWords,
  filterWrongLetters,
} from "@utils/filter";
import screens from "@assets/screens.json";
import termoWordsList from "@assets/termoWords.json";

const games = [
  { name: "TERMO", path: "/" },
  { name: "DUETO", path: "/2" },
  { name: "QUARTETO", path: "/4" },
];

console.log(screens["INITIAL"]);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: undefined,
  });

  const termoWords = filterNotTermoWords(termoWordsList);
  const initialWord = getHeavyWord(termoWords);

  for (const game of games) {
    try {
      console.info(
        `-------------------------------------------------------------------------------`
      );
      console.clear();
      console.info(screens[game.name]);

      const page = await browser.newPage();
      await page.setViewport({
        width: 950,
        height: 600,
      });
      await page.goto(`https://term.ooo${game.path}`);

      await page.exposeFunction("sanitizeScrapping", sanitize);

      await page.waitForSelector("#help");
      await page.click("#help");

      let selectedWord;
      let boardNotFinalized = true;

      const boards = await getBoards({ page });
      const rows = await getRows({ page, board: boards[0] });
      let round = 1;

      for (const board of boards) {
        boardNotFinalized = true;
        let isInitial = round == 1 && board === "board0";
        console.warn(`==== Quadro ${parseInt(board[5]) + 1} ====`);

        while (boardNotFinalized) {
          try {
            if (round > rows.length) {
              break;
            }

            console.log(`==== Round ${round}/${rows.length} ===`);

            if (isInitial) {
              console.log("Digitando: " + initialWord);
              console.log("------------------");

              await writeWord(initialWord, page);
              await typeEnter(page);
              await page.waitForTimeout(3000);

              isInitial = false;
              round++;
              continue;
            }

            const wrongLetters = await getLetters({
              page,
              board,
              className: "wrong",
            });
            const notPositionedLetters = await getLetters({
              page,
              board,
              className: "place",
            });
            const positionedLetters = await getLetters({
              page,
              board,
              className: "right",
            });

            const positionedParsed = positionedLetters.map(el => el.letter);
            const notPositionedParsed = notPositionedLetters.map(
              el => el.letter
            );
            const lettersInTheWord =
              notPositionedParsed.concat(positionedParsed);
            const lettersNotInTheWord = filterWrongLetters(
              wrongLetters,
              lettersInTheWord
            );

            let filteredWords = filterNotRandomLetters(
              termoWords,
              lettersNotInTheWord
            );
            filteredWords = filterRandomLetters(
              filteredWords,
              lettersInTheWord
            );
            filteredWords = filterPositionedLetters(
              filteredWords,
              positionedLetters
            );
            filteredWords = filterNotPositionedLetters(
              filteredWords,
              notPositionedLetters
            );

            if (filteredWords.length <= 20) {
              console.log("Escolhendo entre: ", filteredWords);
            }

            selectedWord = getHeavyWord(filteredWords);
            console.log("Digitando: " + selectedWord);

            await writeWord(selectedWord, page);
            await typeEnter(page);
            await page.waitForTimeout(3000);

            const validatePositionedLetters = await getLetters({
              page,
              board,
              className: "right",
            });

            if (validatePositionedLetters.length === 5) {
              boardNotFinalized = false;
              round++;
              break;
            }

            round++;
            console.log("------------------");
          } catch (error) {
            console.log(error);
            await page.evaluate(`alert('Você Perdeu! D=');`);
            await browser.close();
            break;
          }
        }
      }
    } catch (error) {
      console.clear();
      console.log(screens["ERROR"]);
      console.log(
        `===============================================================================`
      );
      console.log(
        `========================== Tente novemente mais tarde =========================`
      );
      console.log(
        `===============================================================================`
      );
    }

    console.clear();
    console.log(screens["INITIAL"]);
    console.log(
      `=================================================================================`
    );
    console.log(
      `=================================== Concluido ===================================`
    );
    console.log(
      `=================================================================================`
    );
  }
})();
