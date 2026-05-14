import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { Post } from "../models/post"
import { HttpHeaders, httpResource } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "../services/auth-service/auth-service"

export type PostState = {
    postSelezionato: Post | null
}

export const PostsStore = signalStore(
    { providedIn: 'root' },

    withState({
        postSelezionato: null,
    } as PostState),
    
    withMethods((store, authService = inject(AuthService)) => {

        const headersAutenticazione = new HttpHeaders({
            'Authorization': `Bearer ${authService.tokenLocalStorage()}`
        })

        const rispostaPost = httpResource<Post[]>(() => ({
            url: authService.urlPost,
            method: 'GET',
            headers: headersAutenticazione,
        }));

        return {
            posts: rispostaPost.value,
            caricamento: rispostaPost.isLoading,
            errore: rispostaPost.error,

            caricarePost: () => {
                rispostaPost.reload();
            }
        }
            
    })

    // withComputed((store) => {
        
    // })
)