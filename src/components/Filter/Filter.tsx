import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Filter = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <FormControl>
      <FormLabel id="row-radio-buttons-group-types">Types</FormLabel>
      <RadioGroup
        onChange={onChange}
        row
        aria-labelledby="row-radio-buttons-group-types"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="sativa" control={<Radio />} label="Sativa" />
        <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
        <FormControlLabel value="indica" control={<Radio />} label="Indica" />
      </RadioGroup>
    </FormControl>
  );
};

export default Filter;
