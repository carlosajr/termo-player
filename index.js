const puppeteer = require('puppeteer');
const { getHeavyWord } = require('./src/utils');

const {
    writeWord, 
    typeEnter,
    getWrongLetters,
    getNotPositionedLetters,
    getPositionedLetters
} = require('./src/scrapping');

const {
    filterRandomLetters,
    filterNotRandomLetters,
    filterPositionedLetters,
    filterNotPositionedLetters,
    filterNotTermoWords
} = require('./src/filter')

let termoWords = require('./assets/termoWords.json');
termoWords = filterNotTermoWords(termoWords);

const initialWord = getHeavyWord(termoWords);
console.log(`selectedWord: ${initialWord}`);

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://term.ooo/');

    await page.waitForSelector('#help');
    await page.click('#help');
  
    let wrongLetters;
    let notPositionedLetters;
    let positionedLetters;
    let selectedWord;
    let filteredWords;

    for (let index = 1; index <= 6; index++) {
        const wordToType = index === 1 ? initialWord : selectedWord;

        await writeWord(wordToType, page);
        await typeEnter(page);

        await page.waitForTimeout(3000);

        wrongLetters = await getWrongLetters(page);
        notPositionedLetters = await getNotPositionedLetters(page, index);
        positionedLetters = await getPositionedLetters(page, index);

        if (positionedLetters.length === 5) {
            await page.evaluate(`alert('Você ganhooooou!');`);
            await browser.close();
        }

        let positionedParsed = positionedLetters.map(el => el.letter);
        lettersInTheWord = notPositionedLetters.concat(positionedParsed);

        filteredWords = filterNotRandomLetters(termoWords, wrongLetters);
        filteredWords = filterRandomLetters(filteredWords, lettersInTheWord);
        filteredWords = filterPositionedLetters(filteredWords, positionedLetters);
        filteredWords = filterNotPositionedLetters(filteredWords, notPositionedLetters);

        console.log(filteredWords);
        
        selectedWord = getHeavyWord(filteredWords);
        console.log(`selectedWord: ${selectedWord}`);
    }

    await page.evaluate(`alert('Você Perdeu! =(');`);
    await browser.close();
})();



