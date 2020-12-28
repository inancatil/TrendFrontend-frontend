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
  const convertedOptions = options.map((opt: any) => {
    return {
      label: opt.name,
      value: opt.name,
      __isNew__: false,
    };
  });
  return (
    <CreatableSelect
      isClearable
      isMulti
      options={convertedOptions}
      value={selectedTags}
      onChange={(e: IDropdown[]) => setSelectedTags(e)}
      placeholder={"Select Tag(s)..."}
      styles={{
        valueContainer: (base) => ({
          ...base,
          width: "100%",
          height: 50,
          padding: "0px 12px",
        }),
        control: (base) => ({
          ...base,
          backgroundColor: "#fafafa",
        }),

        placeholder: (base) => ({
          ...base,
          fontSize: "16px",
        }),
      }}
    />
  );
}
