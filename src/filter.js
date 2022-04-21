const notTermoWords = require('../assets/notTermoWords.json')

const filterRandomLetters = (filteredWords, letters) => {
    letters.forEach(letter => {
        filteredWords = filteredWords.filter(word => word.includes(letter));
    })
    
    return filteredWords;
}

const filterNotRandomLetters = (filteredWords, letters) => {
    letters.forEach(el => {
        filteredWords = filteredWords.filter(word => !word.includes(el.letter));
    })
    
    return filteredWords;
}

const filterPositionedLetters = (filteredWords, letters) => {
    letters.forEach(el => {
        filteredWords = filteredWords.filter(word => word[el.position] === el.letter);    
    });

    return filteredWords;
}

const filterNotPositionedLetters = (filteredWords, letters) => {
    letters.forEach(el => {
        filteredWords = filteredWords.filter(word => word[el.position] !== el.letter);
    });
    
    return filteredWords;
}

const filterNotTermoWords = (filteredWords) => {
    return filteredWords.filter(word => !notTermoWords.includes(word))
}

const filterWrongLetters = (wrongLetters, lettersInTheWord) => {
    return wrongLetters.filter(({letter}) => !lettersInTheWord.includes(letter))
}

module.exports = {
    filterRandomLetters,
    filterNotRandomLetters,
    filterPositionedLetters,
    filterNotPositionedLetters,
    filterNotTermoWords,
    filterWrongLetters
}