import data from '../data/canonical.json' with { type: 'json'}; 

/* Normalization */

const eintraege = data.cards.verben.eintraege
const prep_eintrage = data.cards.praepositionen.eintraege
const verbsById = { }
const prepositionsById = { }

const  verbsByCase = {
     dativ : new Set(),
     akkusativ : new Set(),
     genitiv: new Set()
};

const prepositionsByCase = {
    dativ: new Set(),
    akkusativ : new Set(),
    genitiv: new Set()
}

for (const element of eintraege) {
    for (const argument of element.arguments) {
        if (argument.case == 'dativ') {
            verbsByCase.dativ.add(element.id)
        }
        else if (argument.case == 'akkusativ') {
             verbsByCase.akkusativ.add(element.id)
        }
        else if (argument.case == 'genitiv') {
             verbsByCase.genitiv.add(element.id)
        }
    }
}

for (const element of prep_eintrage) {
    for (const c of element.allowedCases) {
        if (c == 'dativ') prepositionsByCase.dativ.add(element.id);
        else if (c == 'akkusativ') prepositionsByCase.akkusativ.add(element.id);
        else if (c == 'genitiv') prepositionsByCase.genitiv.add(element.id);
    }
}

for (const element of eintraege) {
    verbsById[element.id] = element;
}

for (const element of prep_eintrage) {
    prepositionsById[element.id] = element;
}

const normalized = {
  verbsById,
  verbsByCase,
  prepositionsById,
  prepositionsByCase
}

export default normalized;