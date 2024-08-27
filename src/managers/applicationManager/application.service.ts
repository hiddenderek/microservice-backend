import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApplicationPost, ApplicationResult } from './application.dto';
import { concatSql, joinSql, rawText, sql } from '../../lib/sqlTag';
import { DatabaseHelper } from '../../lib/databaseHelper';
import { hasDefinedProperties } from '../../lib/hasDefinedProperties';
import { ApiService } from '../apiManager/api.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApplicationService extends DatabaseHelper<ApplicationPost> {
    readonly tableName = 'application';

    constructor(private readonly ApiService: ApiService) {
        super();
    }

    // async recordExternalData(id: string) {
    //     try {
    //         const serviceToken = '<YOUR TOKEN>';
    //         if (id && serviceToken) {
    //             const apiResult = await this.ApiService.getExternalData(id, serviceToken);
    //             if (apiResult?.testValue) {
    //                 const data = {
    //                     testId: id,
    //                     testValue: apiResult?.testValue,
    //                 };
    //                 const result = this.upsertTestData(data);
    //                 return result;
    //             }
    //         }
    //         return null;
    //     } catch (error) {
    //         throw new InternalServerErrorException('Error recording external data', {
    //             cause: error,
    //             description: error?.code,
    //         });
    //     }
    // }

    async postApplicationData(application: ApplicationPost): Promise<ApplicationResult | null> {
        try {
            const numCreditLine = await this.ApiService.getExternalData()
            if (numCreditLine) {

                const applicationPost: ApplicationPost = {
                    ...application,
                    applicationId: uuidv4(),
                    numCreditLine
                }
                const response = {
                    status: 'approved',
                    monthTerm: 0,
                    interest: 0,
                    loanAmount: application.totalLoanAmount,
                    monthlyPayment: 0
                }
                if (application.totalLoanAmount <= 10000 || application.totalLoanAmount > 50000 || numCreditLine > 50) {
                    response.status = 'denied'
                }

                if (numCreditLine < 10 ) {
                    response.monthTerm = 36
                    response.interest = .10
                } else if (numCreditLine <= 50 && numCreditLine >= 10) {
                    response.monthTerm = 24
                    response.interest = .20
                }
// principal = initial loan amount
                const years = Math.floor(response.monthTerm / 12)
                const total = application.totalLoanAmount * (Math.pow((1 + response.interest), years))
                const monthly = total / response.monthTerm
                response.monthlyPayment = monthly;
                await this.insert({ postObject: applicationPost });
                
                if (response) {
                    return response;
                }
            }
            return null;
        } catch (error) {
            throw new InternalServerErrorException('Error posting application data', {
                cause: error,
                description: error?.code,
            });
        }
    }
}
