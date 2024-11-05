import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { IconButton, FormHelperText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CheckBoxInputProps {
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  chips: string[];
  setChips: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
  label = "Add a tag",
  placeholder = "Type and press Enter",
  inputValue,
  type,
  setInputValue,
  required = false,
  chips,
  setChips,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   React.useEffect(() => {
  //     if (type === "email" && !emailRegex.test(inputValue.trim())) {
  //       setError("Invalid email address");
  //       return;
  //     } else {
  //       setError(null);
  //     }
  //   }, [inputValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newChip = inputValue.trim();
      if (type === "email" && !emailRegex.test(newChip)) {
        setError("Invalid email address");
        return;
      }

      if (type === "number" && isNaN(Number(newChip))) {
        setError("Invalid number");
        return;
      }

      setError(null);

      setChips((prevChips) => {
        if (!prevChips.includes(newChip)) {
          return [...prevChips, newChip];
        }
        return prevChips;
      });
      setInputValue("");
      event.preventDefault();
    }
  };

  const handleDelete = (chipToDelete: string) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    // <div className="emialSent">
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <label htmlFor="subject" className="form-label">
        {label}
      </label>
      <TextField
        type={type}
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        required={required}
        error={!!error}
        // className="chipInputFields"
      />
      {error && <p className="error">{error}</p>}
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          onDelete={() => handleDelete(chip)}
          style={{ margin: 2 }}
          deleteIcon={
            <IconButton size="small" onClick={() => handleDelete(chip)}>
              <CloseIcon />
            </IconButton>
          }
        />
      ))}
    </div>
    // </div>
  );
};

export default CheckBoxInput;
