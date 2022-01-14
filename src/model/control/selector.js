import { CONTROL_KEY } from './constant';

export const controlState = (state) => state[CONTROL_KEY];
export const controlInProgress = (state) => !!state[CONTROL_KEY].inProgress;
