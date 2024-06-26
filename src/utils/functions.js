import fs from "fs";

import alphabetWeight from "@assets/alphabetWeight.json";
import alphabet from "@assets/alphabet.json";

export const sanitize = text => {
  text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "A");
  text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "E");
  text = text.replace(new RegExp("[ÍÌÎÏ]", "gi"), "I");
  text = text.replace(new RegExp("[ÓÒÔÕÖ]", "gi"), "O");
  text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "U");
  text = text.replace(new RegExp("[Ç]", "gi"), "C");
  text = text.replace(new RegExp("[.ºª,-]", "gi"), "C");
  text = text.replace("'", "");

  return text;
};

const calculateWordWeight = word => {
  let wordWeight = 0;

  for (const letter of alphabet) {
    const weightToSum = word.includes(letter) ? alphabetWeight[letter] : 0;
    wordWeight += weightToSum;
  }

  return wordWeight;
};

const order = words => {
  const sortable = [];

  for (const word in words) {
    if (Object.prototype.hasOwnProperty.call(words, word)) {
      sortable.push([words[word].word, words[word].weight]);
    }
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });

  return sortable;
};

export const getHeavyWord = words => {
  const weighedWords = words.map(word => {
    return {
      word,
      weight: calculateWordWeight(word),
    };
  });

  const [heavyWord] = order(weighedWords);

  return heavyWord[0];
};

export const checkBrowse = path => {
  return new Promise(resolve => {
    fs.access(path, fs.constants.F_OK, err => {
      if (err) resolve(false);

      resolve(true);
    });
  });
};
