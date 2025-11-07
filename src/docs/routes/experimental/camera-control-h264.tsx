import { createFileRoute } from '@tanstack/react-router'
import { CameraControl } from '../../../ui/experimental/camera-control'
import { WebsocketH264Provider } from '../../../ui/experimental/websocket-h264-provider'
import { TypographyH1 } from '../../../ui/elements/typography'

export const Route = createFileRoute('/experimental/camera-control-h264')({
  component: RouteComponent,
})



import { useState } from 'react';

function RouteComponent() {
  const [mousePos, setMousePos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  const [clickPos, setClickPos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  return <div>
    <WebsocketH264Provider wsUrl="ws://localhost:8080/ws">
      <CameraControl
        className="border"
        onMousePositionChange={setMousePos}
        onClick={setClickPos}
        showIntensity={true}
      // cursorPosition={clickPos}
      />
    </WebsocketH264Provider>
    <TypographyH1>
      {mousePos ? `Cursor: x=${Math.round(mousePos.x)}, y=${Math.round(mousePos.y)}, intensity=${mousePos.intensity}` : 'Move mouse over image'}
    </TypographyH1>
    <TypographyH1>
      {clickPos ? `Cursor: x=${Math.round(clickPos.x)}, y=${Math.round(clickPos.y)}, intensity=${clickPos.intensity}` : 'Click on the image'}
    </TypographyH1>

  </div>
}
