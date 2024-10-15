"use client";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Twitter, Globe, MoreHorizontal } from 'lucide-react';
import {
  profileImageAtom,
  profileNameAtom,
  profileHeadlineAtom,
  profileAccountsAtom,
} from "@/store/atoms/atoms";
import { useRecoilValue } from "recoil";

const PreviewCard = () => {
  // Use Recoil state values directly
  const profileImage = useRecoilValue(profileImageAtom);
  const profileName = useRecoilValue(profileNameAtom);
  const profileHeadline = useRecoilValue(profileHeadlineAtom);
  const profileAccounts = useRecoilValue(profileAccountsAtom);
  console.log("here is headline :", profileHeadline);
  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  return (
    <div className="rounded-2xl min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="w-full max-w-md space-y-6 backdrop-blur-lg bg-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="text-center">
          <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
            <AvatarImage src={profileImage || '/placeholder.svg'} alt={profileName || 'User Image'} />
            <AvatarFallback>{profileName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <h1 className="mt-6 text-3xl font-bold text-white">{profileName || 'User Name'}</h1>
          <p className="mt-2 text-xl text-white/80">{profileHeadline || 'Title'}</p>
        </div>
        <div className="space-y-4">
          {profileAccounts?.map((account, index) => (
            <Button
              key={index}
              variant="secondary"
              className="w-full justify-between text-left font-medium bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 ease-in-out transform hover:scale-105"
              asChild
            >
              <a href={account.url} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-3">
                  {getIconForPlatform(account.platform)}
                  {account.platform}
                </span>
                <MoreHorizontal size={20} />
              </a>
            </Button>
          ))}
        </div>
        <div className="text-center pt-4">
          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            linkhive/{profileName?.toLowerCase() || 'username'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
