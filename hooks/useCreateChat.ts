"use client";
import { useState } from "react";
import axios from "axios";
import { Language } from "@/types/language";
import { ChatType } from "@/types/chat";

export const useCreateChat = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language | null>(null);
  const [chatType, setChatType] = useState<ChatType | null>(null);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inviteLink, setInviteLink] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };

  const handleChatTypeSelect = (selectedType: ChatType) => {
    setChatType(selectedType);
  };

  const handleAddInviteMember = (email: string) => {
    setInviteEmails([...inviteEmails, email]);
  };

  const handleRemoveInviteMember = (email: string) => {
    setInviteEmails(inviteEmails.filter((e) => e !== email));
  };

  const createChat = async (data: {
    language: string;
    chatType: ChatType;
    inviteEmails: string[];
  }) => {
    try {
      const response = await axios.post("/api/chat/create", data);
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  const sendInvitations = async () => {
    if (!chatId) return;
    try {
      await axios.post("/api/chat/invite", {
        chatId,
        emails: inviteEmails,
        chatType,
      });
      // Handle success
    } catch (error) {
      console.error("Error sending invitations:", error);
      // Handle error
    }
  };

  const handleNext = async () => {
    if (step === 1 && language) {
      setStep(2);
    } else if (step === 2 && chatType) {
      if (chatType === "ai") {
        const chat = await createChat({
          language: language!.code,
          chatType,
          inviteEmails: [],
        });
        setChatId(chat.id);
        // Redirect to the AI chat page with the chat ID
        window.location.href = `/chat/ai?uuid=${chat.id}`;
      } else {
        const chat = await createChat({
          language: language!.code,
          chatType,
          inviteEmails: [],
        });
        setChatId(chat.id);
        setInviteLink(`${window.location.origin}/chat/join?token=${chat.id}`);
        setStep(3);
      }
    } else if (step === 3) {
      // Redirect to the chat interface with the created chat ID
      if (chatType === "group") {
        window.location.href = `/chat/group/${chatId}`;
      } else if (chatType === "oneOnOne") {
        window.location.href = `/chat/conversation/${chatId}`;
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isLastStep =
    (step === 3 && chatType !== "ai") || (step === 2 && chatType === "ai");

  return {
    step,
    language,
    chatType,
    inviteEmails,
    inviteLink,
    chatId,
    handleLanguageSelect,
    handleChatTypeSelect,
    handleAddInviteMember,
    handleRemoveInviteMember,
    sendInvitations,
    handleNext,
    handleBack,
    isLastStep,
  };
};