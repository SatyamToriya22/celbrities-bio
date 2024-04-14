import React, { useEffect, useState } from 'react';
import './celebritiesBios.css';
import CelebrityAccordianTemplate from '../celebrityAccordian/celebrityAccordian';
import { getMappedData } from '../../utilities/common';
import { TEXT_CONSTANTS } from './constants';
import { CelebrityMappedDataType } from '../../interfaces/celebrity';

const CelebritiesBiosTemplate = () => {
  const celebrities = require('../../celebrities.json');
  const [celebritiesList, setCelebritiesList] = useState<
    CelebrityMappedDataType[]
  >(getMappedData(celebrities));
  const [isChanged, setIsChanged] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target?.value;
    setSearchedValue(searchValue);
  };

  const handleCancelBtn = (id: number) => () => {
    const celebritiesData = celebritiesList?.map(
      (celebrity: CelebrityMappedDataType) => {
        if (celebrity?.id === id) {
          return {
            ...celebrity,
            isEdit: false,
          };
        }
        return celebrity;
      }
    );
    setCelebritiesList(celebritiesData);
  };
  const handleSubmitBtn = (updatedDetails: CelebrityMappedDataType) => () => {
    const celebritiesData = celebritiesList?.map(
      (celebrity: CelebrityMappedDataType) => {
        if (celebrity?.id === updatedDetails?.id) {
          return {
            ...updatedDetails,
            isEdit: false,
          };
        }
        return celebrity;
      }
    );
    setCelebritiesList(celebritiesData);
  };
  const handleDeleteBtn = (id: number) => {
    const celebritiesData = celebritiesList?.filter(
      (celebrity: CelebrityMappedDataType) => celebrity?.id !== id
    );
    setCelebritiesList(celebritiesData);
  };
  const handleEditBtn = (id: number) => () => {
    const celebritiesData = celebritiesList?.map(
      (celebrity: CelebrityMappedDataType) => {
        if (celebrity?.id === id) {
          return {
            ...celebrity,
            isEdit: true,
          };
        }
        return celebrity;
      }
    );
    setCelebritiesList(celebritiesData);
  };

  const handleAccordianOpen = (id: number) => () => {
    const isEditActive = celebritiesList?.find(
      (celebrity: CelebrityMappedDataType) => celebrity?.isEdit
    );
    if (!isEditActive) {
      const celebritiesData = celebritiesList?.map(
        (celebrity: CelebrityMappedDataType) => {
          if (celebrity?.id === id) {
            return {
              ...celebrity,
              isOpen: celebrity?.isEdit ? true : !celebrity?.isOpen,
            };
          }
          return {
            ...celebrity,
            isOpen: false,
          };
        }
      );
      setCelebritiesList(celebritiesData);
    }
  };

  useEffect(() => {
    if (searchedValue) {
      const filteredList = getMappedData(celebrities)?.filter(
        (celebrity: CelebrityMappedDataType) => {
          const fullName = celebrity?.fullName?.toLowerCase();
          return (
            fullName?.includes(searchedValue?.toLowerCase()) ||
            fullName?.split(' ')?.includes(searchedValue?.toLowerCase())
          );
        }
      );
      const sortedListByName = filteredList.sort(
        (
          nameFirst: CelebrityMappedDataType,
          nameSecond: CelebrityMappedDataType
        ) => {
          if (nameFirst?.fullName < nameSecond?.fullName) return -1;
          if (nameFirst?.fullName > nameSecond?.fullName) return 1;
          return 0;
        }
      );
      setCelebritiesList(sortedListByName);
    } else {
      setCelebritiesList(getMappedData(celebrities));
    }
  }, [searchedValue]);

  const showCelebritiesList = () => {
    return celebritiesList?.map?.((celebrity: CelebrityMappedDataType) => {
      return (
        <div key={`${celebrity?.id}`}>
          <CelebrityAccordianTemplate
            celebrityInfo={celebrity}
            handleAccordianOpen={handleAccordianOpen}
            handleCancelBtn={handleCancelBtn}
            handleSubmitBtn={handleSubmitBtn}
            handleDeleteBtn={handleDeleteBtn}
            handleEditBtn={handleEditBtn}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
          />
        </div>
      );
    });
  };

  return (
    <div className='celebrities-bios'>
      <h2>{TEXT_CONSTANTS?.CELEBRITIES_LIST}</h2>
      <div className='search-bar'>
        <img
          src='/images/search-icon.png'
          alt='search-icon'
          className='search-icon'
        />
        <input
          type='text'
          placeholder='Search User'
          name='search'
          className='search-bar-field'
          onChange={handleSearchBar}
        />
      </div>
      {showCelebritiesList()?.length ? (
        showCelebritiesList()
      ) : (
        <div className='no-record'>
          <h6>{TEXT_CONSTANTS.NO_RECORD}</h6>
        </div>
      )}
    </div>
  );
};

export default CelebritiesBiosTemplate;
