export interface Employee {
    id?: number;
    nationalityId?: number;
    nationality?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string | moment.Moment;
    employeeNumber?: number;
    curp?: string;
    ssn?: string;
    phone?: string;
    isActive?: boolean;
}

export interface Beneficiary {
    id?: number;
    nationalityId?: number;
    employeeId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string | moment.Moment;
    curp?: string;
    ssn?: string;
    phone?: string;
    participationPercent?: number;
    isActive?: boolean;
}

export interface Nationality {
    id: number;
    description: string;
}

export interface Admin {
    username: string;
    password: string;
}