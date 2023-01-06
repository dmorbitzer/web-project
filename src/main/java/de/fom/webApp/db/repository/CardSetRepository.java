package de.fom.webApp.db.repository;

import de.fom.webApp.db.entity.CardSet;
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
     * @param cardSetId String
     * @param pageable PageRequest
     * @return Page<CardSet>
     */
    Page<CardSet> findById(
           String cardSetId,
           PageRequest pageable
    );

    /**
     *
     * @return List<CardSet>
     */

    List<CardSet> findAll();

}

