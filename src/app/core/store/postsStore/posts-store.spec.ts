import { TestBed } from "@angular/core/testing";
import { PostsStore } from "./posts-store";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "../../services/auth-service/auth-service";
import { provideHttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

describe('PostsStore', () => {
    let store: InstanceType<typeof PostsStore>;
    let httpTesting: HttpTestingController;
    let authService: AuthService

    let idUtente: string = '123'

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

    it('Dovrebbe dare il nome dell\'utente', () => {
    
    })
})