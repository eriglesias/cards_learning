/* 
what should minimal API look like?
getExercises(criteria)
evaluateAnswer(exercises, userInput)
*/



function buildSentenceTemplate(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e [?]`
    }

    function giveAnswer(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e `
    }
    
   function returnCase() {
        let dativSubject = {
            "ich": "mir",
            "du": "dir",
            "er": "ihm",
            "sie": "ihr",
            "es": "ihm",
            "wir": "uns",
            "ihr": "euch",
            "sie": "ihnen",
            "Sie": "Ihnen"
        }
        const values = Object.values(dativSubject);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex]; 
    }