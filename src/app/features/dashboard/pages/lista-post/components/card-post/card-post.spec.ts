import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPost } from './card-post';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { PostsStore } from '../../../../../../core/store/postsStore/posts-store';

describe('CardPost', () => {
  let component: CardPost;
  let fixture: ComponentFixture<CardPost>;

  // Mockiamo il postStore per non fare la richiesta HTTP
  const postsStoreMock = {
    getNomeUtente: vi.fn().mockReturnValue('Mario Rossi'),
    caricamento: signal(false),
    errore: signal(undefined),
    posts: signal([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPost],
      providers: [
        { provide: PostsStore, useValue: postsStoreMock},
        provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CardPost);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('post', {
      id: '2',
      user_id: '1234',
      title: 'Test Post',
      body: 'Body Post'
    })
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
