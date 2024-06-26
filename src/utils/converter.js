import { writeFileSync, readFileSync } from "fs";

import { sanitize } from "@/utils/functions";
import alphabetWeight from "@assets/alphabetWeightBase.json";

const WORD_LENGTH = 5;
const FILE = "./assets/words";

const words = readFileSync(FILE).toString().replace(/\r\n/g, "\n").split("\n");

const termoWords = words
  .filter(word => sanitize(word).length === WORD_LENGTH)
  .map(word => {
    const wordSanitized = sanitize(word).toUpperCase();

    for (const letter of wordSanitized) {
      alphabetWeight[letter] += 1;
    }

    return wordSanitized;
  });

writeFileSync("./assets/termoWords.json", JSON.stringify(termoWords));
writeFileSync("./assets/alphabetWeight.json", JSON.stringify(alphabetWeight));

console.log(
  `Total de Palavras: ${words.length} | Palavras Filtradas: ${termoWords.length}`
);
