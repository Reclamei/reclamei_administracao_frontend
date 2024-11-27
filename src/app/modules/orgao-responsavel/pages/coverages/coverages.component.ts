import {Component, OnInit} from '@angular/core';
import {CoverageModel} from '../../../../shared/models/aplicacao/coverage.model';
import {CachedService} from '../../../../shared/services/cached.service';

@Component({
    selector: 'app-coverages',
    templateUrl: './coverages.component.html',
    styleUrls: ['./coverages.component.scss']
})
export class CoveragesComponent implements OnInit {
    coverages: CoverageModel[] = [];

    constructor(
        private cachedService: CachedService,
    ) {
    }

    async ngOnInit() {
        await this.loadCoverages();
    }

    private async loadCoverages() {
        this.coverages = await this.cachedService.getCoverages();
    }

}
