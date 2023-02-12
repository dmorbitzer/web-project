package de.fom.webapp.db.repository;

import de.fom.webapp.db.entity.CardSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for the CardSet Entity
 */
public interface CardSetRepository extends JpaRepository<CardSet, Long> {

    /**
     *
     * @param searchParam String
     * @param pageable PageRequest
     * @return Page<CardSet>
     */
    Page<CardSet> findByNameContainingIgnoreCase(
            String searchParam,
            PageRequest pageable
    );

    /**
     *
     * @param tags String
     * @param pageable PageRequest
     * @return Page<CardSet>
     */
    Page<CardSet> findByTagsContainingIgnoreCase(
            String tags,
            PageRequest pageable
    );

    /**
     *
     * @param searchParam String
     * @param tags String
     * @param pageable PageRequest
     * @return Page<CardSet>
     */
    Page<CardSet> findByNameContainingIgnoreCaseAndTagsContainingIgnoreCase(
            String searchParam,
            String tags,
            PageRequest pageable
    );

    /**
     *
     * @param cardSetId
     * @return CardSet
     */
    CardSet findById(
           String cardSetId
    );

    /**
     *
     * @return List<CardSet>
     */

    List<CardSet> findAll();

}

