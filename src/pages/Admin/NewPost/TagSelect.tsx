import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ITag } from "./../../../types/tag";

interface IDropdown {
  label: string;
  value: string;
}
interface Props {
  options: ITag[];
  selectedTags: IDropdown[];
  setSelectedTags: (tags: IDropdown[]) => void;
}
export default function TagSelect({
  options,
  selectedTags,
  setSelectedTags,
}: Props) {
  const convertedOptions = options.map((opt: ITag) => {
    console.log(opt);
    return {
      label: opt.value,
      value: opt.value,
    };
  });
  return (
    <CreatableSelect
      isClearable
      isMulti
      options={convertedOptions}
      value={selectedTags}
      onChange={(e: IDropdown[]) => setSelectedTags(e)}
    />
  );
}

// const options: IDropdown[] = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
