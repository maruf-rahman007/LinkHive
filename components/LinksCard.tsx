'use client'

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
import { useState } from "react";
import axios from "axios";
import { Plus, Edit2, Share2, Star, Lock, BarChart2, Trash2 } from 'lucide-react'

export const platforms = [
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "github", label: "GitHub" },
    { key: "portfolio", label: "Portfolio" },
    { key: "twitter", label: "Twitter" },
];

export default function LinkCards() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState('');

    const handleAction = async () => {
        console.log('URL:', url);
        console.log('Selected Platform:', platform);
        const response = await axios.post('/api/add-url', {
            url,
            platform
        });
    };

    return (
        <div className="relative transition duration-75 ease-out w-full h-2xl px-md rounded-xl outline-none bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
            <div
                className="flex items-center justify-center cursor-pointer border-2 border-indigo-600 rounded-full p-4 bg-white hover:bg-indigo-600 transition duration-300 w-full max-w-2xl mx-auto mb-8 group"
                onClick={onOpen}
            >
                <Plus className="text-indigo-600 w-6 h-6 group-hover:text-white transition-colors duration-300" />
                <span className="ml-2 text-indigo-600 text-lg font-semibold group-hover:text-white transition-colors duration-300">Add link</span>
            </div>

            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                classNames={{
                    base: "bg-indigo-50 rounded-lg shadow-indigo-200/50",
                    header: "border-b border-indigo-200",
                    body: "py-6",
                    footer: "border-t border-indigo-200"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-indigo-800">Add New Social Link</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input
                                        type="url"
                                        placeholder="Url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <Select
                                        label="Select Platform"
                                        placeholder="Select a platform"
                                        onSelectionChange={(value) => {
                                            const selectedPlatform = Array.from(value)[0];
                                            if (selectedPlatform) {
                                                setPlatform(String(selectedPlatform));
                                            }
                                        }}
                                        className="border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
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
                                    Add Link
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            
            {['Maruf Rahman', '_hudaii_', 'Maruf Rahman'].map((name, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg border border-indigo-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-indigo-800">{name}</h3>
                        <div className="flex space-x-2">
                            <button className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600 transition-colors duration-200">
                                <Edit2 size={18} />
                            </button>
                            <button className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600 transition-colors duration-200">
                                <Share2 size={18} />
                            </button>
                            <button className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600 transition-colors duration-200">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="text-indigo-600 mb-4">https://example.com/profile</p>
                    <div className="flex justify-between items-center text-sm text-indigo-500">
                        <div className="flex space-x-4">
                            <span className="flex items-center"><Star size={16} className="mr-1" /> 0</span>
                            <span className="flex items-center"><Lock size={16} className="mr-1" /> Private</span>
                        </div>
                        <span className="flex items-center"><BarChart2 size={16} className="mr-1" /> 5 clicks</span>
                    </div>
                </div>
            ))}
        </div>
    );
}