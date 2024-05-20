import { findByProps } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import fileString from "./lib/fileString";

// Default settings
storage.nameLength ??= 8;

const uploadModule = findByProps("uploadLocalFiles");

export const onUnload = after("uploadLocalFiles", uploadModule, (args) => { 
    const { items } = args[0];
    if (!items) return;

    for (const i of items) {
        // https://github.com/Vendicated/Vencord/blob/7c514e4b1dae25f48b20bc6d5f3025c22e231450/src/plugins/anonymiseFileNames.ts#L70-L71
        const extIdx = i.filename.lastIndexOf(".");
        const ext = extIdx !== -1 ? i.filename.slice(extIdx) : "";

        const name = fileString;

        // why are there two. why???
        // and yes, i checked, setting both is required...
        if (ext == "png" || ext == "jpg" || ext == "jpeg") {
            i.filename = "image.png";
            if (i.item) i.item.filename = "image.png";
        }
    }
});

export { default as settings } from "./Settings";