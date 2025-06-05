import { EXERCISES, type Exercise } from "./workoutData"

export interface ExerciseCategory {
  id: string
  name: string
  icon: string
  color: string
  exercises: Exercise[]
}

export const EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    id: "chest",
    name: "Chest",
    icon: "💪",
    color: "#FF6B6B",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Chest"),
  },
  {
    id: "back",
    name: "Back",
    icon: "🏋️",
    color: "#4ECDC4",
    exercises: EXERCISES.filter(
      (ex) =>
        ex.muscleGroup === "Back" ||
        ex.muscleGroup === "Upper Back" ||
        ex.muscleGroup === "Back/Biceps" ||
        ex.muscleGroup === "Back/Glutes" ||
        ex.muscleGroup === "Back/Core",
    ),
  },
  {
    id: "shoulders",
    name: "Shoulders",
    icon: "🤸",
    color: "#45B7D1",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Shoulders"),
  },
  {
    id: "legs",
    name: "Legs",
    icon: "🦵",
    color: "#96CEB4",
    exercises: EXERCISES.filter(
      (ex) =>
        ex.muscleGroup === "Legs" ||
        ex.muscleGroup === "Quads" ||
        ex.muscleGroup === "Hamstrings" ||
        ex.muscleGroup === "Hamstrings/Glutes" ||
        ex.muscleGroup === "Glutes" ||
        ex.muscleGroup === "Calves",
    ),
  },
  {
    id: "core",
    name: "Core",
    icon: "🎯",
    color: "#FECA57",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Core"),
  },
  {
    id: "cardio",
    name: "Cardio",
    icon: "❤️",
    color: "#FF9FF3",
    exercises: EXERCISES.filter(
      (ex) => ex.type === "cardio" || ex.muscleGroup === "Cardiovascular" || ex.muscleGroup === "Cardio",
    ),
  },
  {
    id: "triceps",
    name: "Triceps",
    icon: "💥",
    color: "#54A0FF",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Triceps" || ex.muscleGroup === "Chest/Triceps"),
  },
  {
    id: "biceps",
    name: "Biceps",
    icon: "💪",
    color: "#5F27CD",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Biceps"),
  },
  {
    id: "fullbody",
    name: "Full Body",
    icon: "🔥",
    color: "#00D2D3",
    exercises: EXERCISES.filter((ex) => ex.muscleGroup === "Full Body"),
  },
]

export const getCategoryById = (id: string): ExerciseCategory | undefined => {
  return EXERCISE_CATEGORIES.find((category) => category.id === id)
}

export const getExercisesByCategory = (categoryId: string): Exercise[] => {
  const category = getCategoryById(categoryId)
  return category ? category.exercises : []
}
