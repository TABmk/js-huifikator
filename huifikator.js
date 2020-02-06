/**
 * conver string
 * @param  {String} text
 * @param  {String} [prefix='ху']
 * @return {String}
 */
const huifikacia = (text, prefix = 'ху') => {
  /**
  * Check letter case
  * @param  {String}  letter
  * @return {Boolean}
  */
  const checkCase = (letter) => !!(letter === letter.toUpperCase());
  /**
   * convert single word
   * @param  {String} singleWord
   * @return {String}
   */
  const doHui = (singleWord) => {
    /** @type {String} word to convert **/
    let word = singleWord;
    /** @type {String} word prefix **/
    let pref = prefix;
    /** @type {String} vowel table with replacers **/
    const vowelList = {
      а: 'я',
      о: 'ё',
      э: 'е',
      ы: 'и',
      у: 'ю',
      я: 'а',
      ё: 'о',
      е: 'е',
      и: 'ы',
      ю: 'у',
    };

    /** @type {?Array} find vowels **/
    const vowels = word.match(/([аоэыуяёеию])/gi);

    if (vowels && vowels.length) {
      // first two vowels can't be same. Deleting first.
      if (vowels.length >= 3 && vowels[0].toLowerCase() === vowels[1].toLowerCase()) {
        word = word.replace(vowels[0], '');
      }
      /**
       * check if word have >= 3 syllables and conver Boolean to Number
       * @type {Number}
       */
      const syllable = Number(!!(vowels.length >= 3));
      /** @type {String} replaced vowel **/
      const diphthong = vowelList[vowels[syllable]];
      // make first char of converted work same case with origin
      if (checkCase(word.charAt(0))) {
        pref = pref.charAt(0).toUpperCase() + pref.slice(1);
      }
      return `${pref}${diphthong}${word.slice(word.indexOf(vowels[syllable]) + 1)}`;
    }
    // if no vowel detectet -- return same word
    return text;
  };

  // split string to words, convert each and make single string back
  return text.split(' ').map(doHui).join(' ');
};

// bind function to String
String.prototype.huifikacia = function(prefix) {
  return huifikacia(this, prefix)
};
