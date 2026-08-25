

export function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
    }
}

export function assertTrue(condition){
    if (!condition){
        throw new Error(`Expected truthy, got ${condition}`);
    }
}

