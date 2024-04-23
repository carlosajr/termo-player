import notTermoWords from "@assets/notTermoWords.json";

export const filterRandomLetters = (filteredWords, letters) => {
  letters.forEach(letter => {
    filteredWords = filteredWords.filter(word => word.includes(letter));
  });

  return filteredWords;
};

export const filterNotRandomLetters = (filteredWords, letters) => {
  letters.forEach(el => {
    filteredWords = filteredWords.filter(word => !word.includes(el.letter));
  });

  return filteredWords;
};

export const filterPositionedLetters = (filteredWords, letters) => {
  letters.forEach(el => {
    filteredWords = filteredWords.filter(
      word => word[el.position] === el.letter
    );
  });

  return filteredWords;
};

export const filterNotPositionedLetters = (filteredWords, letters) => {
  letters.forEach(el => {
    filteredWords = filteredWords.filter(
      word => word[el.position] !== el.letter
    );
  });

  return filteredWords;
};

export const filterNotTermoWords = filteredWords => {
  return filteredWords.filter(word => !notTermoWords.includes(word));
};

export const filterWrongLetters = (wrongLetters, lettersInTheWord) => {
  return wrongLetters.filter(
    ({ letter }) => !lettersInTheWord.includes(letter)
  );
};
