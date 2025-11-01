import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ value, onDecrease, onIncrease }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100px",
        mt: { xs: 2, sm: 3 },
      }}
    >
      <IconButton color="primary" onClick={onDecrease}>
        <RemoveCircle sx={{ fontSize: "30px" }} />
      </IconButton>
      <Typography variant="h5">{value}</Typography>
      <IconButton color="primary" onClick={onIncrease} sx={{ ml: 0.3 }}>
        <AddCircleIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
