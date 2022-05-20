
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

// Operation that's useful in mutating the data as needed
const [previewChange$, setPreview] = createSignal<boolean>()
const [useShowLivePreview, liveData$] = bind(previewChange$, false)

export {
    setPreview as setShowLivePreview, useShowLivePreview
}
