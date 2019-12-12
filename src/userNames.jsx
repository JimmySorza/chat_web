import Change from 'change';

const nameGetter = new Change();

export const getName = () => nameGetter.first();