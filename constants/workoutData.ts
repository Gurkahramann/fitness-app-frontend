// app/constants/workoutData.ts

export type WorkoutProgram = {
    id: string;
    title: string;
    image: string;
  };
  
  export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
    {
      id: '1',
      title: 'Cardio',
      image: 'https://via.placeholder.com/150/FF0000',
    },
    {
      id: '2',
      title: 'BodyWeight',
      image: 'https://via.placeholder.com/150/00FF00',
    },
    {
      id: '3',
      title: 'Beginner',
      image: 'https://via.placeholder.com/150/0000FF',
    },
    {
      id: '4',
      title: 'Intermediate',
      image: 'https://via.placeholder.com/150/FFFF00',
    },
    {
      id: '5',
      title: 'Advanced',
      image: 'https://via.placeholder.com/150/FF00FF',
    },
  ];
  