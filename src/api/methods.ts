import axios from "axios";
import { Admin, Beneficiary, Employee, Nationality } from "./interfaces";

const BASE_URL = process.env.REACT_APP_API_HOST;
const TOKEN_KEY = 'accessToken';

axios.interceptors.response.use(
  (response) => {
    return response;
  }, 
  (error) => {
    if (error.response.status === 401) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

function setAccessToken(accessToken: string) {
  localStorage.setItem(TOKEN_KEY, accessToken)
}

function getAuthHeader() {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  return { Authorization: `JWT ${accessToken}`};
}

export async function login(data: Admin) {
  const url = `${BASE_URL}/auth`;
  const response = await axios.post(url, data);
  setAccessToken(response.data.access_token);
}

export async function getNationalities(): Promise<Nationality[]> {
  const url = `${BASE_URL}/nationalities`;
  const response = await axios.get<Nationality[]>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function getEmployees(): Promise<Employee[]> {
  const url = `${BASE_URL}/employees`;
  const response = await axios.get<Employee[]>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function createEmployee(data: Employee): Promise<Employee> {
  const url = `${BASE_URL}/employee`;
  const response = await axios.post<Employee>(
    url, data, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function getEmployee(employeeId: number): Promise<Employee> {
  const url = `${BASE_URL}/employee/${employeeId}`;
  const response = await axios.get<Employee>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function updateEmployee(
  employeeId: number, data: Employee
): Promise<Employee> {
  const url = `${BASE_URL}/employee/${employeeId}`;
  const response = await axios.put<Employee>(
    url, data, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function deleteEmployee(employeeId: number): Promise<Employee> {
  const url = `${BASE_URL}/employee/${employeeId}`;
  const response = await axios.delete<Employee>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function getBeneficiaries(employeeId: number): Promise<Beneficiary[]> {
  const url = `${BASE_URL}/employee/${employeeId}/beneficiaries`;
  const response = await axios.get<Beneficiary[]>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function createBeneficiary(
  employeeId: number, data: Beneficiary
): Promise<Beneficiary> {
  const url = `${BASE_URL}/employee/${employeeId}/beneficiary`;
  const response = await axios.post<Beneficiary>(
    url, data, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function updateBeneficiary(
  employeeId: number, beneficiaryId: number, data: Beneficiary
): Promise<Beneficiary> {
  const url = `${BASE_URL}/employee/${employeeId}/beneficiary/${beneficiaryId}`;
  const response = await axios.put<Beneficiary>(
    url, data, { headers: getAuthHeader() }
  );
  return response.data;
}

export async function deleteBeneficiary(
  employeeId: number, beneficiaryId: number
): Promise<Beneficiary> {
  const url = `${BASE_URL}/employee/${employeeId}/beneficiary/${beneficiaryId}`;
  const response = await axios.delete<Beneficiary>(
    url, { headers: getAuthHeader() }
  );
  return response.data;
}