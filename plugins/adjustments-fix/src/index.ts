import { findByProps } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

// Default settings
storage.nameLength ??= 8;

const uploadModule = findByProps("uploadLocalFiles");

export const onUnload = after("uploadLocalFiles", uploadModule, (args) => { 
    const { items } = args[0];
    if (!items) return;

    for (const i of items) {
        // why are there two. why???
        // and yes, i checked, setting both is required...
        if (i.filename == "Adjustments.plist") {
            i.filename = "image.png";
        }
        if (i.item) {
            if (i.item.filename == "Adjustments.plist") 
                i.item.filename = "image.png";
        }
    }
});