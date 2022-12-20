DELETE FROM CARD_PAIR;
DELETE FROM CARD_SET_CARDS;
DELETE FROM CARD_SET;
DELETE FROM CARD;


INSERT INTO CARD (ID,MEDIA_PATH,MEDIA_TYPE,NAME) VALUES (1, 'test-url.de/harry-wand.png', 'image', 'harry-potter-magic-wand');
INSERT INTO CARD (ID,MEDIA_PATH,MEDIA_TYPE,NAME) VALUES (2, 'test-url.de/harry-profile.png', 'image', 'harry-potter-profile');

INSERT INTO CARD (ID,MEDIA_PATH,MEDIA_TYPE,NAME) VALUES (3, 'test-url.de/hagrid-dragon.png', 'image', 'hagrid-dragon');
INSERT INTO CARD (ID,MEDIA_PATH,MEDIA_TYPE,NAME) VALUES (4, 'test-url.de/hagrid-hut.png', 'image', 'hagrid-hut');


INSERT INTO CARD_PAIR(CARD_ID, PAIR_ID) VALUES (1, 1);
INSERT INTO CARD_PAIR(CARD_ID, PAIR_ID) VALUES (2, 1);

INSERT INTO CARD_PAIR(CARD_ID, PAIR_ID) VALUES (3, 2);
INSERT INTO CARD_PAIR(CARD_ID, PAIR_ID) VALUES (4, 2);

INSERT INTO CARD_SET(ID, NAME, TAGS) VALUES (1,'Harry Potter', 'Film;Zauberei;Magie;Fantasy');
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,1);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,2);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,3);
INSERT INTO CARD_SET_CARDS(CARD_SET_ID,CARDS_ID) VALUES(1,4);



