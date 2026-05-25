import { TestBed } from "@angular/core/testing";
import { PostsStore } from "./posts-store";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "../../services/auth-service/auth-service";
import { provideHttpClient } from "@angular/common/http";
import { Post } from "../../models/post";
import { ApplicationRef } from "@angular/core";

describe('PostsStore', () => {
    let store: InstanceType<typeof PostsStore>;
    let httpTesting: HttpTestingController;
    let authService: AuthService;
    let appRef: ApplicationRef

    const mockUtenti = [
        { id: '1', name: 'Stefano' },
        { id: '2', name: 'Eugenio' }
    ];

    const nuovoPost: Omit<Post, 'id'> = {
        user_id: '1',
        title: 'Titolo Post',
        body: 'Body Post'
    }
    const nuovoPostCreato: Post = {
        id: '12345',
        ...nuovoPost
    }
    const idPost: number = 12345

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PostsStore,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        store = TestBed.inject(PostsStore);
        httpTesting = TestBed.inject(HttpTestingController);
        authService = TestBed.inject(AuthService)
        appRef = TestBed.inject(ApplicationRef)
    });

    afterEach(() => {
        httpTesting.verify()
    })

    it('Dovrebbe essere creato', () => {
        expect(store).toBeTruthy();
    });

    it('Dovrebbe cambiare il filtroRicerca', () => {
        store.setFiltroRicerca('Tiramisù');

        store.setFiltroRicerca('Meringata');

        expect(store.filtroRicerca()).toBe('Meringata');
    });

    it('Dovrebbe Creare un nuovo Post', () => {
        // Facciamo Partire il metodo
        store.aggiungiPost(nuovoPost)
        
        // Intercettiamo la richiesta 'POST
        const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: `${authService.apiUrl}/users/${nuovoPost.user_id}/posts` })
        
        // Ci aspettiamo che l'oggetto della richiesta sia il nuovo post e che al ritorno sia nuovoPostCreato
        expect(richiestaPOST.request.body).toEqual(nuovoPost)
        richiestaPOST.flush(nuovoPostCreato)
    })

    it('Dovrebbe dare errore per aggiungere un nuovo post', () => {
        store.aggiungiPost(nuovoPost)
        const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: `${authService.apiUrl}/users/${nuovoPost.user_id}/posts` })
        // Qua inseriamo volutamente un errore di autenticazione
        richiestaPOST.flush('Errore Autorizzazione', {
            status: 401,
            statusText: 'Authorization header is missing or the token is invalid'
        })
        // Ci aspettiamo che l'errore faccia si che si aggiorni erroreAggiuntaUtente con il seguente messaggio
        expect(store.erroreAggiungiPost()).toContain(`Errore nell'aggiunta del nuovo Post`)
    })

    it('Dovrebbe cancellare il Post selezionato', () => {
        store.cancellaPost(idPost)
        const richiestaDELETE = httpTesting.expectOne({ method: 'DELETE', url: `${authService.urlPost}/${idPost}` })
        // La richiesta ritorna null vista la cancellazione dell'utente selezionato
        richiestaDELETE.flush(null)
    })
});