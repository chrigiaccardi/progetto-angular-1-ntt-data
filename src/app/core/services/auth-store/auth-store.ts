import {signalStore, withComputed, withMethods, withState} from '@ngrx/signals'


export const AuthStore = signalStore(
    { providedIn: 'root' },
    
    withState({
        utenteLoggato: false,
        url: 'https://gorest.co.in/public/v2/users',
        codiceErrore: null;
        token: getToken()

    }),

    // withComputed((store) => {
        
    // }),

    withMethods((store) => {
        getToken: 
    })
    
)