import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../components/page-header"
import { CameraControl } from '../../../ui/experimental/camera-control'
import { WebsocketH264Provider } from '../../../ui/experimental/websocket-h264-provider'
import { TypographyH1 } from '../../../ui/elements/typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"


export const Route = createFileRoute('/experimental/camera-control-h264')({
  component: CameraControlWebsocketH264Page,
})


/* DEMO_START */
function CameraControlWebsocketH264Demo() {
  const [mousePos, setMousePos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  const [clickPos, setClickPos] = useState<{ x: number, y: number, intensity: number } | null>(null);
  return (
    <div>
      <WebsocketH264Provider wsUrl="wss://eiger-h264-stream.ads1.beamline.synchrotron.org.au/ws">
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
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const CameraControlWebsocketH264Source = __SOURCE__

/* DEMO_START */
function CameraControlWebsocketH264Page() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ title: "Experimental", href: "/experimental" }, { title: "Camera Control with Websocket H264 Source" }]}
        pageHeading="Camera Control with Websocket H264 Source"
        pageSubheading="A camera control component integrated with a WebSocket H264 video stream for real-time image interaction."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Position Control</CardTitle>
              <CardDescription>
                Interactive motor position control with real-time movement simulation,
                adjustable increments, and visual feedback. Perfect for controlling
                stepper motors, linear actuators, and other positioning systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CameraControlWebsocketH264Demo />}
                source={CameraControlWebsocketH264Source}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
/* DEMO_END */
