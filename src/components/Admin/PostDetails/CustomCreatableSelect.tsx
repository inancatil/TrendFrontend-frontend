/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { ITag } from "../../../types";

const filter = createFilterOptions<TagType>();

interface Props {
  allTags: ITag[];
  selectedTags: any[];
  setSelectedTags: (tags: any[]) => void;
}

export default function CustomCreatableSelect({
  allTags,
  selectedTags,
  setSelectedTags,
}: Props) {
  const convertTags = allTags.map((tag: any) => {
    return {
      id: tag.id,
      value: tag.name,
      isNew: false,
    };
  });

  return (
    <Autocomplete
      multiple
      onChange={(event, newValue) => {
        setSelectedTags(newValue);
      }}
      value={selectedTags}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        //To filter selected tags
        const x = filtered.filter(
          (f) => !selectedTags.some((t) => t.id === f.id)
        );
        // Suggest the creation of a new value
        if (
          params.inputValue !== "" &&
          !x.some((f: TagType) => f.value === params.inputValue)
        ) {
          x.push({
            inputValue: params.inputValue,
            isNew: true,
            value: `Add "${params.inputValue}"`,
          });
        }
        return x;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      filterSelectedOptions
      id="tag-creatable-select"
      options={convertTags}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.value;
      }}
      renderOption={(option) => option.value}
      style={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Tags"
        />
      )}
    />
  );
}

interface TagType {
  inputValue?: string;
  id?: string;
  value: string;
  isNew: boolean;
}
