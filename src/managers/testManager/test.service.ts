import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Test } from './test.dto';
import { concatSql, joinSql, rawText, sql } from '../../lib/sqlTag';
import { DatabaseHelper } from '../../lib/databaseHelper';
import { hasDefinedProperties } from '../../lib/hasDefinedProperties';
import { ApiService } from '../apiManager/api.service';

@Injectable()
export class TestService extends DatabaseHelper<Test> {
    readonly tableName = 'test_table';

    constructor(private readonly ApiService: ApiService) {
        super();
    }

    async recordExternalData(id: string) {
        try {
            const serviceToken = '<YOUR TOKEN>';
            if (id && serviceToken) {
                const apiResult = await this.ApiService.getExternalData(id, serviceToken);
                if (apiResult) {
                    const data = {
                        testId: id,
                        testValue: apiResult,
                    };
                    const result = this.upsertTestData(data);
                    return result;
                }
            }
            return null;
        } catch (error) {
            throw new InternalServerErrorException('Error recording external data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async findTestData(test: Partial<Test>): Promise<Test[] | undefined> {
        try {
            const query = hasDefinedProperties(test)
                ? concatSql(
                      rawText(`WHERE`),
                      joinSql(
                          [
                              test.testId ? sql`test_id = ${test.testId}` : undefined,
                              test.testValue ? sql`test_value = ${test.testValue}` : undefined,
                              test.wowFactor ? sql`wow_factor = ${test.wowFactor}` : undefined,
                          ],
                          ' AND ',
                      ),
                  )
                : undefined;
            const result = await this.select({ query });
            if (result) {
                return result;
            }
        } catch (error) {
            throw new InternalServerErrorException('Error finding test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async postTestData(test: Test): Promise<Test | null> {
        try {
            const result = await this.insert({ postObject: test });
            if (result) {
                return result;
            }
            return null;
        } catch (error) {
            throw new InternalServerErrorException('Error posting test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async upsertTestData(postData: Test): Promise<Test | null> {
        try {
          // will never update testId so it can be removed
            const { testId, ...updateData } = postData;
            const result = await this.upsert({
                postObject: postData,
                updateObject: updateData,
                conflictColumn: 'test_id',
            });
            if (result) {
                return result;
            }
            return null;
        } catch (error) {
            throw new InternalServerErrorException('Error upserting test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async updateTestData(updateData: Test): Promise<Partial<Test> | null> {
        try {
            const result = await this.update({
                updateObject: updateData,
                query: sql`WHERE test_id = ${updateData.testId}`,
            });
            if (result) {
                return result;
            }
            return null;
        } catch (error) {
            throw new InternalServerErrorException('Error updating test data', {
                cause: error,
                description: error?.code,
            });
        }
    }

    async deleteTestData(testId: string): Promise<Test | null> {
      try {
        const query = sql`WHERE test_id = ${testId}`;
        const result = await this.delete({ query });
        if (result && result.length === 1) {
            return result[0];
        }
        return null;
    } catch (error) {
        throw new InternalServerErrorException('Error finding test data', {
            cause: error,
            description: error?.code,
        });
    }
  }
}
