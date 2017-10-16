var syllable = require('syllable');



function search(text, songTitle) {
    //Takes the raw lyrics and puts them into a line-by-line array.
    var arr = text.split('\n');

    //Loops through the lyrics array and removes MOST of the non-lyric text.
    for (i=0; i<arr.length; i++) {
        if (arr[i].startsWith("[")) {
            arr.splice(i, 1);
        };
    };
    
    //Find lines with 5 syllables
    
    for (i=0; i<arr.length; i++) {
        
        // Is it a haiku?
        if ((syllable(arr[i]) === 5) && (syllable(arr[i+1])=== 7) && (syllable(arr[i+2]) === 5)) {
            var haikuPresent = true;
            var haikuString = "HAIKU: " + arr[i] + " / " + arr[i+1] + " / "+ arr[i+2] +"\n" + "("+songTitle+")" + "\n";
            console.log(haikuString);
        };
    };
    
    if (haikuPresent) {
        // add to counter
    }
    
};

module.exports.search = search;