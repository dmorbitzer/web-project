DELETE FROM CARD_SET_CARDS;
DELETE FROM CARD_SET;
DELETE FROM CARD;
DELETE FROM CARD_PAIR;

INSERT INTO CARD_PAIR (ID) VALUES (1);
INSERT INTO CARD_PAIR (ID) VALUES (2);

INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (1, 'test-url.de/harry-wand.png', 'image', 'harry-potter-magic-wand', 1);
INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (2, 'test-url.de/harry-profile.png', 'image', 'harry-potter-profile', 1);

INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (3, 'test-url.de/hagrid-dragon.png', 'image', 'hagrid-dragon', 2);
INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (4, 'test-url.de/hagrid-hut.png', 'image', 'hagrid-hut', 2);

INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (5, 'https://assets.reedpopcdn.com/in-lord-of-the-rings-gollum-seht-ihr-ringgeister-und-legolas-vater-1578404662017.jpg/BROK/thumbnail/1200x900/quality/100/in-lord-of-the-rings-gollum-seht-ihr-ringgeister-und-legolas-vater-1578404662017.jpg', 'image', 'gollum-image', 1);
INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (6, 'https://wegener-clan.de/media/sounds/gollum.mp3', 'sound', 'gollum-sound', 1);
INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
    VALUES (7, 'https://wegener-clan.de/media/videos/Frodo.mp4', 'video', 'bilbo-video', 2);
INSERT INTO CARD (ID, MEDIA_PATH, MEDIA_TYPE, NAME, CARD_PAIR_ID)
VALUES (8, 'https://img.welt.de/img/kultur/mobile111998501/1401355027-ci16x9-w1200/THE-HOBBIT-AN-UNEXPECTED-JOURNEY.jpg', 'image', 'bilbo-image', 2);

INSERT INTO CARD_SET(ID, NAME, TAGS, PREVIEW_IMAGE_URL) VALUES (1,'Harry Potter', 'Film;Zauberei;Magie;Fantasy', 'https://media.contentapi.ea.com/content/dam/gin/images/2017/01/harry-potter-goblet-of-fire-key-art.jpg.adapt.crop191x100.628p.jpg');
INSERT INTO CARD_SET(ID, NAME, TAGS, PREVIEW_IMAGE_URL) VALUES (2,'Herr der Ringe', 'Film;Tolkin;Fantasy', 'https://images.cgames.de/images/gamestar/290/ringe-der-macht-teaser-neu_6168385.jpg');

INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,1);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,2);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,3);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,4);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(2,5);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(2,6);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(2,7);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(2,8);



