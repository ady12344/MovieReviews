Pentru pornirea aplicatiei trebuie:
      - Instalat PostgreSQL
      - Setarea numelui bazei de date cu user_db
      - Configurarea fisierului application.properties pentru a se realiza conexiunea cu baza de date

Pentru setarea automata a tabelelor din baza de date trebuie rulat fisierul MovieReviewsApplication

![image](https://github.com/user-attachments/assets/345f2a94-2e46-456a-8253-bb2ec38900b9)

Dupa care se ruleaza fisierul aflat in directorul test numit MovieReviewsApplicationTests pentru popularea bazei de date

![image](https://github.com/user-attachments/assets/68788af1-2225-42e7-bdf5-d992eee2ba9d)

Dupa care se poate porni aplicatia normal.

Pentru folosirea aplicatiei trebuie sa accesati url-ul urmator http://localhost:8080/login.html in care va aparea o pagina de login.

Daca nu aveti cont trebuie sa apasati pe butonul ![image](https://github.com/user-attachments/assets/ae012176-5c4a-4752-adbd-9e9db821d49c)

Dupa ce ati apasat pe butonul acesta va aparea o pagina de Sign Up in care va puteti crea un cont.

![image](https://github.com/user-attachments/assets/bf651cca-31ff-4a2c-ad3f-699783a609ff)

Dupa ce v-ati creat contul veti fi redirectionat la pagina de Login unde va puteti conecta pentru a explora site-ul.

Caracteristici site:
- Prezentarea filmelor cu numele Directorului , Rating-ul IMDb, si numele filmului.
- Fiecare card al unui film este clickable si acolo se pot adauga comentariile si se poate vedea un scurt overview al filmului.
- Bara de cautare pentu filme.
- Filtrare filme dupa gen.
- Pagina de profil in care se poate schimba parola si deloga utilizatorul
- Sectiune de My Reviews unde utilizatorul poate vedea filmele la care a lasat recenzii.


Pentru testarea API-urilor prezente in aplicatie se poate accesa SWAGGER numai daca utilizatorul este logat. (Dupa ce va logati se poate accesa url-ul urmator http://localhost:8080/swagger-ui/index.html)













