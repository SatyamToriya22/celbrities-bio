import React, { useEffect, useState } from 'react';
import './celebrityAccordian.css';
import { GENDER_LABEL_TYPE, LABEL_CONSTANTS, REGEX_NUMBER } from './constants';
import { CelebrityAccordianProps } from '../../interfaces/celebrity';

const CelebrityAccordianTemplate = ({
  celebrityInfo,
  handleCancelBtn,
  handleSubmitBtn,
  handleDeleteBtn,
  handleEditBtn,
  handleAccordianOpen,
  isChanged,
  setIsChanged,
}: CelebrityAccordianProps) => {
  const [celebrityDetails, setCelebrityDetails] = useState(celebrityInfo);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const ele = e?.target;
    if (ele?.name !== 'age' || ele?.value?.match(REGEX_NUMBER)) {
      setIsChanged(true);
      setCelebrityDetails({
        ...celebrityDetails,
        [e?.target?.name]: e?.target?.value,
      });
    }
  };

  const confirmDelete = (id: number) => () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('Are you sure want to delete');
    if (result) {
      handleDeleteBtn(id);
    }
  };

  const getGenderValue = (gender: string) => {
    const genderType = GENDER_LABEL_TYPE?.find(
      (type) => type?.value === gender
    );
    return genderType?.label;
  };

  const checkIsAdult = (age: number | string) => {
    return Number(age) > 18;
  };

  useEffect(() => {
    setCelebrityDetails(celebrityInfo);
  }, [celebrityInfo]);

  return (
    <div className='accordian'>
      <div
        className='accordian-header'
        onClick={handleAccordianOpen(celebrityDetails?.id)}
      >
        <div className='name-pic'>
          <img
            src={celebrityDetails?.picture}
            alt='profile-pic'
            className='celebrity-pic'
          />
          <h3 className='celebrity-name'>{`${celebrityDetails?.fullName}`}</h3>
        </div>
        <div className='open-close'>
          <img
            src={
              celebrityInfo?.isOpen
                ? '/images/arrow-up.png'
                : '/images/arrow-down.png'
            }
            alt=''
            className='arrow-down'
          />
        </div>
      </div>
      <>
        <div
          className={`celebrity-details ${
            celebrityInfo?.isOpen && 'celebrity-details-open'
          }`}
        >
          <div className='age-gender-country'>
            <div className='label-value'>
              <label htmlFor='age' className='label'>
                {LABEL_CONSTANTS.AGE}
              </label>
              {celebrityInfo?.isEdit ? (
                <input
                  type='text'
                  id='age'
                  name='age'
                  value={celebrityDetails?.age}
                  className='input-field'
                  onChange={handleChange}
                />
              ) : (
                <p className='text-value'>{celebrityDetails?.age}</p>
              )}
            </div>
            <div className='label-value'>
              <label htmlFor='gender' className='label'>
                {LABEL_CONSTANTS.GENDER}
              </label>
              {celebrityInfo?.isEdit ? (
                <select
                  name='gender'
                  id='gender'
                  onChange={handleChange}
                  value={celebrityDetails?.gender}
                >
                  {GENDER_LABEL_TYPE?.map(
                    (type: { label: string; value: string }, index) => {
                      return (
                        <option value={type?.value} key={`${index}`}>
                          {type?.label}
                        </option>
                      );
                    }
                  )}
                </select>
              ) : (
                <p className='text-value'>
                  {getGenderValue(celebrityDetails?.gender)}
                </p>
              )}
            </div>
            <div className='label-value'>
              <label htmlFor='age' className='label'>
                {LABEL_CONSTANTS.COUNTRY}
              </label>
              {celebrityInfo?.isEdit ? (
                <input
                  type='text'
                  id='css'
                  name='country'
                  value={celebrityDetails?.country}
                  className='input-field'
                  onChange={handleChange}
                />
              ) : (
                <p className='text-value'>{celebrityDetails?.country}</p>
              )}
            </div>
          </div>
          <div className='description'>
            <label htmlFor='description' className='label'>
              {LABEL_CONSTANTS.DESCRIPTION}
            </label>
            {celebrityInfo?.isEdit ? (
              <textarea
                id='description'
                name='description'
                rows={5}
                cols={50}
                maxLength={290}
                required
                className='description-textarea'
                onChange={handleChange}
              >
                {celebrityDetails?.description}
              </textarea>
            ) : (
              <p className='text-value'>{celebrityDetails?.description}</p>
            )}
          </div>
          <div className='buttons-group'>
            {celebrityInfo?.isEdit ? (
              <>
                <button className='button'>
                  <img
                    src='/images/cross-icon.png'
                    alt='cross-btn'
                    className='cross-btn'
                    onClick={handleCancelBtn(celebrityDetails?.id)}
                  />
                </button>
                <button
                  className='button'
                  disabled={!isChanged}
                  onClick={handleSubmitBtn(celebrityDetails)}
                >
                  <img
                    src='/images/right-icon.png'
                    alt='right-btn'
                    className='right-btn'
                  />
                </button>
              </>
            ) : (
              <>
                <button className='button'>
                  <img
                    src='/images/delete-icon.png'
                    alt='delete-btn'
                    className='edit-delete-btn'
                    onClick={confirmDelete(celebrityDetails?.id)}
                  />
                </button>
                {checkIsAdult(celebrityDetails?.age) && (
                  <button className='button'>
                    <img
                      src='/images/edit-icon.png'
                      alt='edit-btn'
                      className='edit-delete-btn'
                      onClick={handleEditBtn(celebrityDetails?.id)}
                    />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CelebrityAccordianTemplate;
