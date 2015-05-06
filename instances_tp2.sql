use music;

DELETE FROM artist_jonction_instrument ;
DELETE FROM music_genre_jonction_band;
DELETE FROM band_jonction_artist;
DELETE FROM artist;
DELETE FROM band;
DELETE FROM hometown;
DELETE FROM music_genre;
DELETE FROM instrument;


INSERT INTO music_genre VALUES(1,"Rock","Le Rock est un genre musical");
INSERT INTO music_genre VALUES(2,"Blues","Le Blues est un genre musical");
INSERT INTO music_genre VALUES(3, "Rap","Le Rap est un genre musical");
INSERT INTO music_genre VALUES(4,"Funk","La Funk est un genre musical");

INSERT INTO hometown VALUES(1,"Tarbes","Commune française du sud de la france");
INSERT INTO hometown VALUES(2,"Toulouse","Commune français du sut de la france");
INSERT INTO hometown VALUES(3,"Paris", "Capitale de la France");
INSERT INTO hometown VALUES(4,"Lyon", "Commune française");
INSERT INTO hometown VALUES(5,"Marseille","Comme française");

INSERT INTO instrument VALUES(1,"Guitare");
INSERT INTO instrument VALUES(2,"Piano");
INSERT INTO instrument VALUES(3,"Batterie");
INSERT INTO instrument VALUES(4,"Basse");

INSERT INTO artist VALUES (1, "Robert", 1972, 1);
INSERT INTO artist VALUES(2,"Lucie",1976,2);
INSERT INTO artist VALUES(3,"Fred",1965,4);
INSERT INTO artist VALUES(4,"Julie",1955,3);
INSERT INTO artist VALUES(5,"Maxime",1960,4);
INSERT INTO artist VALUES(6,"Julien",1963,5);

INSERT INTO artist_jonction_instrument VALUES(1,1,"modérément");
INSERT INTO artist_jonction_instrument VALUES(1,2,"excellent");
INSERT INTO artist_jonction_instrument VALUES(2,1,"excellent");
INSERT INTO artist_jonction_instrument VALUES(3,4,"modérément");
INSERT INTO artist_jonction_instrument VALUES(5,2,"excellent");
INSERT INTO artist_jonction_instrument VALUES(6,3,"modérément");

INSERT INTO band VALUES(1,"Scaladis", 2002,1);
INSERT INTO band VALUES(2,"Gend",2000,2);
INSERT INTO band VALUES(3,"HeyHey",2001,3);
INSERT INTO band VALUES(4,"Cover of Cover",2005,3);
INSERT INTO band VALUES(5,"Oracle",1999,5);
INSERT INTO band VALUES(6,"Oren",2006,4);
INSERT INTO band VALUES(7,"Artemis",2002,4);

INSERT INTO band_jonction_artist VALUES(1,1,'Leader');
INSERT INTO band_jonction_artist VALUES(1,2,'autre');



