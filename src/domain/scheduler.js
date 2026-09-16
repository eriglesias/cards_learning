import {FSRS, createEmptyCard, Rating} from 'ts-fsrs';

const f = new FSRS();

export function createInitialCard() {
    return createEmptyCard(new Date());
}

export function computeNextCard(card, rating, now) {
    const schedulingCards = f.repeat(card, now);
    return schedulingCards[rating].card;
}

export {Rating};