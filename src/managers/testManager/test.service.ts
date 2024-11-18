import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Test } from './test.dto';
import { concatSql, joinSql, rawText, sql } from '../../lib/sqlTag';
import { DatabaseHelper } from '../../lib/databaseHelper';
import { hasDefinedProperties } from '../../lib/hasDefinedProperties';
import { ApiService } from '../apiManager/api.service';
import { TestDataService } from './testData.service';
import { Logger } from "@nestjs/common"
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TestService extends DatabaseHelper<Test> {
    private readonly logger = new Logger(TestService.name);

    constructor(private readonly ApiService: ApiService, private readonly TestDataService: TestDataService) {
        super();
    }

    async recordExternalData(id: string) {
        try {
            // some sort of library to get external token goes here
            const serviceToken = '<YOUR TOKEN>';
            if (id && serviceToken) {
                const apiResult = await this.ApiService.getExternalData(id, serviceToken);
                this.logger.debug('api result', apiResult)
                if (apiResult) {
                    const data = {
                        testId: id,
                        testValue: apiResult,
                    };
                    const result = await this.TestDataService.upsertTestData(data);
                    Logger.log('result', result)
                    return result;
                }
            }
            return null;
        } catch (error) {
            const messsage = 'Error recording external data';
            this.logger.error(messsage, error);
            throw new InternalServerErrorException(messsage, {
                cause: error,
                description: error?.code,
            });
        }
    }

    async findTestData(test: Partial<Test>): Promise<Test[] | undefined> {
        try {
            return await this.TestDataService.findTestData(test);
        } catch (error) {
            throw new InternalServerErrorException('Error finding test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async postTestData(test: Test): Promise<Test | null> {
        try {
           return await this.TestDataService.postTestData(test);
        } catch (error) {
            throw new InternalServerErrorException('Error posting test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async upsertTestData(postData: Test): Promise<Test | null> {
        try {
            return await this.TestDataService.upsertTestData(postData);
        } catch (error) {
            throw new InternalServerErrorException('Error upserting test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async updateTestData(updateData: Test): Promise<Partial<Test> | null> {
        try {
            return await this.TestDataService.updateTestData(updateData);
        } catch (error) {
            throw new InternalServerErrorException('Error updating test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async deleteTestData(testId: string): Promise<Test | null> {
        try {
            return await this.TestDataService.deleteTestData(testId)
        } catch (error) {
        throw new InternalServerErrorException('Error finding test data', {
            cause: error,
            description: error?.code,
        });
    }
  }
}
