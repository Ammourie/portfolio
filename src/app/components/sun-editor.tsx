import { Control, Controller } from 'react-hook-form'
import { FormHelperText, Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File

import { useEffect, useState } from 'react'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
})

const EditorComponent = ({
  name,
  control,
  error,
  required,
  initValue,
  label,
  additionalOnChange
}: {
  name: string
  control: Control<any>
  error?: boolean
  required?: boolean
  initValue?: string
  label?: string
  additionalOnChange?: () => void
}) => {

  const plugins = require('suneditor/src/plugins')

  return (
    <Box
      sx={{
        width: '100%', // Added width property
        '& .sun-editor': {
          borderRadius: '6px !important',
          overflow: 'hidden',
          background: 'transparent',
          border: `1px solid #f44336`,
          display: 'flex',
          flexDirection: 'column',
        },
        '& .sun-editor .se-container': {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
        '& .sun-editor .se-wrapper': {
          flex: 1,
          overflow: 'auto',
        },
        '& .sun-editor .se-wrapper .se-wrapper-inner': {
          height: 'auto',
          minHeight: '300px',
        },
        '& .sun-editor .se-toolbar': {
          outline: 'none',
          borderBottom: `1px solid #f44336`,
          background: 'transparent'
        },
        '& .sun-editor button.se-btn.active': {
          boxShadow: '0px 0px 2px 1px #f44336',
          color: '#f44336'
        },
        '& .sun-editor button.se-btn': {
          backgroundColor: `#f44336 !important`,
          color: '#FFF'
        },
        '& .sun-editor .se-btn-module-border': {
          border: 'none'
        },
        '& .sun-editor-editable': {
          background: 'transparent'
        },
        '& .se-resizing-bar': {
          background: '#f4433633',
          minHeight: '3px',
          border: 'none '
        },
        '& .sun-editor .se-wrapper .se-wrapper-code': {
          overflow: 'auto !important', // Sidestep a bug in the editor code view, where it has no scrollbars!
        },
      }}
    >
      {label && (
        <Typography variant='subtitle1' mb={0} fontSize={14}>
          {label + (required ? ' *' : '')}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required: { value: Boolean(required), message: 'This field is required' } }}
        render={({ field: { onChange, value } }) => {
          return (
            <SunEditor
              onChange={content => {
                content === '<p><br></p>' ? onChange('') : onChange(content)
                if (additionalOnChange) {
                  additionalOnChange()
                }
              }}
              defaultValue={initValue ?? value}
              height="auto"
              width="100%"
              setOptions={{
                plugins: plugins,
                buttonList: [
                  ['undo', 'redo'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['paragraphStyle', 'blockquote'],
                  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                   ['fontColor', 'hiliteColor', 'textStyle'],
                  ['removeFormat'],
                  ['outdent', 'indent'],
                  ['align', 'horizontalRule', 'list', 'lineHeight'],
                  ['table', 'link', 'image', 'video', 'audio'] // You must add the 'katex' library at options to use the 'math' plugin.
                ],
                imageFileInput: false,
                imageUrlInput: true,
                height: 'auto',
                minHeight: '300px',
                maxHeight: '600px', // You can adjust this value as needed
              }}
              //@ts-ignore
              setDefaultStyle={`font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size:  1rem;  color: #fff; border:  ${
                error ? `1px solid #f44336` : null
              }; margin-top: 1px; border-radius: 6px; min-height:300px`}
            />
          )
        }}
      />
      {error && (
        <FormHelperText error sx={{ fontSize: 13, marginTop: '6px' }}>
          This field is required
        </FormHelperText>
      )}
    </Box>
  )
}

export default EditorComponent
