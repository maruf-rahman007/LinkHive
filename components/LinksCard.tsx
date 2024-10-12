"use client"; // Ensure this is at the top if you're using client components
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useState } from "react"; // Import useState to manage input state
import axios from "axios";
export const platforms = [
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "github", label: "GitHub" },
    { key: "portfolio", label: "Portfolio" },
    { key: "twitter", label: "Twitter" },
  ];

export default function LinkCards() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Manage modal state

    // State to hold the URL and selected platform
    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState('');

    // Function to handle the action button click
    const handleAction = async () => {
        console.log('URL:', url); // Logs the entered URL
        console.log('Selected Platform:', platform); // Logs the selected platform name
        // Here, you would typically send a request to the backend
        const response = await axios.post('/api/add-url', {
            url,
            platform
          });
    };

    return (
        <div className="relative transition duration-75 ease-out w-full h-2xl px-md rounded-xl outline-none">
            <div
                className="flex items-center justify-center cursor-pointer border border-purple-600 rounded-full p-4 bg-white hover:bg-purple-600 transition duration-300 w-full max-w-2xl mx-auto"
                onClick={onOpen} // Open the modal on click
            >
                <span className="text-purple-600 text-4xl font-bold">+</span>
                <span className="ml-2 text-purple-600 text-lg font-semibold">Add link</span>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add New Social Link</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input
                                        type="url"
                                        placeholder="Url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)} // Update the URL state
                                    />
                                </div>
                                <div>
                                    <Select
                                        label="Select Platform"
                                        placeholder="Select a platform"
                                        onSelectionChange={(value) => {
                                            // Convert the Set to an Array and extract the first item as a string
                                            const selectedPlatform = Array.from(value)[0];
                                            if (selectedPlatform) {
                                                setPlatform(String(selectedPlatform)); // Ensure it's a string
                                            }
                                        }} // Handle selected platform correctly
                                    >
                                        {platforms.map((item) => (
                                            <SelectItem key={item.key} value={item.key}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { handleAction(); onClose(); }}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="mt-20">
                <div className="flex items-center justify-center cursor-pointer border border-black rounded-full p-4 bg-white transition duration-300 w-full max-w-2xl mx-auto mb-5"
                >
                    <div className="flex flex-col">
                    <h3 className="font-bold">Maruf Rahman</h3>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <h3>df.bkskdjherjhrkjker;glrl;jktlk</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center cursor-pointer border border-black rounded-full p-4 bg-white transition duration-300 w-full max-w-2xl mx-auto mb-5"
                >
                    <div className="flex flex-col">
                    <h3 className="font-bold">Maruf Rahman</h3>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <h3>df.bkskdjherjhrkjker;glrl;jktlk</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center cursor-pointer border border-black rounded-full p-4 bg-white transition duration-300 w-full max-w-2xl mx-auto mb-5"
                >
                    <div className="flex flex-col">
                    <h3 className="font-bold">Maruf Rahman</h3>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <h3>df.bkskdjherjhrkjker;glrl;jktlk</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center cursor-pointer border border-black rounded-full p-4 bg-white transition duration-300 w-full max-w-2xl mx-auto mb-5"
                >
                    <div className="flex flex-col">
                    <h3 className="font-bold">Maruf Rahman</h3>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <h3>df.bkskdjherjhrkjker;glrl;jktlk</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
