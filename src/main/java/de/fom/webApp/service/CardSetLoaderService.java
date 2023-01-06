package de.fom.webApp.service;

import de.fom.webApp.db.entity.CardSet;
import de.fom.webApp.db.repository.CardSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * A Service for Loading CardSets with pagination
 */
@Service
public class CardSetLoaderService {
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
    public CardSetLoaderService(
            CardSetRepository cardSetRepository,
            PaginationService paginationService
    ) {
        this.cardSetRepository = cardSetRepository;
        this.paginationService = paginationService;
    }

    /**
     *
     * @param page String
     * @param pageSize String
     * @return Page<CardSet>
     */
    public Page<CardSet> loadAllCardSets(String page, String pageSize) {

        PageRequest pageRequest = this.paginationService.createPageable(
                page,
                pageSize
        );

        return this.cardSetRepository.findAll(pageRequest);
    }

    /**
     *
     * @param searchParam String
     * @param tags String
     * @param page String
     * @param pageSize String
     * @return Page<CardSet>
     */
    public Page<CardSet> searchCardSets(
            String searchParam,
            String tags,
            String page,
            String pageSize
    ) {
        Page<CardSet> result = new PageImpl<CardSet>(new ArrayList<CardSet>());

        PageRequest pageRequest = this.paginationService.createPageable(
                page,
                pageSize
        );

        if (
                searchParam != null
                        && tags != null
                        && searchParam.length() > 0
                        && tags.length() > 0
        ) {
            result = this.cardSetRepository.
                    findByNameContainingIgnoreCaseAndTagsContainingIgnoreCase(
                    searchParam,
                    tags,
                    pageRequest
            );
        } else if (searchParam != null && searchParam.length() > 0) {
            result = this.cardSetRepository.findByNameContainingIgnoreCase(
                    searchParam,
                    pageRequest
            );
        } else if (tags != null && tags.length() > 0) {
            result = this.cardSetRepository.findByTagsContainingIgnoreCase(
                    tags,
                    pageRequest
            );
        }

        return result;
    }
}

