import normalized from "../data/normalize.js";

function getPreposition(id) {
    return normalized.prepositionsById?.[id] ?? null;
}

function getPrepositionsByCase(prepCase) {
    const ids = normalized.prepositionsByCase?.[prepCase];
    return ids ? [...ids] : null;
}

export { getPreposition, getPrepositionsByCase };