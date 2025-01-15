import initState from '../init/initState.js';
import watchState from './watchState.js';

const watchedState = watchState(initState);

export default watchedState;
