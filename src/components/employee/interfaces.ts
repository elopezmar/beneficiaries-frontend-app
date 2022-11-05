import { Employee } from "../../api/interfaces";

export interface EmployeeProps {
    mode: 'create' | 'edit';
    employee?: Employee;
    onSuccess: (employee: Employee) => void;
    onError: (err: any) => void;
    onCancel: () => void;
}