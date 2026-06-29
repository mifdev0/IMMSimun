'use client'

import { useState, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { SlidersHorizontal, X } from 'lucide-react'

interface Props {
  image: string
  aspect?: number
  cropShape?: 'rect' | 'round'
  onCropDone: (croppedDataUrl: string) => void
  onCancel: () => void
}

export default function ImageCropper({ image, aspect = 1, cropShape = 'rect', onCropDone, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const getCroppedImg = async () => {
    if (!croppedAreaPixels) return
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.src = image
    await new Promise((resolve) => { img.onload = resolve })

    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height
    const ctx = canvas.getContext('2d')!

    ctx.drawImage(
      img,
      croppedAreaPixels.x, croppedAreaPixels.y,
      croppedAreaPixels.width, croppedAreaPixels.height,
      0, 0,
      croppedAreaPixels.width, croppedAreaPixels.height
    )

    onCropDone(canvas.toDataURL('image/jpeg', 0.9))
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-base">Sesuaikan Gambar</h3>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full h-[320px] bg-black/90">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-[#f97316]"
            />
            <span className="text-xs text-gray-400 w-8 text-right">{Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex gap-3">
            <button onClick={onCancel}
              className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
              Batal
            </button>
            <button onClick={getCroppedImg}
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold text-sm transition-all hover:shadow-lg active:scale-[0.98]">
              Gunakan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
