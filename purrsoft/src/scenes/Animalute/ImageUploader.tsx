import { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { Controller, useFieldArray, Control } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

type ImageUploaderProps = {
  name: string;
  control: Control<any>;
  errors?: any;
};

const ImageUploader = ({ name, control, errors }: ImageUploaderProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const theme = useTheme();

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [urlInput, setUrlInput] = useState("");

  const textFieldStyles = {
    '& .MuiInputBase-root': {
      backgroundColor: '#cec5b4',
      color: theme.palette.accent?.mutedGreen,
    },
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        append({ fileName: file.name, base64 });
      };
      reader.readAsDataURL(file);
    }
    setFileInputKey(Date.now());
  };

  const handleAddUrl = (url: string) => {
    if (url) {
      append({ fileName: url, base64: url }); 
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{color: theme.palette.accent?.green}}>Adăugați imagini</Typography>
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ backgroundColor: theme.palette.accent?.mutedGreen }}
          >
            Adaugă fotografii
            <input
              type="file"
              accept="image/*"
              hidden
              key={fileInputKey}
              onChange={handleFileUpload}
            />
          </Button>
          <Typography variant="body2" sx={{ color: theme.palette.accent?.green }}>
            sau
          </Typography>
          <TextField
            label="Adaugă URL imagine"
            variant="outlined"
            size="small"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                const url = (event.target as HTMLInputElement).value;
                handleAddUrl(url);
                (event.target as HTMLInputElement).value = "";
              }
            }}
            onChange={(event) => {
              const url = (event.target as HTMLInputElement).value;
              setUrlInput(url);
            }}
            sx={{
              ...textFieldStyles,
              width: "50%" 
            }}
          />
          {urlInput && (
            <Button
              variant="contained"
              onClick={() => {
                const url = document.getElementById("image-url") as HTMLInputElement;
                handleAddUrl(url.value);
                url.value = "";
              }}
              sx={{ backgroundColor: theme.palette.accent?.mutedGreen }}
            >
              Salvează
            </Button>
          )}
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        {fields.map((field, index) => (
          <Box key={field.id} display="flex" alignItems="center" gap={2} mb={2}>
            <Controller
              name={`${name}[${index}].fileName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  disabled 
                  error={!!errors.imageUrls?.[index]?.fileName}
                  helperText={errors.imageUrls?.[index]?.fileName?.message}
                  sx={textFieldStyles}
                />
              )}
            />
            <Button
              variant="contained"
              onClick={() => remove(index)}
              sx={{ backgroundColor: theme.palette.error?.main }}
            >
              Șterge
            </Button>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ImageUploader;
