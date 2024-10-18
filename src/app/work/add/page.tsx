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
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import EditorComponent from "@/app/components/sun-editor";
import './styles.scss';

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
  slug: string;
  description: string;
  mainImage: File | null;
  images: File[];
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

  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

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
        slug: data.title.toLowerCase().replace(/ /g, "-"),
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
      toast.success('Project uploaded successfully!');
      router.replace('/work');
      router.refresh(); // Revalidate and refresh the '/work' page data

    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('Failed to upload project. Please try again.');
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
              // startIcon={<UploadIcon />}
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
      <Box className="add-work-page">
        <Typography
          variant={isMobile ? "h5" : "h4"}
          className="add-work-page__title"
          sx={{ mb: 4 }}
        >
          Add New Project
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="add-work-page__form">
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            className="add-work-page__input"
          />
          <Box className="add-work-page__input">
            <EditorComponent
              control={control}
              name="description"
              error={!!errors.description}
              required={true}
              label="Description"
            />
          </Box>
          
          <Box className="add-work-page__input">
            {renderFileInput("mainImage", "Upload Main Image")}
            {mainImagePreview && (
              <Box className="add-work-page__image-preview">
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
          </Box>
          
          <Box className="add-work-page__input">
            {renderFileInput("images", "Upload Additional Images", true)}
            {imagesPreview.length > 0 && (
              <Box className="add-work-page__additional-images">
                {imagesPreview.map((preview, index) => (
                  <Box key={index} className="add-work-page__additional-image">
                    <Image
                      src={preview}
                      alt={`Additional image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                ))}
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
          </Box>
          
          <Box className="add-work-page__submit-button">
            {!isLoading && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Project
              </Button>
            )}
            { isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: '#FF0000',
                  position: 'absolute',
                  // top: '50%',
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
