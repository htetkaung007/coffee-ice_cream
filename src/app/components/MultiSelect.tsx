import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Menu, MenuCategory } from "@prisma/client";

interface Props {
  title: string;
  selected: number[];
  setSelected: (value: React.SetStateAction<number[]>) => void;
  items: MenuCategory[] | Menu[];
}
export default function MultiSelect({
  title,
  selected,
  setSelected,
  items,
}: Props) {
  return (
    <FormControl sx={{ m: 1, width: 100 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={(e) => {
          const selected = e.target.value as number[];
          setSelected(selected);
        }}
        input={<OutlinedInput label={title} />}
        renderValue={() => {
          return selected
            ?.map((itemId) => items.find((item) => item.id === itemId))
            .map((item: any) => item.name)
            .join(" ,");
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={selected.includes(item.id)} />
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
