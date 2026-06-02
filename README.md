# CityShare Hub

## 🗂️ Indice

- [Descrizione](#-descrizione)
- [Funzionalità dell'Applicazione](#-funzionalità-dellapplicazione)
- [Tecnologie e Librerie Utilizzate](#-tecnologie-e-librerie-utilizzate)
- [Prerequisiti](#-prerequisiti)
- [Installazione e Configurazione](#-installazione-e-configurazione)
- [Struttura Del Progetto](#-struttura-del-progetto)
- [Autenticazione e API](#-autenticazione-e-api)
- [Build e Deployment](#-build-e-deployment)
- [Contatti](#-contatti)

---

## 🏢 Descrizione

**CityShare Hub** è una dashboard creata per i cittadini, dove possono dare consigli sul miglioramento della propria città ed interagire con i propri compaesani.
La dashboard è stata sviluppata con Angular in modalità SPA (Single Page Application).

l'applicazione permette agli utenti di:
- Visualizzare e gestire profili utente;
- Creare e visualizzare post;
- Aggiungere propri commenti ai post
- Cercare utenti e post
- Visualizzare nel dettaglio le informazioni degli utenti

---

## 🛠️ Funzionalità dell'Applicazione

### 1. Sistema di Autenticazione

**Percorso**: `/login`

- **Login con Bearer Token**: L'applicazione utilizza l'autenticazione basata sul token di GoRest;
- **Protezione delle Route**: Tette le Route principali sono protette da `AuthGuard`;
- **Storage Token**: Il token viene salvato in `localStorage` per mantenere la sessione aperta;
- **Logout**: Funzionalità di `logout` che rimuove il token dal `localStorage` e reindirizza al `login`.

