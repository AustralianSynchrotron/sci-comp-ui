import { createFileRoute } from '@tanstack/react-router'
import { CameraControl } from '../../../ui/experimental/camera-control'
import { VideoProvider } from '../../../ui/experimental/video-provider'
import { TypographyH1 } from '../../../ui/elements/typography'

export const Route = createFileRoute('/experimental/camera-control-video')({
  component: RouteComponent,
})



import { useState } from 'react';

function RouteComponent() {
  const [mousePos, setMousePos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  const [clickPos, setClickPos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  return <div>
    <VideoProvider videoUrl="/drone.mp4">
      <CameraControl
        className="border"
        onMousePositionChange={setMousePos}
        onClick={setClickPos}
        showIntensity={true}
      // cursorPosition={clickPos}
      />
    </VideoProvider>
    <TypographyH1>
      {mousePos ? `Cursor: x=${Math.round(mousePos.x)}, y=${Math.round(mousePos.y)}, intensity=${mousePos.intensity}` : 'Move mouse over image'}
    </TypographyH1>
    <TypographyH1>
      {clickPos ? `Cursor: x=${Math.round(clickPos.x)}, y=${Math.round(clickPos.y)}, intensity=${clickPos.intensity}` : 'Click on the image'}
    </TypographyH1>

  </div>
}
