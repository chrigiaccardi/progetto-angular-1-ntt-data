import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'

export const ProgettoStore = signalStore(
    {providedIn: 'root'},

    withState({}),

    withComputed((store) => ({

    }),
    withMethods(() => ({
        
    })
)