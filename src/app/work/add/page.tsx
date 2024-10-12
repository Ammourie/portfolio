"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

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
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
      }}
      ref={ref}
      {...props}
    />
  );
});

VisuallyHiddenInput.displayName = "VisuallyHiddenInput";

interface FormData {
  title: string;
  description: string;
  mainImage: File | null;
  images: File[];
}

interface UploadData {
  mainImage: string | null;
  images: string[];
  title: string;
  description: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (file: File, isMainImage: boolean = false): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "default");

    try {
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload ${isMainImage ? 'main image' : 'image'}`);
      }
      const result = await uploadResponse.json();
      console.log(`${isMainImage ? 'Main image' : 'Image'} uploaded successfully:`, result);
      return result.url;
    } catch (error) {
      console.error(`Error uploading ${isMainImage ? 'main image' : 'image'}:`, error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    console.clear();
    console.log("Data:", data.mainImage);
    try {
      // Use existing main image URL if available, otherwise upload
      let finalMainImageUrl = mainImageUrl;
      if (data.mainImage && !finalMainImageUrl) {
        finalMainImageUrl = await uploadImage(data.mainImage, true);
        setMainImageUrl(finalMainImageUrl);
      }

      // Use existing image URLs if available, otherwise upload
      let finalImageUrls = [...imageUrls];
      if (data.images && data.images.length > 0 && finalImageUrls.length === 0) {
        for (const image of data.images) {
          const imageUrl = await uploadImage(image);
          finalImageUrls.push(imageUrl);
        }
        setImageUrls(finalImageUrls);
      }

      // Prepare data for upload
      const workData = {
        title: data.title,
        description: data.description,
        mainImage: finalMainImageUrl,
        images: finalImageUrls,
      };

      console.log('Work data prepared for upload:', workData);

      // Upload project data to the server
      const response = await fetch('/api/upload-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workData),
      });

      if (!response.ok) {
        throw new Error('Failed to upload project');
      }

      const result = await response.json();
      console.log('Project uploaded successfully:', result);
      router.replace('/work');
      router.refresh(); // Revalidate and refresh the '/work' page data

    } catch (error) {
      console.error('Error in form submission:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const renderFileInput = (
    name: "mainImage" | "images",
    label: string,
    multiple: boolean = false
  ) => (
    <Controller
      name={name}
      control={control}
      rules={{
        required: name === "mainImage" ? "Main image is required" : false,
      }}
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
                  setMainImageUrl(null);

                  setMainImagePreview(URL.createObjectURL(file));

                } else {
                  const files = Array.from(e.target.files);
                  onChange(files);
                  setImageUrls([]);
                  const newPreviews = files.map((file) =>
                    URL.createObjectURL(file)
                  );
                  setImagesPreview((prevPreviews) => [
                    ...prevPreviews,
                    ...newPreviews,
                  ]);
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
                width: "100%",
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                transition: "background-color 0.3s",
              }}
            >
              {label}
            </Button>
          </label>
          {error && (
            <FormHelperText error sx={{ mt: 1, fontSize: "0.875rem" }}>
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
    setMainImageUrl(null);
  };

  const clearAdditionalImages = () => {
    setImagesPreview([]);
    setValue("images", []);
    setImageUrls([]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          padding: 3,
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
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
            {...register("description", {
              required: "Description is required",
            })}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          {renderFileInput("mainImage", "Upload Main Image")}
          {mainImagePreview && (
            <Box
              sx={{
                mt: 2,
                position: "relative",
                width: "100%",
                height: "200px",
              }}
            >
              <Image
                src={mainImagePreview}
                alt="Main image preview"
                layout="fill"
                objectFit="contain"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={clearMainImage}
                sx={{ mt: 2, position: "absolute", bottom: 0, right: 0 }}
              >
                Clear Main Image
              </Button>
            </Box>
          )}
          {renderFileInput("images", "Upload Additional Images", true)}
          {imagesPreview.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {imagesPreview.map((preview, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <Image
                      src={preview}
                      alt={`Additional image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
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
          <Box sx={{ mt: 2, position: 'relative', height: 36, width: '100%' }}>
            {!isLoading && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ display: "block", width: '100%' }}
              >
                Add Project
              </Button>
            )}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default AddWorkPage;
