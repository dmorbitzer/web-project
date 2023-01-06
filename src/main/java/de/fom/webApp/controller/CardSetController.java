package de.fom.webApp.controller;

import de.fom.webApp.service.CardSetLoaderService;
import de.fom.webApp.service.CardSetSelectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * A Controller for loading and searching/filtering CardSets.
 */
@RestController
public class CardSetController {
    /**
     * CardSetLoaderService Object.
     */
    private final CardSetLoaderService cardSetLoaderService;

    /**
     * CardSetSelectorService Object
     */
    private final CardSetSelectorService cardSetSelectorService;

    /**
     *
     * @param cardSetLoaderService CardSetLoader
     * @param cardSetSelectorService CardSetSelectorService
     */
    @Autowired
    public CardSetController(
            CardSetLoaderService cardSetLoaderService,
            CardSetSelectorService cardSetSelectorService
            ) {
        this.cardSetLoaderService = cardSetLoaderService;
        this.cardSetSelectorService = cardSetSelectorService;
    }

    /**
     *
     * @param page Page number to load
     * @param pageSize Number of Objects to load
     * @return ResponseEntity<Iterable>
     */
    @GetMapping("/api/cardSets")
    public ResponseEntity<Iterable> loadSets(
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String pageSize
    ) {

        return new ResponseEntity<>(
                this.cardSetLoaderService.loadAllCardSets(
                        page,
                        pageSize
                ),
                HttpStatus.OK
        );
    }

    /**
     *
     * @param searchParam Parameter for Search
     * @param page Page number to load
     * @param tags Tags for Search
     * @param pageSize Number of Objects to load
     * @return ResponseEntity<Iterable>
     */
    @GetMapping("/api/searchCardSets")
    public ResponseEntity<Iterable> searchSets(
            @RequestParam(required = false) String searchParam,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String pageSize
            ) {

        return new ResponseEntity<>(
                this.cardSetLoaderService.searchCardSets(
                        searchParam,
                        tags,
                        page,
                        pageSize
                ),
                HttpStatus.OK
        );
    }

    /**
     *
     * @param cardSetId Parameter for selection
     * @param page Page number to load
     * @param pageSize Number of Objects to load
     * @return ResponseEntity<Iterable>
     */
@GetMapping("/api/selectCardSet")
    public ResponseEntity<Iterable> selectSetById(
            @RequestParam(required = false) String cardSetId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String pageSize
    ) {
        return  new ResponseEntity<>(
                this.cardSetSelectorService.selectCardSetById(
                  cardSetId,
                  page,
                  pageSize
                ),
                HttpStatus.OK
        );
    }

}
