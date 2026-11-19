/**
 * Whenever using a public use or open sourced third party SVG,
 * remember to ensure the SVG path actually fill up the view box.
 *
 * Often (particularly for MUI icons) there is white space built into the SVG,
 * where neither the height nor width are the real width of the view box.
 * This can cause issues as there is no precise control over the real visual
 * size of the icon.
 *
 * To fix this, before adding the icon to this library:
 *
 * 1. Open the SVG in your chosen SVG editing program (Figma works great,
 *    and you can add the icon as a global library component while you're at it)
 *
 * 2. Select the inner SVG path/group and lock the ratio
 *
 * 3. Resize the selected inner SVG to match the outer view box size
 *
 * 4. Vertically and horizontally re-centre the inner SVG within the view box
 *    (at this point either the height or the width should fill the view box,
 *     or both if it also has equal ratio)
 *
 * 5. Export the SVG file, paste it into https://jakearchibald.github.io/svgomg/
 *    to minify the SVG
 *
 * 6. Copy the SVG into this library, remove any hardcoded "fill", "height" and
 *    "width", this will make it easier to be used (view box will maintain the ratio)
 *
 * 7. Double check the minified SVG for any unnecessary groups or masks that
 *    couldn't be automatically removed during minify, and remove them manually
 *
 **/

// SVGS
export { SvgAbort } from "./svgs/Abort";
export { SvgAlert } from "./svgs/Alert";
export { SvgArrow } from "./svgs/Arrow";
export { SvgAssistWalker } from "./svgs/AssistWalker";
export { SvgAutoSetting } from "./svgs/AutoSetting";
export { SvgCake } from "./svgs/Cake";
export { SvgCapture } from "./svgs/Capture";
export { SvgCheck } from "./svgs/Check";
export { SvgCircleFilled } from "./svgs/CircleFilled";
export { SvgClose } from "./svgs/Close";
export { SvgCode } from "./svgs/Code";
export { SvgCurtainClose } from "./svgs/CurtainClose";
export { SvgCurtainOpen } from "./svgs/CurtainOpen";
export { SvgDelete } from "./svgs/Delete";
export { SvgDetector } from "./svgs/Detector";
export { SvgEdit } from "./svgs/Edit";
export { SvgExclaimation } from "./svgs/Exclaimation";
export { SvgFocus } from "./svgs/Focus";
export { SvgHamburger } from "./svgs/Hamburger";
export { SvgHamburgerClose } from "./svgs/HamburgerClose";
export { SvgHiking } from "./svgs/Hiking";
export { SvgKayak } from "./svgs/Kayak";
export { SvgLightDarkMode } from "./svgs/LightDarkMode";
export { SvgLock } from "./svgs/Lock";
export { SvgLogo } from "./svgs/Logo";
export { SvgMathFunction } from "./svgs/MathFunction";
export { SvgMinus } from "./svgs/Minus";
export { SvgMobius } from "./svgs/Mobius";
export { SvgNextLoop } from "./svgs/NextLoop";
export { SvgOpacity } from "./svgs/Opacity";
export { SvgPause } from "./svgs/Pause";
export { SvgPlay } from "./svgs/Play";
export { SvgPlus } from "./svgs/Plus";
export { SvgPointer } from "./svgs/Pointer";
export { SvgQuestion } from "./svgs/Question";
export { SvgRedo } from "./svgs/Redo";
export { SvgRefresh } from "./svgs/Refresh";
export { SvgReorder } from "./svgs/Reorder";
export { SvgRestore } from "./svgs/Restore";
export { SvgRotateMinus90 } from "./svgs/RotateMinus90";
export { SvgRotatePlus90 } from "./svgs/RotatePlus90";
export { SvgRunning } from "./svgs/Running";
export { SvgSave } from "./svgs/Save";
export { SvgSitting } from "./svgs/Sitting";
export { SvgStar } from "./svgs/Star";
export { SvgStop } from "./svgs/Stop";
export { SvgSubLoop } from "./svgs/SubLoop";
export { SvgSwimming } from "./svgs/Swimming";
export { SvgTired } from "./svgs/Tired";
export { SvgUndo } from "./svgs/Undo";
export { SvgUnlock } from "./svgs/Unlock";
export { SvgUpload } from "./svgs/Upload";
export { SvgVisibilityOff } from "./svgs/VisibilityOff";
export { SvgVisibilityOn } from "./svgs/VisibilityOn";
export { SvgWedge } from "./svgs/Wedge";
export { SvgWheelchair } from "./svgs/Wheelchair";
export { SvgZen } from "./svgs/Zen";
export { SvgZoomIn } from "./svgs/ZoomIn";
export { SvgZoomOut } from "./svgs/ZoomOut";
