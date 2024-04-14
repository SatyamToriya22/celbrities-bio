import { MouseEventHandler } from 'react';

export interface CelebrityAccordianProps {
  celebrityInfo: CelebrityMappedDataType;
  handleCancelBtn: (id: number) => MouseEventHandler<HTMLImageElement>;
  handleSubmitBtn: (
    data: CelebrityMappedDataType
  ) => MouseEventHandler<HTMLButtonElement>;
  handleDeleteBtn: (id: number) => void;
  handleEditBtn: (id: number) => MouseEventHandler<HTMLImageElement>;
  handleAccordianOpen: (id: number) => MouseEventHandler<HTMLDivElement>;
  isChanged: boolean;
  setIsChanged: (value: boolean) => void;
}

export interface CelebrityDataType {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
  isOpen?: boolean;
  isEdit?: boolean;
}
export interface CelebrityMappedDataType {
  id: number;
  isOpen: boolean;
  isEdit: boolean;
  fullName: string;
  age: string | number;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}
