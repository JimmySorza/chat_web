import Chance from 'chance';

const nameGetter = new Chance();

export const getName = () => nameGetter.first();