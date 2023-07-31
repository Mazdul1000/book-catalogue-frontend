import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { insertSearchTerm, toggleGenre, togglePublicationYear } from '../../redux/features/filter/filterSlice';
import { api } from '../../redux/api/apiSlice';

const SearchBar = ({}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {searchTerm, genre, publicationDate} = useAppSelector( state => state.filter)

  const handleGenreChange = (selectedOption: { value: any; }| null) => {
     dispatch(toggleGenre(selectedOption?.value || null))
  };

  const handlePublicationYearChange = (selectedOption: any) => {
      dispatch(togglePublicationYear((selectedOption as any)?.value || null))
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
   const filter = {
    searchTerm,
    genre,
    publicationDate
   }
   console.log(filter);
  };

  const handleSearchTermChange = (event: { preventDefault: () => void; target: { value: string | undefined; }; })=> {
    dispatch(insertSearchTerm(event.target.value))
  }

  const handleClear = () => {
    dispatch(insertSearchTerm(""));
  };

  // Generate an array of years from 1800 to the present year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1799 }, (_, index) => currentYear - index);

  const yearOptions = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  const genreOptions = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    // Add more genre options as needed
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center pt-10">
      {/* <AddBookmark open={open} setOpen={setOpen}  /> */}
      <h2 className="text-4xl font-bold">Find a book</h2>
      <div className="w-full flex justify-center items-center mt-5">
        <form
          onSubmit={handleSearch}
          className="w-[60%] border-2 border-primary-main rounded-full px-8 flex justify-between items-center h-14 text-sm"
        >
          <input
            type="text"
            placeholder="Search by title or author..."
            className="outline-none w-full bg-transparent border-none"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button type="submit">
            <BiSearchAlt className="h-6 w-6 text-black" />
          </button>
          <button type="button" onClick={handleClear}>
            <RxCross2 className="h-6 w-6 text-black" />
          </button>
        </form>
        <button
          className="ml-3 p-2 bg-primary-main text-slate rounded-lg"
          onClick={() => setOpen(!open)}
        >
          Add
        </button>
      </div>
      <div className="flex items-center justify-start mt-4">
        <div>
            <p>Search Options:</p>
        </div>
          <Select
            options={genreOptions}
            isClearable
            value={genreOptions.find((option) => option.value === genre) || null}
            onChange={handleGenreChange}
            placeholder="Select Genre"
            className="rounded-lg px-4 py-2"
          />      
          <Select
            options={yearOptions}
            isClearable
            value={yearOptions.find((option) => option.value === publicationDate) || null}
            onChange={handlePublicationYearChange}
            placeholder="Select Publication Year"
            className="rounded-lg px-4 py-2 basic-single"
            styles={{
              control: (provided) => ({
                ...provided,
                borderWidth: '1px', // Fix double border issue
              }),
            }}
          />

      </div>
    </div>
  );
};

export default SearchBar;
