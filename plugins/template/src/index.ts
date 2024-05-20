import sendMessage from "./patches/sendMessage";

const patches = [
    ...sendMessage,
];

export const onUnload = () => patches.forEach(p => p());