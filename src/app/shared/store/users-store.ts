import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'

export interface User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;      
}


