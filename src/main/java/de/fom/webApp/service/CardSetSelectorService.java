package de.fom.webApp.service;

import de.fom.webApp.db.entity.CardSet;
import de.fom.webApp.db.repository.CardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Service
public class CardSetSelectorService {
    /**
     * CardSetRepository cardSetRepository
     */
    private final CardSetRepository cardSetRepository;
    /**
     * PaginationService paginationService
     */
    private final PaginationService paginationService;
    /**
     *
     * @param cardSetRepository CardSetRepository
     * @param paginationService PaginationService
     */
    @Autowired
    public CardSetSelectorService(
            CardSetRepository cardSetRepository,
            PaginationService paginationService
    ) {
        this.cardSetRepository = cardSetRepository;
        this.paginationService = paginationService;
    }

    /**
     * @param cardSetId String
     * @param page String
     * @param pageSize String
     * @return Page<CardSet>
     */
    public Page<CardSet> selectCardSetById(
            String cardSetId,
            String page,
            String pageSize
    ) {
        PageRequest pageRequest = this.paginationService.createPageable(
                page,
                pageSize
        );
        long cardSetIdNumber = this.paginationService.numberParser(cardSetId);

        List<CardSet> cardSets = this.cardSetRepository.findAll();

        List<Long> ids = new LinkedList<Long>();

        for (int i = 0; i < cardSets.size(); i++) {
           ids.add(cardSets.get(i).getId());
        }

        ids.sort(Comparator.naturalOrder());

        if (!ids.contains(cardSetIdNumber) && cardSetIdNumber != 0) {
            cardSetIdNumber = ids.get(0);
        }

        cardSetId = Long.toString(cardSetIdNumber);

        return this.cardSetRepository.findById(
                cardSetId,
                pageRequest
        );
    }



}
