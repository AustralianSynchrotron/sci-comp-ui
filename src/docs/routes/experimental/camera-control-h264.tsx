import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { PageHeader } from '@/docs/components/page-header';
import { DemoContainer } from '@/docs/components/demo-container';

import { TypographyH1 } from '@/ui/elements/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/layout/card';

import { CameraControl, type CameraMousePosition } from '@/ui/experimental/camera-control/camera-control';
import { WebsocketH264Provider } from '@/ui/experimental/camera-control/websocket-h264-provider';
import { h264FetchApi } from '@/ui/experimental/camera-control/h264-fetch';

export const Route = createFileRoute('/experimental/camera-control-h264')({
    component: CameraControlWebsocketH264Page,
});

/* DEMO_START */
function CameraControlWebsocketH264Demo() {
    const [mousePos, setMousePos] = useState<CameraMousePosition | null>(null);
    const [clickPos, setClickPos] = useState<CameraMousePosition | null>(null);
    const api = useMemo(() => h264FetchApi('localhost:9999'), []);
    return (
        <div className="w-full h-full">
            <WebsocketH264Provider api={api}>
                <CameraControl
                    className="border"
                    onMousePositionChange={setMousePos}
                    onClick={setClickPos}
                    showIntensity={true}
                />
            </WebsocketH264Provider>
            <TypographyH1>
                {mousePos
                    ? `Cursor: x=${Math.round(mousePos.x)}, y=${Math.round(mousePos.y)}, intensity=${mousePos.intensity}`
                    : 'Move mouse over image'}
            </TypographyH1>
            <TypographyH1>
                {clickPos
                    ? `Cursor: x=${Math.round(clickPos.x)}, y=${Math.round(clickPos.y)}, intensity=${clickPos.intensity}`
                    : 'Click on the image'}
            </TypographyH1>
        </div>
    );
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const CameraControlWebsocketH264Source = __SOURCE__;

/* DEMO_START */
function CameraControlWebsocketH264Page() {
    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { title: 'Experimental', href: '/experimental' },
                    { title: 'Camera Control with Websocket H264 Source' },
                ]}
                pageHeading="Camera Control with Websocket H264 Source"
                pageSubheading="A camera control component integrated with a WebSocket H264 video stream for real-time image interaction."
            />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Position Control</CardTitle>
                            <CardDescription>
                                <p>
                                    Video display for h264 over websocket streams. Source is the AS Websocket Stream
                                    (private repo at this time). The h264 stream is provided to the camera-control
                                    component via a h264 provider.
                                </p>
                                <p>Click and drag to zoom in.</p>
                                <p>Hold space and drag to move (will not move when at the edge of the image).</p>
                                <p>Double-click to reset zoom.</p>
                                <p>Hold ctrl and click to visually mark clicked position.</p>
                                <p>
                                    <i>
                                        Note: At the moment this demo only works if you have h264-websocket-stream API
                                        running on localhost:9999
                                    </i>
                                </p>
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
    );
}
/* DEMO_END */
