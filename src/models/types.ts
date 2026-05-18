import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  'Notes List': undefined;
  'Create Note': undefined;
};

export type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  location?: LocationCoordinates;
  imageUri?: string;
}

export interface NotesState {
  notes: Note[];
}

export interface RootState {
  notes: NotesState;
}
