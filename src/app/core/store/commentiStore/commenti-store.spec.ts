import { TestBed } from "@angular/core/testing";
import { CommentiStore } from "./commenti-store";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "../../services/auth-service/auth-service";
import { provideHttpClient } from "@angular/common/http";
import { Commento } from "../../models/commento";

describe('CommentiStore', () => {
    let store: InstanceType<typeof CommentiStore>;
    let httpTesting: HttpTestingController;
    let authService: AuthService;

    const nuovoCommento: Omit<Commento, 'id'> = {
        post_id: '54321',
        name: 'Stefano',
        email: 'ste@ste.it',
        body: 'Vita sul treno'
    }
    const nuovoCommentoCreato: Commento = {
        id: '12453',
        post_id: '54321',
        name: 'Stefano',
        email: 'ste@ste.it',
        body: 'Vita sul treno'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CommentiStore,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        store = TestBed.inject(CommentiStore)
        httpTesting = TestBed.inject(HttpTestingController)
        authService = TestBed.inject(AuthService)
    })

    afterEach(() => {
        httpTesting.verify()
    })

    it('Dovrebbe essere creato', () => {
        expect(store).toBeTruthy()
    })

    it('Dovrebbe settare id', () => {
        store.setIdPost('12345')
        expect(store.postIdSelezionato()).toBe('12345')
    })

    it('Dovrebbe creare un nuovo commento', () => {
        store.aggiungiCommento(nuovoCommento)
        const richiestaPost = httpTesting.expectOne({ method: 'POST', url: `${authService.apiUrl}/posts/${nuovoCommento.post_id}/comments` })
        expect(richiestaPost.request.body).toEqual(nuovoCommento)
        richiestaPost.flush(nuovoCommentoCreato)
        expect(store.erroreAggiungiCommento()).toBe('')
    })

    it('Dovrebbe dare errore alla creazione del commento', () => {
        store.aggiungiCommento(nuovoCommento)
        const richiestaPost = httpTesting.expectOne({ method: 'POST', url: `${authService.apiUrl}/posts/${nuovoCommento.post_id}/comments` })
        richiestaPost.flush('Errore Autorizzazione', {
            status: 401,
            statusText: 'Authorization header is missing or the token is invalid'
        })
        expect(store.erroreAggiungiCommento()).toContain(`Errore nell'aggiunta del commento`)
        
    })
})