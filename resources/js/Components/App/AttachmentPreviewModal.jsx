import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";

export default function AttachmentPreviewModal({
    attachment,
    index,
    show = false,
    onClose = () => { },
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const attachment = useMemo(() => {
        return attachments[currentIndex];
    }, [attachments, currentIndex]);

    const previewableAttachments = useMemo(() => {
        return attachments.filter((attachment) => {
            return isPreviewable(attachment);
        });
    }, [attachments]);

    const close = () => {
        onClose();
    };

    const next = () => {
        if (currentIndex === previewableAttachments.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog as="div"
                id="modal"
                className="relative z-50"
                onClose={close}
            >
                <TransitionChild
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </TransitionChild>
                <div className="fixed inset-0 flex overflow-y-auto">
                    <div className="h-screen w-screen">
                        <TransitionChild
                            as={Fragment}
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="flex flex-col w-full h-full transform 
                                overflow-hidden text-left align-middle bg-slate-800 shadow-xl transition-all">
                                <button onClick={close}
                                    className="absolute top-3 right-3 w-10
                                    h-10 rounded-full flex items-center transition
                                    justify-center hover:bg-black/10 text-gray-100 z-40">
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                                <div className="relative group h-full">
                                    {currentIndex > 0 && (
                                        <div onClick={prev} className="absolute opacity-100 text-gray-100
                                         cursor-pointer flex items-center justify-center
                                         w-16 h-16 left-4 top-1/2 -translate-y-1/2 z-30
                                         rounded-full bg-black/50">
                                            <ChevronLeftIcon className="w-12" />
                                        </div>
                                    )}
                                    {currentIndex < previewableAttachments.length - 1 && (
                                        <div onClick={next} className="absolute opacity-100 text-gray-100
                                         cursor-pointer flex items-center justify-center
                                         w-16 h-16 right-4 top-1/2 -translate-y-1/2 z-30
                                         rounded-full bg-black/50">
                                            <ChevronRightIcon className="w-12" />
                                        </div>
                                    )}
                                    {attachment && (
                                        <div className="flex items-center justify-center w-full h-full p-3">
                                            {isImage(attachment) && (
                                                <img
                                                    src={attachment.url} className="max-w-full max-h-full" />
                                            )}
                                            {isVideo(attachment) && (<div className="flex items-center justify-center w-full h-full p-3">
                                                <video controls autoPlay
                                                    src={attachment.url} className="flex items-center" > </video>
                                            </div>)}
                                            {isAudio(attachment) && (<div className="flex items-center justify-center relative">
                                                <audio controls autoPlay
                                                    src={attachment.url} className="flex items-center" > </audio>
                                            </div>)}
                                            {isPDF(attachment) && (
                                                <iframe src={attachment.url} className="w-full h-full"></iframe>
                                            )}
                                            {!isPreviewable(attachment) && (
                                                <div className="p-32 flex flex-col justify-center 
                                                items-center text-gray-100">
                                                    <PaperClipIcon className="w-10 h-10 mb-3" />
                                                    <small>{attachment.name}</small>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}