import * as evaluatorTests from './evaluator.test.js'
import * as factoryTests from './factory.test.js'

const GREEN = '\x1b[32m';
const RED   = '\x1b[31m';
const RESET = '\x1b[0m';

let failures =0;
const suites = [evaluatorTests, factoryTests];
for (const suite of suites) {
    for (const [name, fn] of Object.entries(suite)){
        try { fn(); console.log(`${GREEN}✓ ${name}${RESET}`);}
        catch (e) {failures ++;  console.error(`✗ ${RED} ${name}: ${e.message}`);}
    }  
}
process.exit(failures ? 1: 0);