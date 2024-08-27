import { IsString, IsInt, MinLength, IsOptional, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class ApplicationPost {
    @ApiProperty()
    @IsEmpty()
    applicationId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: number;
    @ApiProperty()
    email: number;
    @ApiProperty()
    phone: number;
    @ApiProperty()
    ssn: string;
    @ApiProperty()
    totalLoanAmount: number;
    @ApiProperty()
    numCreditLine: number;

    constructor(data: ApplicationPost) {
        this.applicationId = data?.applicationId ?? uuidv4();
        this.name = data?.name;
        this.address = data?.address;
        this.email = data?.email;
        this.phone = data?.phone;
        this.ssn = data?.ssn;
        this.totalLoanAmount = data?.totalLoanAmount;
        this.numCreditLine = data?.numCreditLine;
    }
}


export interface ApplicationResult {
    status: string,
    loanAmount: number, 
    interest: number, 
    monthTerm: number, 
    monthlyPayment
}