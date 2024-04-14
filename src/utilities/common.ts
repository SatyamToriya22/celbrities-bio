import { CelebrityDataType } from '../interfaces/celebrity';

export const getMappedData = (data: CelebrityDataType[]) => {
  const newMappedData = data?.map((item: CelebrityDataType) => {
    const currentDate: any = new Date();
    const age = Math.floor(
      (currentDate - new Date(item?.dob).getTime()) / 3.15576e10
    );
    const celebrityData = {
      id: item?.id,
      isOpen: item?.isOpen ?? false,
      isEdit: item?.isEdit ?? false,
      fullName: `${item?.first} ${item?.last}`,
      age,
      gender: item?.gender,
      email: item?.email,
      picture: item?.picture,
      country: item?.country,
      description: item?.description,
    };

    return celebrityData;
  });
  return newMappedData;
};
