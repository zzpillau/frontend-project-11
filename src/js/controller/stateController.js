import initState from '../init/initState.js';
import watchState from '../view/view.js';

const state = watchState(initState);

export default state;
