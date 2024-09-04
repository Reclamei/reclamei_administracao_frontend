import {Injectable} from '@angular/core';
import {CoverageService} from './coverage.service';
import {AuthService} from '../auth/auth.service';
import {CompanyService} from './company.service';
import {firstValueFrom} from 'rxjs';
import {CoverageModel} from '../models/aplicacao/coverage.model';
import {CompanyModel} from '../models/aplicacao/company.model';

@Injectable({
    providedIn: 'root'
})
export class CachedService {
    public coverages: CoverageModel[] = [];
    public company: CompanyModel;

    constructor(
        private coverageService: CoverageService,
        private authService: AuthService,
        private companyService: CompanyService
    ) { }

    private async loadCoverages() {
        if (!this.company) {
            await this.getCompanyByExternalId();
        }
        this.coverages = await firstValueFrom(this.coverageService.findByCompanyId(this.company.id));
    }

    private async getCompanyByExternalId() {
        const user = await this.authService.getCurrentUser();
        if (!user || !user.displayName) {
            throw new Error('Usuário não autenticado');
        }
        this.company = await firstValueFrom(this.companyService.getCompanyByHeadExternalId(user.displayName));
    }

    public async getCoverages() {
        if (this.coverages.length === 0) {
            await this.loadCoverages();
        }
        return this.coverages;
    }

    public async getCompany() {
        if (!this.company) {
            await this.getCompanyByExternalId();
        }
        return this.company;
    }

}
