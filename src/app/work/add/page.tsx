"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, FormHelperText } from "@mui/material";

const UploadIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 15V3H13V15H11ZM4 13L12 5L20 13L18.6 14.4L13 8.8V21H11V8.8L5.4 14.4L4 13Z"
      fill="currentColor"
    />
  </svg>
);


const VisuallyHiddenInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <Box
      component="input"
      sx={{
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      }}
      ref={ref}
      {...props}
    />
  );
});

VisuallyHiddenInput.displayName = 'VisuallyHiddenInput';


interface FormData {
  title: string;
  description: string;
  mainImage: File | null;
  images: File[];
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AddWorkPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>();
  const router = useRouter();
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.clear();
    console.log(data);
    // Implementation remains the same
  };

  const renderFileInput = (
    name: "mainImage" | "images",
    label: string,
    multiple: boolean = false
  ) => (
    <Controller
      name={name}
      control={control}
      rules={{ required: name === "mainImage" ? "Main image is required" : false }}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Box sx={{ mt: 3, mb: 2 }}>
          <input
            {...field}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                if (name === "mainImage") {
                  const file = e.target.files[0];
                  onChange(file);
                  setMainImagePreview(URL.createObjectURL(file));
                } else {
                  const files = Array.from(e.target.files);
                  onChange(files);
                  const newPreviews = files.map(file => URL.createObjectURL(file));
                  setImagesPreview(prevPreviews => [...prevPreviews, ...newPreviews]);
                }
              }
            }}
            style={{ display: "none" }}
            id={`${name}-upload`}
            multiple={multiple}
            accept="image/*"
          />
          <label htmlFor={`${name}-upload`}>
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
              sx={{
                width: '100%',
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                transition: 'background-color 0.3s',
              }}
            >
              {label}
            </Button>
          </label>
          {error && (
            <FormHelperText error sx={{ mt: 1, fontSize: '0.875rem' }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );

  const clearMainImage = () => {
    setMainImagePreview(null);
    setValue("mainImage", null);
  };

  const clearAdditionalImages = () => {
    setImagesPreview([]);
    setValue("images", []);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 3, bgcolor: 'background.default', color: 'text.primary' }}>
        <Typography variant="h4" gutterBottom>
          Add New Project
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Description"
            {...register("description", { required: "Description is required" })}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          {renderFileInput("mainImage", "Upload Main Image")}
          {mainImagePreview && (
            <Box sx={{ mt: 2, position: 'relative', width: '100%', height: '200px' }}>
              <Image src={mainImagePreview} alt="Main image preview" layout="fill" objectFit="contain" />
              <Button
                variant="contained"
                color="secondary"
                onClick={clearMainImage}
                sx={{ mt: 2, position: 'absolute', bottom: 0, right: 0 }}
              >
                Clear Main Image
              </Button>
            </Box>
          )}
          {renderFileInput("images", "Upload Additional Images", true)}
          {imagesPreview.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {imagesPreview.map((preview, index) => (
                  <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
                    <Image src={preview} alt={`Additional image ${index + 1}`} layout="fill" objectFit="cover" />
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearAdditionalImages}
                sx={{ mt: 2 }}
              >
                Clear Additional Images
              </Button>
            </Box>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, display: 'block' }}
          >
            Add Project
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default AddWorkPage;

