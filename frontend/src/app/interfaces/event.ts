import { ParticipantDetails } from "./participantsDetails";

export interface EventDetails {
    _id: string;
    eventName: string;
    eventTime: string;
    eventLocation: string;
    eventOrganizer: string;
    eventParticipant: ParticipantDetails[]; // Update the type based on your actual data structure
    eventToken: string;
    eventDescription: string;
    eventStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}