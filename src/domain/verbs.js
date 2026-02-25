/* 
what should minimal API look like?
getExercises(criteria)
evaluateAnswer(exercises, userInput)
*/

/* Domain does not reach outward
   Everything comes in as arguments 
   (dependency inversion )
*/


// it has to be framework-agnostic 

// translation layer if case === "dative" internally map to "dativ"

// function getExercises({type, case})

/* inside getExercises:
    translate case
    fetch verbs from normalized
    build exercise objects
    return array
*/


/* 
    Should getExercises() ever depend on router directly?
    Should randomness happen inside template rendering?
    Should useTrainer know how verbs are conjugated?
    Is your exercise object immutable after creation?
*/

/* an hypotetical return 

{
  type: "verb-case",
  verbId: "verb-schreiben",
  infinitive: "schreiben",
  subject: "ich",
  conjugatedVerb: "schreibe",
  object: {
    role: "experiencer",
    case: "dativ",
    value: "dir"
  },
  solution: {
    fullSentence: "Ich schreibe dir",
    expectedToken: "dir"
  }
}
*/

/* what is verb-dative exercise?

exerciseId

verbId

infinitive

subject

conjugatedVerb

objectCase

expectedAnswer

fullCorrectSentence
*/

// what would be the object structure? 

// If this is domain in DDD what would be the entities?, value objects? key rules? 

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

