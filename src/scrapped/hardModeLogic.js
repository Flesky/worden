// Hard mode
// CORRECT letters MUST be used where it is right
// PRESENT letters MUST go elsewhere, MUST be used
// ABSENT letters MUST not be used

if (this.settings.hardMode) {
  let error = null;
  errorChecking: for (let guess of guesses) {
    // const guessLetters = guess.map(letter => letter.letter).join("")
    let checkWord = `${currentGuessWord}`;
    console.log("===== ROW " + guess.map((letter) => letter.letter).join(""));
    for (let i = 0; i < 5; ++i) {
      const currentLetter = checkWord[i];
      const guessLetter = guess[i];
      const ordinal = toOrdinal[i + 1];
      switch (guessLetter.evaluation) {
        case "correct":
          // CORRECT letters MUST be used where it is right
          if (guessLetter.letter !== currentLetter) {
            console.log("CORRECT - must be used " + currentLetter);
            error = `${ordinal} must be ${guessLetter.letter}`;
          }
          // CORRECT letters MUST be used
          // else if (!currentGuessWord.includes(guessLetter.letter)) {
          //   error = `${ordinal} letter must be ${guessLetter.letter}`;
          // }
          else {
            console.log("CORRECT - letter removed " + currentLetter);
            checkWord = checkWord.replaceAt(
              " ",
              checkWord.indexOf(guessLetter.letter)
            );
          }
          break;
        case "present":
          // PRESENT letters MUST go elsewhere
          if (guessLetter.letter === currentLetter) {
            console.log("PRESENT - must go elsewhere " + currentLetter);
            error = `${ordinal} letter must not be ${currentLetter}`;
          }
          // PRESENT letters MUST be used
          else if (!checkWord.includes(guessLetter.letter)) {
            console.log("PRESENT - must be used " + currentLetter);
            error = `${guessLetter.letter} must be used`;
          }
          // PRESENT letter is used
          else {
            console.log("PRESENT - used " + guessLetter.letter);
            checkWord = checkWord.replaceAt(
              " ",
              checkWord.indexOf(guessLetter.letter)
            );
          }
          break;
        case "absent":
          // ABSENT letters MUST not be used
          if (
            checkWord.includes(guessLetter.letter) &&
            !guess
              .slice(i + 1, 5)
              .map((letter) => letter.letter)
              .includes(guessLetter.letter)
          ) {
            console.log(
              "ABSENT - letter removed for checking " + currentLetter
            );
            checkWord = checkWord.replaceAt(
              " ",
              checkWord.indexOf(guessLetter.letter)
            );
            if (!checkWord.includes(guessLetter.letter)) {
              error = `${guessLetter.letter} must not be used`;
            } else {
            }
            // console.log(currentLetter)
          }
          break;

        // SPREE
        // COVER
        // > RUDER

        // TREES
        // FORCE
        // MERGE
        // > LARGE

        // FORTE
        // MILLS
        // CUPID
        // CYNIC
        // > CHAIN

        // PARTY
        // TOPES
        // STEEP
        // > UPSET

        // FLEET
        // LACER
        // MOLED
      }
      console.log("INDEX " + i + ": " + checkWord);
      if (error) break errorChecking;
    }
  }
  if (error) {
    this.view.pushToast(error);
    this.shake();
    return;
  }
}
