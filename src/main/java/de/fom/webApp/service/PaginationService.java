package de.fom.webApp.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

/**
 * A Service for creating PageRequest objects
 */
@Service
public class PaginationService {
    /**
     *
     * The default page size if no page size is given
     *
     * int DEFAULT_PAGE_SIZE
     */
    static final int DEFAULT_PAGE_SIZE = 10;

    /**
     *
     * @param page String
     * @param pageSize String
     * @return PageRequest
     */
    public PageRequest createPageable(String page, String pageSize) {
        int pageNumber = this.numberParser(page);
        int pageSizeNumber = this.numberParser(pageSize);

        if (pageSizeNumber == 0) {
            pageSizeNumber = DEFAULT_PAGE_SIZE;
        }

        return PageRequest.of(pageNumber, pageSizeNumber);
    }

    /**
     *
     * @param stringNumber String
     * @return int
     */
    public int numberParser(String stringNumber) {
        int number;

        try {
            number = Integer.parseInt(stringNumber);
        } catch (NumberFormatException e) {
            number = 0;
        }

        if (number < 0) {
            number = 0;
        }

        return number;
    }
}
