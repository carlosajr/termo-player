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

const getWrongLetters = async (page) => {
    return page.evaluate(
        () => Array.from(
            document.querySelector("body > wc-kbd").shadowRoot.querySelectorAll(".wrong")
        ).map(element => element.innerHTML.toUpperCase()
    ));
}

const getNotPositionedLetters = async (page, row) => {
    return page.evaluate(
        (row) => Array.from(
            document.querySelector("#board0").shadowRoot.querySelector(`#hold > wc-row:nth-child(${row})`).shadowRoot.querySelectorAll(".place")
        ).map(element => {
            return { 
                letter: element.innerHTML.toUpperCase(),
                position: element.getAttribute('lid')
            }
        })
    , row);
}

const getPositionedLetters = async (page, row) => {
    return page.evaluate(
        (row) => Array.from(
            document.querySelector("#board0").shadowRoot.querySelector(`#hold > wc-row:nth-child(${row})`).shadowRoot.querySelectorAll(".right")
        ).map(element => {
            return { 
                letter: element.innerHTML.toUpperCase(),
                position: element.getAttribute('lid')
            }
        }
    ), row);
}

module.exports = {
    writeWord, 
    typeEnter,
    getWrongLetters,
    getNotPositionedLetters,
    getPositionedLetters
}   