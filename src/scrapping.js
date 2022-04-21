const { sanitize } = require('./utils');

const writeWord = async (word, page) => {
    word = sanitize(word);

    await page.waitForSelector('body > wc-kbd');
    await page.type('body > wc-kbd', word);
}

const typeEnter = async (page) => {
    const buttonHandle = await page.evaluateHandle(`document.querySelector("body > wc-kbd").shadowRoot.querySelector("#kbd_enter")`);
    await buttonHandle.click();
}

const getBoards = async ({page}) => {
    return page.evaluate(() => Array.from(document.querySelectorAll("wc-board")).map(element => element.getAttribute('id')));
}

const getRows = async ({page, board}) => {
    return page.evaluate(({board}) => Array.from(
        document.querySelector(`#${board}`).shadowRoot.querySelectorAll("#hold > wc-row")
    ).map(element => parseInt(element.getAttribute('termo-row'))), {board});
}

const getLetters = async ({page, board, className}) => {
    return page.evaluate(
        async ({board, className}) => {
            const letters = [];
            const rows = document.querySelector(`#${board}`).shadowRoot.querySelectorAll("#hold > wc-row");

            for (const row of rows) {
                const elements = row.shadowRoot.querySelectorAll(`.${className}`);

                for (const element of elements) {
                    const letter = await sanitize(element.innerHTML.toUpperCase());
                    const position = element.getAttribute('lid');   

                    const existsLetter = letters.find(el => el.letter === letter && el.position === position)
                    if(!existsLetter) letters.push({letter, position});
                }
            }

            return letters;
        }, {board, className});
}

module.exports = {
    writeWord, 
    typeEnter,
    getLetters,
    getBoards,
    getRows
}   