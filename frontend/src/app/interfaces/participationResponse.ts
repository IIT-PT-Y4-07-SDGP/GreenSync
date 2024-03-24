export interface ParticipateEventsResponse {
    account: string;
    address: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    participatedEvents: {
      event: {
        _id: string;
        eventName: string;
        eventTime: string;
        eventLocation: string;
        eventDescription: string;
        eventOrganizer: string;
        eventParticipant: any[]; // Adjust the type if needed
        eventToken: string;
        eventStatus: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      participationStatus: string;
      _id: string;
    }[];
    points: number;
  }