package de.fom.webApp.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;

import java.util.Set;

/**
 * The CardPair DB Entity for matching different Cards together
 */
@Entity
public class CardPair {
    /**
     * Long id @GeneratedValue
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Set<Card> items
     */
    @OneToMany(mappedBy = "cardPair")
    @JsonIgnore
    private Set<Card> items;

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
     * @return Set<Card>
     */
    public Set<Card> getItems() {
        return items;
    }

    /**
     *
     * @param items Set<Card>
     */
    public void setItems(Set<Card> items) {
        this.items = items;
    }
}
