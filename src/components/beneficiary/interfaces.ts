import { Beneficiary } from "../../api/interfaces";


export interface BeneficiaryListProps {
    employeeId: number;
}

export interface BeneficiaryProps {
    mode: 'create' | 'edit';
    employeeId: number;
    beneficiary?: Beneficiary;
    onSuccess: (beneficiary: Beneficiary) => void;
    onError: (err: any) => void;
    onCancel: () => void;
}