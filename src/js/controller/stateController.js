import initState from '../init/initState.js';
import watchState from '../view/view.js';

const watchedState = watchState(initState);

export default watchedState;
