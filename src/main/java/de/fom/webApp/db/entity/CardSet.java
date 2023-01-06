package de.fom.webApp.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
public class CardSet {
    /**
     * Long id @GeneratedValue
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * String name
     */
    private String name;

    /**
     * String tags
     */
    private String tags;

    /**
     * Set<Card> cards
     */
    @ManyToMany
    private Set<Card> cards = new HashSet<>();

    /**
     *
     * @return Long
     */
    public Long getId() {
        return id;
    }

    /**
     *
     * @param id Long
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     *
     * @return String
     */
    public String getName() {
        return name;
    }

    /**
     *
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     *
     * @return String
     */
    public String getTags() {
        return tags;
    }

    /**
     *
     * @param tags String
     */
    public void setTags(String tags) {
        this.tags = tags;
    }

    /**
     *
     * @return Set<Card>
     */
    public Set<Card> getCards() {
        return cards;
    }

    /**
     *
     * @param cards Set<Card>
     */
    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }
}
