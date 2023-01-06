package de.fom.webApp.unit.service;

import de.fom.webApp.service.PaginationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class PaginationServiceTest {

    private PaginationService paginationService;
    @Autowired
    public PaginationServiceTest(PaginationService paginationService) {
        this.paginationService = paginationService;
    }

    @Test
    void testNumberParserValidNumber() {
        int result = this.paginationService.numberParser("8");

        assertThat(result).isEqualTo(8);
    }

    @Test
    void testNumberParserInvalidNumber() {
        int result = this.paginationService.numberParser("-9");

        assertThat(result).isEqualTo(0);
    }

    @Test
    void testCreatePageableValidPageSize() {
        PageRequest result = this.paginationService.createPageable(null, "5");

        assertThat(result.getPageSize()).isEqualTo(5);
    }

    @Test
    void testCreatePageableInvalidPageSize() {
        PageRequest result = this.paginationService.createPageable(null, "Hugo");

        assertThat(result.getPageSize()).isEqualTo(10);
    }

    @Test
    void testCreatePageableNullPageSize() {
        PageRequest result = this.paginationService.createPageable(null, null);

        assertThat(result.getPageSize()).isEqualTo(10);
    }
}
