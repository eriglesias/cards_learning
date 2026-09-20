import { getPreposition, getPrepositionsByCase } from "../src/domain/prepositions-domain.js";
import { assertEqual, assertTrue } from "./assert.js";

export function prep_domain_get_preposition() {
    const prep = getPreposition('prep-mit');
    assertEqual(prep.preposition, 'mit');
}

export function prep_domain_get_preposition_null() {
    const prep = getPreposition('prep-does-not-exist');
    assertEqual(prep, null);
}

export function prep_domain_get_prepositions_by_case() {
    const dativPreps = getPrepositionsByCase('dativ');
    assertTrue(dativPreps.includes('prep-mit'));
    assertTrue(dativPreps.includes('prep-aus'));
}