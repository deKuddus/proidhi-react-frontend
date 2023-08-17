import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ErrorObject {
  title: null | string;
  description: null | string;
}
interface Post {
  id: number | null;
  title: string | null;
  description: string | null;
}

type typeTitle = string | null;
type typeDescription = string | null;

interface ModalProps {
  post: Post;
  handleModalhide: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, handleModalhide }) => {
  const [formError, setFormError] = useState<ErrorObject>({
    title: null,
    description: null,
  });
  const [title, setTitle] = useState<typeTitle>(post.title);
  const [description, setDescription] = useState<typeDescription>(
    post.description,
  );

  const handleFormPostSubmit = async (): Promise<void> => {
    if (title && description) {
      // send post request to api to save post, if post is successful then redirect to / route
      try {
        // Example API call
        const response = await fetch(
          `http://104.196.68.149/api/post/${post.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
          },
        );

        if (response.ok) {
          toast.success('Post updated successfully.');
          return handleModalhide();
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
    <div className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block">
      <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 dark:bg-boxdark md:py-15 md:px-17.5">
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Update Post
        </h3>
        <div>
          <label className="mb-3 block text-black dark:text-white">Title</label>
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
            <p className="text-danger mt-3 text-md">{formError.description}</p>
          )}
        </div>

        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
              onClick={handleModalhide}
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
              onClick={handleFormPostSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
