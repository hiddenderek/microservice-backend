import { IsString, IsInt, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Test {
    @ApiProperty({ description: 'coolest prop ever' })
    @IsString()
    @MinLength(3)
    testId: string;

    @ApiProperty()
    @IsInt()
    testValue: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    wowFactor?: string;

    constructor(data: Test) {
        this.testId = data?.testId ?? uuidv4();
        this.testValue = data?.testValue;
        this.wowFactor = data?.wowFactor;
    }
}
