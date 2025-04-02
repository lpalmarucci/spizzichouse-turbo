# Spizzichouse - Documentazione

## Panoramica
Spizzichouse è un monorepo strutturato con **Turborepo**, contenente un'applicazione frontend sviluppata con **Next.js** e un'API backend sviluppata con **NestJS**.

Questo portale serve per **tracciare le partite** dei giochi di carte tra giocatori, con la possibilità di **visionare statistiche**, **schedulare partite** e **determinare chi è il giocatore più forte**.

Il progetto segue un'architettura modulare con pacchetti condivisi per garantire scalabilità e riutilizzabilità del codice.

## Struttura del Progetto

```
spizzichouse/
│── apps/
│   ├── web/        # Applicazione frontend Next.js
│   ├── api/        # Servizio backend NestJS
│
│── packages/
│   ├── database/   # Gestione database con Prisma e tipi condivisi
│   ├── eslint-config/ # Configurazione globale di ESLint
│   ├── typescript-config/ # Configurazione globale di TypeScript
│   ├── ui/         # Componenti e hook ShadCN
```

### apps/
- **web/**: Applicazione frontend basata su **Next.js**, responsabile della UI e della gestione lato client.
- **api/**: Servizio backend basato su **NestJS**, che espone API REST/GraphQL per la gestione dei dati.

### packages/
- **database/**: Contiene la configurazione di **Prisma** per la gestione del database e condivisione dei tipi tra le applicazioni.
- **eslint-config/**: Configurazione centralizzata di **ESLint** per garantire uniformità nel codice.
- **typescript-config/**: Configurazione globale di **TypeScript**, condivisa tra tutti i moduli.
- **ui/**: Libreria di componenti e hook basata su **ShadCN**, riutilizzabile nelle varie applicazioni.

## Tecnologie Utilizzate
- **Turborepo**: Per la gestione del monorepo
- **Next.js**: Framework per l'applicazione frontend
- **NestJS**: Framework per la gestione dell'API backend
- **Prisma**: ORM per la gestione del database
- **ESLint**: Linter per garantire standard di codice
- **TypeScript**: Linguaggio utilizzato per tutti i moduli
- **ShadCN**: Libreria per UI component
- **GitHub Actions**: Pipeline CI/CD per test, build e deploy automatici
- **Supabase Auth**: Gestione dell'autenticazione
- **PostgreSQL su Supabase**: Database relazionale utilizzato nel progetto

## Setup del Progetto
### Installazione delle dipendenze
```sh
pnpm install
```

### Avvio dell'applicazione
Per avviare il progetto in locale (le migration verranno eseguite automaticamente per allineare il database):
```sh
pnpm run dev
```

### Migrazioni del database
Per generare una nuova migrazione Prisma:
```sh
pnpm run prisma migrate dev
```

## Autenticazione e Database
L'autenticazione degli utenti è gestita tramite **Supabase Auth** e il database utilizzato è **PostgreSQL su Supabase**.

Per garantire la creazione automatica dei record nella tabella `players` al momento della registrazione di un nuovo utente, è stato creato un **trigger** nel **SQL Editor** di Supabase:

```sql
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

Questo trigger è collegato alla seguente funzione:

```sql
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  RAISE LOG 'logging message: %', NEW.raw_user_meta_data;
  INSERT INTO public.players(id, full_name, bio, level, status)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'full_name', 
    NEW.raw_user_meta_data ->> 'bio',
    (NEW.raw_user_meta_data ->> 'level')::public."PlayerLevel",
    (NEW.raw_user_meta_data ->> 'status')::public."PlayerStatus"
  );
  RETURN NEW;
END;
$$;
```
`NB! Come puoi vedere per le colonne LEVEL e STATUS viene fatto un casting con l'ENUM con cui è stata definita la corrispettiva colonna
`


Questa funzione permette di creare automaticamente un record nella tabella `players` con le informazioni di base del nuovo giocatore, estrapolate dai **metadati dell'utente autenticato**.

## CI/CD con GitHub Actions
Il progetto integra **GitHub Actions** per l'automazione della CI/CD:
- **ci.yaml**: Viene eseguita quando viene aperta una pull request verso `main`, eseguendo i test e la validazione del codice.
- **pr.yml**: Ogni volta che viene creata una nuova PR, installa le dipendenze e verifica che il titolo della PR rispetti la semantica.
- **release.yml**: Non è schedulata, ma deve essere lanciata manualmente per creare una nuova release con un tag, che verrà mostrata nella sezione delle release di GitHub.

## Contributi
Per contribuire al progetto, assicurati di seguire le linee guida di codifica e di eseguire tutti i test prima di effettuare una PR.

## Licenza
Questo progetto è rilasciato sotto la licenza **MIT**.

## Autore
**Luca Palmarucci**

---

Questa documentazione può essere espansa con ulteriori dettagli sui singoli moduli o con una sezione sulle best practice di sviluppo.

