export interface ParticipantDetails {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      points: number;
      profilePic: string;
      address: string;
      account: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    participationStatus: string;
    _id: string;
}