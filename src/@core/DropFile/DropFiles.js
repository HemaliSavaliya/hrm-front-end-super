/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { thumbsContainer, thumb, thumbInner, imgStyle } from './dropFileStyles'

export const DropFiles = ({ handleImageChange }) => {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.pdf', '.docx', '.doc', '.ppt', '.pptx', '.xls', '.xlsx'] },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))
      handleImageChange(acceptedFiles)
    }
  })

  useEffect(() => () => { files.forEach(file => URL.revokeObjectURL(file.preview)) }, [files])

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className='text-center'>Drag 'n' drop your company logo</p>
      </div>
      <aside style={thumbsContainer}>
        {files.map(file => (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}><img src={file.preview} style={imgStyle} alt={file.name} /></div>
          </div>
        ))}
      </aside>
    </section>
  )
}
