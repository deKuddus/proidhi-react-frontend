import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { toast } from 'react-hot-toast';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ErrorObject {
  title: null | string;
  description: null | string;
}

const Form: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [formError, setFormError] = useState<ErrorObject>({
    title: null,
    description: null,
  });
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFormPostSubmit = async (): Promise<void> => {
    if (title && description) {
      // send post request to api to save post, if post is successful then redirect to / route
      try {
        // Example API call
        const response = await fetch('http://poridhi-backend.test/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
          toast.success('Post created successfully.');
          return navigate('/');
        } else {
          toast.error('Failed to create');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError((prev: ErrorObject) => ({
        ...prev,
        title: title ? null : 'Post title is required',
        description: description ? null : 'Post description is required',
      }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTitle(e.target.value);
      setFormError((prev: ErrorObject) => ({ ...prev, title: null }));
    }
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value) {
      setDescription(e.target.value);
      setFormError((prev: ErrorObject) => ({ ...prev, description: null }));
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Post" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Post
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleTitleChange}
                />
                {formError && formError.title && (
                  <p className="text-danger mt-3 text-md">{formError.title}</p>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                  onChange={handleDescriptionChange}
                >
                  {description}
                </textarea>
                {formError && formError.description && (
                  <p className="text-danger mt-3 text-md">
                    {formError.description}
                  </p>
                )}
              </div>
              <div className="flex items-end justify-end">
                <button
                  className=" rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={handleFormPostSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
