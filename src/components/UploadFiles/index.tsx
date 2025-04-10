'use client'

import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../dropzone'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface FileUploadProps {
  onUploadSuccess?: (url: string) => void
}

export function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [processedUpload, setProcessedUpload] = useState(false)
  const props = useSupabaseUpload({
    bucketName: 'user-image',
    path: 'info-nzenzu',
    allowedMimeTypes: ['image/*'],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 5,
  })

  useEffect(() => {
    if (
      props.isSuccess &&
      props.files.length > 0 &&
      props.successes.length > 0 &&
      !processedUpload
    ) {
      const newFileName = props.successes[0]

      const { data } = supabase.storage
        .from('user-image')
        .getPublicUrl(`info-nzenzu/${newFileName}`)

      onUploadSuccess?.(data.publicUrl)
      setProcessedUpload(true)
    }

    // Reset processedUpload when files change
    if (props.files.length === 0) {
      setProcessedUpload(false)
    }
  }, [
    props.isSuccess,
    props.files,
    props.successes,
    onUploadSuccess,
    processedUpload,
  ])

  return (
    <div className='w-full'>
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}
