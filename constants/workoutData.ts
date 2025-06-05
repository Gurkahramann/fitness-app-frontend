// Types matching your backend models
export interface Exercise {
  id: number
  name: string
  type: "cardio" | "strength"
  muscleGroup: string
  videoUrl: string
  instructions: string[]
  tips: string[]
  duration: string
  calories: string
  image: string
}

export interface ExerciseSet {
  id: number
  setNo: number
  reps?: number
  weight?: number
  rpe?: number
  durationSec?: number
}

export interface ExerciseEntry {
  id: number
  exercise: Exercise
  orderIndex: number
  exerciseSets: ExerciseSet[]
}

export interface WorkoutDay {
  id: number
  userId: string
  date: string // YYYY-MM-DD
  exerciseEntries: ExerciseEntry[]
}

export interface WorkoutProgram {
  id: number
  title: string
  slug: string
  description: string
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  durationWeeks: number
  coverImageUrl: string
  thumbnailUrl: string
  tags: string[]
  days: WorkoutDay[]
  createdBy: string
  likes: string[]
  isPublic: boolean
  exercises: Exercise[]
  createdAt: string
  updatedAt: string
}

// Mock exercises database
export const EXERCISES: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://example.com/pushups.mp4",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulders",
      "Keep your body in a straight line from head to heels",
      "Lower your chest toward the floor by bending your elbows",
      "Push back up to the starting position",
      "Keep your core engaged throughout the movement"
    ],
    tips: [
      "Don't let your hips sag or pike up",
      "Keep elbows at 45-degree angle",
      "Modify on knees if needed"
    ],
    duration: "3 sets x 10-15 reps",
    calories: "5-8 cal/min",
    image: "https://via.placeholder.com/80x80/33A8FF/FFFFFF?text=PU"
  },
  {
    id: 2,
    name: "Squats",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://example.com/squats.mp4",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and core engaged",
      "Lower your body by bending at hips and knees",
      "Go down until thighs are parallel to floor",
      "Push through your heels to return to start",
      "Keep knees in line with toes"
    ],
    tips: [
      "Don't let knees cave inward",
      "Keep weight on your heels",
      "Go only as low as comfortable"
    ],
    duration: "3 sets x 15-20 reps",
    calories: "6-10 cal/min",
    image: "https://via.placeholder.com/80x80/33A8FF/FFFFFF?text=SQ"
  },
  {
    id: 3,
    name: "Jumping Jacks",
    type: "cardio",
    muscleGroup: "Full Body",
    videoUrl: "https://example.com/jumpingjacks.mp4",
    instructions: [
      "Stand upright with your legs together, arms at your sides",
      "Bend your knees slightly, and jump into the air",
      "As you jump, spread your legs to be about shoulder-width apart",
      "Stretch your arms out and over your head",
      "Jump back to starting position",
      "Repeat for the specified duration"
    ],
    tips: [
      "Keep your core engaged throughout the movement",
      "Land softly on the balls of your feet",
      "Maintain a steady rhythm"
    ],
    duration: "3 sets x 30 seconds",
    calories: "8-12 cal/min",
    image: "https://via.placeholder.com/80x80/FF5733/FFFFFF?text=JJ"
  },
  {
    id: 4,
    name: "Plank",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://example.com/plank.mp4",
    instructions: [
      "Start in a push-up position",
      "Lower down to your forearms",
      "Keep your body in a straight line",
      "Engage your core and glutes",
      "Hold the position for specified time",
      "Breathe normally throughout"
    ],
    tips: [
      "Don't let hips sag or pike up",
      "Keep shoulders over elbows",
      "Focus on quality over duration"
    ],
    duration: "3 sets x 30-60 seconds",
    calories: "3-5 cal/min",
    image: "https://via.placeholder.com/80x80/33A8FF/FFFFFF?text=PL"
  },
  {
    id: 5,
    name: "Burpees",
    type: "cardio",
    muscleGroup: "Full Body",
    videoUrl: "https://example.com/burpees.mp4",
    instructions: [
      "Start in a standing position",
      "Drop into a squat position with hands on the ground",
      "Kick your feet back into a plank position",
      "Perform a push-up (optional)",
      "Jump your feet back to squat position",
      "Jump up with arms overhead"
    ],
    tips: [
      "Keep your core engaged throughout",
      "Land softly when jumping",
      "Modify by stepping back instead of jumping"
    ],
    duration: "3 sets x 10 reps",
    calories: "15-20 cal/min",
    image: "https://via.placeholder.com/80x80/FF5733/FFFFFF?text=BP"
  },
  {
    id: 6,
    name: "Mountain Climbers",
    type: "cardio",
    muscleGroup: "Core",
    videoUrl: "https://example.com/mountainclimbers.mp4",
    instructions: [
      "Start in a plank position",
      "Drive your knees toward your chest one at a time",
      "Keep your core tight and back flat",
      "Alternate legs quickly"
    ],
    tips: [
      "Keep hips low",
      "Move as fast as possible while maintaining form"
    ],
    duration: "3 sets x 30 seconds",
    calories: "10-14 cal/min",
    image: "https://via.placeholder.com/80x80/FF5733/FFFFFF?text=MC"
  },
  {
    id: 7,
    name: "Lunges",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://example.com/lunges.mp4",
    instructions: [
      "Stand upright, step forward with one leg",
      "Lower your hips until both knees are bent at about 90 degrees",
      "Push back to starting position and switch legs"
    ],
    tips: [
      "Keep your torso upright",
      "Don't let your knee go past your toes"
    ],
    duration: "3 sets x 10 reps",
    calories: "6-9 cal/min",
    image: "https://via.placeholder.com/80x80/33A8FF/FFFFFF?text=LU"
  },
  {
    id: 8,
    name: "High Knees",
    type: "cardio",
    muscleGroup: "Legs",
    videoUrl: "https://example.com/highknees.mp4",
    instructions: [
      "Stand tall with feet hip-width apart",
      "Place hands in front of you at hip level",
      "Quickly drive your right knee up to meet your right hand",
      "Bring your right foot back down and immediately drive your left knee up",
      "Continue alternating knees as quickly as possible",
      "Pump your arms to maintain momentum"
    ],
    tips: [
      "Keep your chest up and core tight",
      "Stay on the balls of your feet",
      "Drive knees up as high as possible"
    ],
    duration: "3 sets x 30 seconds",
    calories: "10-15 cal/min",
    image: "https://via.placeholder.com/80x80/FF5733/FFFFFF?text=HK"
  },
  {
    id: 9,
    name: "Steady-State Cardio",
    type: "cardio",
    muscleGroup: "Cardiovascular",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/steady.jpg",
    instructions: [
      "30 dk orta tempoda yürüyüş veya hafif koşu. RPE ~5/10.",
      "Hafta ilerledikçe süreyi artır."
    ],
    tips: [
      "Konuşma testini geçebilecek tempoda ol.",
      "Dik dur, nefesini kontrol et."
    ],
    duration: "30-40 dk",
    calories: "200-350 cal",
    image: "https://storage.googleapis.com/fitness-app-photos/steady.jpg"
  },
  {
    id: 10,
    name: "Interval Cardio",
    type: "cardio",
    muscleGroup: "Cardiovascular",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/interval.jpg",
    instructions: [
      "3 dk orta tempo + 1 dk hızlı ×6-8 set.",
      "Toplam süreyi ve set sayısını haftalara göre artır."
    ],
    tips: [
      "Orta tempoda nefesini kontrol et.",
      "Hızlı kısımlarda formunu bozma."
    ],
    duration: "30-40 dk",
    calories: "250-400 cal",
    image: "https://storage.googleapis.com/fitness-app-photos/interval.jpg"
  },
  {
    id: 11,
    name: "Incline Walk",
    type: "cardio",
    muscleGroup: "Cardiovascular",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/incline.jpg",
    instructions: [
      "30 dk %5 eğimde yürüyüş. RPE ~5-6/10.",
      "Hafta ilerledikçe süreyi artır."
    ],
    tips: [
      "Eğimli yürüyüşte adımını kısa tut.",
      "Dik dur, nefesini kontrol et."
    ],
    duration: "30-40 dk",
    calories: "220-370 cal",
    image: "https://storage.googleapis.com/fitness-app-photos/incline.jpg"
  },
  {
    id: 12,
    name: "Dumbbell Bench Press",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/db_bench.mp4",
    instructions: [
      "Bench'e sırt üstü uzan, dumbbell'ları göğüs hizasında tut.",
      "Dirsekleri 2 sn'de indir, 2 sn'de yukarı it.",
      "Hareket boyunca core'u sıkı tut."
    ],
    tips: [
      "Omuzları geride ve aşağıda tut.",
      "Ağırlıkları kontrollü indir/kaldır."
    ],
    duration: "3-4 set x 10-14 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/db_bench.jpg"
  },
  {
    id: 13,
    name: "Goblet Squat",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/goblet.mp4",
    instructions: [
      "Dumbbell veya kettlebell'i göğüs hizasında tut.",
      "Topuk yerde, core sıkı, dizler dışarı.",
      "Kalçayı geriye ve aşağıya indir."
    ],
    tips: [
      "Dizler parmak ucunu geçmesin.",
      "Sırtı düz tut."
    ],
    duration: "3-4 set x 10-14 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/goblet.jpg"
  },
  {
    id: 14,
    name: "Bent-Over Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/row.mp4",
    instructions: [
      "Dizleri hafif bük, öne eğil, sırt düz.",
      "Dumbbell veya bandı karına doğru çek.",
      "Kürek kemiklerini sık."
    ],
    tips: [
      "Boyun nötr pozisyonda.",
      "Hareketi kontrollü yap."
    ],
    duration: "3-4 set x 10-14 reps",
    calories: "6-9 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/row.jpg"
  },
  {
    id: 15,
    name: "Dumbbell Romanian Deadlift",
    type: "strength",
    muscleGroup: "Hamstrings/Glutes",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/rdl.mp4",
    instructions: [
      "Dumbbell'ları uyluk önünde tut.",
      "Kalçayı geriye vererek öne eğil.",
      "Sırtı düz, dizler hafif bükülü."
    ],
    tips: [
      "Ağırlığı topuklara ver.",
      "Bel çukurunu koru."
    ],
    duration: "2-4 set x 10-12 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/rdl.jpg"
  },
  {
    id: 16,
    name: "Dumbbell Shoulder Press",
    type: "strength",
    muscleGroup: "Shoulders",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/shoulder_press.mp4",
    instructions: [
      "Dumbbell'ları omuz hizasında tut.",
      "Dirsekleri düz yukarı it.",
      "Oturur pozisyonda stabiliteyi koru."
    ],
    tips: [
      "Bel boşluğunu artırma.",
      "Ağırlıkları kontrollü indir."
    ],
    duration: "2-4 set x 10-12 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/shoulder_press.jpg"
  },
  {
    id: 17,
    name: "Barbell Bench Press",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/bench.mp4",
    instructions: [
      "Bench'e sırt üstü uzan, barı göğüs hizasında tut.",
      "Dirsekleri 2 sn'de indir, 2 sn'de yukarı it.",
      "Hareket boyunca core'u sıkı tut."
    ],
    tips: [
      "Omuzları geride ve aşağıda tut.",
      "Ağırlıkları kontrollü indir/kaldır."
    ],
    duration: "4 set x 8-10 reps",
    calories: "7-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/bench.jpg"
  },
  {
    id: 18,
    name: "Bent-Over Barbell Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/row.mp4",
    instructions: [
      "Dizleri hafif bük, öne eğil, sırt düz.",
      "Barı karına doğru çek.",
      "Kürek kemiklerini sık."
    ],
    tips: [
      "Boyun nötr pozisyonda.",
      "Hareketi kontrollü yap."
    ],
    duration: "4 set x 8-10 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/row.jpg"
  },
  {
    id: 19,
    name: "Dumbbell Incline Press",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/incline.mp4",
    instructions: [
      "Bench'i 30-45° eğime ayarla.",
      "Dumbbell'ları göğüs hizasında tut, yukarı it."
    ],
    tips: [
      "Omuzları geride tut.",
      "Ağırlıkları kontrollü indir."
    ],
    duration: "3 set x 10-12 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/incline.jpg"
  },
  {
    id: 20,
    name: "Seated Cable Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/cablerow.mp4",
    instructions: [
      "Makinede otur, kolları öne uzat.",
      "Kolları karına doğru çek, sırtı düz tut."
    ],
    tips: [
      "Omuzları geride tut.",
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 10-12 reps",
    calories: "6-9 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/cablerow.jpg"
  },
  {
    id: 21,
    name: "Dumbbell Lateral Raise",
    type: "strength",
    muscleGroup: "Shoulders",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/lateralraise.mp4",
    instructions: [
      "Dumbbell'ları yanlara doğru kaldır.",
      "Dirsekleri hafif bükülü tut."
    ],
    tips: [
      "Ağırlığı kontrollü indir.",
      "Omuzları sıkıştırma."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/lateralraise.jpg"
  },
  {
    id: 22,
    name: "Face-Pull",
    type: "strength",
    muscleGroup: "Upper Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/facepull.mp4",
    instructions: [
      "Kabloyu yüz hizasına çek.",
      "Dirsekleri dışarı aç."
    ],
    tips: [
      "Boyun nötr pozisyonda.",
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/facepull.jpg"
  },
  {
    id: 23,
    name: "Plank Shoulder Tap",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/planktap.mp4",
    instructions: [
      "Plank pozisyonunda, bir elinle karşı omuza dokun.",
      "Core'u sıkı tut, kalçayı sabit tut."
    ],
    tips: [
      "Kalçayı oynatma.",
      "Nefesini kontrol et."
    ],
    duration: "2 set x 40 sn",
    calories: "4-6 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/planktap.jpg"
  },
  {
    id: 24,
    name: "Back Squat",
    type: "strength",
    muscleGroup: "Quads",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/squat.mp4",
    instructions: [
      "Barı trapez kasına yerleştir.",
      "Kalçayı geriye ve aşağıya indir, topuk yerde."
    ],
    tips: [
      "Dizler dışarı.",
      "Sırtı düz tut."
    ],
    duration: "4 set x 6-8 reps",
    calories: "7-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/squat.jpg"
  },
  {
    id: 25,
    name: "Romanian Deadlift",
    type: "strength",
    muscleGroup: "Hamstrings/Glutes",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/rdl.mp4",
    instructions: [
      "Barı uyluk önünde tut.",
      "Kalçayı geriye vererek öne eğil."
    ],
    tips: [
      "Ağırlığı topuklara ver.",
      "Bel çukurunu koru."
    ],
    duration: "4 set x 8-10 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/rdl.jpg"
  },
  {
    id: 26,
    name: "Walking Lunge",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/lunge.mp4",
    instructions: [
      "Dumbbell'ları elinde tut, ileri adım at."
    ],
    tips: [
      "Diz yere değmesin.",
      "Gövde dik olsun."
    ],
    duration: "3 set x 12 adım",
    calories: "6-9 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/lunge.jpg"
  },
  {
    id: 27,
    name: "Hip Thrust",
    type: "strength",
    muscleGroup: "Glutes",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/hipthrust.mp4",
    instructions: [
      "Sırtını bench'e yasla, barı kalçanın üstüne yerleştir.",
      "Kalçayı yukarı it."
    ],
    tips: [
      "Üstte 1 sn sık.",
      "Topuklardan güç al."
    ],
    duration: "3 set x 10-12 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/hipthrust.jpg"
  },
  {
    id: 28,
    name: "Leg Curl",
    type: "strength",
    muscleGroup: "Hamstrings",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/legcurl.mp4",
    instructions: [
      "Makinede veya band ile bacak bük."
    ],
    tips: [
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/legcurl.jpg"
  },
  {
    id: 29,
    name: "Standing Calf Raise",
    type: "strength",
    muscleGroup: "Calves",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/calfraise.mp4",
    instructions: [
      "Ayak parmak ucunda yüksel."
    ],
    tips: [
      "Üstte 1 sn bekle."
    ],
    duration: "3 set x 15-20 reps",
    calories: "4-7 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/calfraise.jpg"
  },
  {
    id: 30,
    name: "Hollow Hold",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/hollowhold.mp4",
    instructions: [
      "Sırtını yere yapıştır, bacak ve kolları kaldır."
    ],
    tips: [
      "Bel boşluğunu kapat."
    ],
    duration: "3 set x 30 sn",
    calories: "4-6 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/hollowhold.jpg"
  },
  {
    id: 31,
    name: "HIIT Intervals",
    type: "cardio",
    muscleGroup: "Cardiovascular",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/hiit.mp4",
    instructions: [
      "5 tur: 40 sn yüksek tempo, 80 sn düşük tempo."
    ],
    tips: [
      "Yüksek tempoda formu bozma."
    ],
    duration: "5 set x 40 sn",
    calories: "12-18 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/hiit.jpg"
  },
  {
    id: 32,
    name: "Standing Military Press",
    type: "strength",
    muscleGroup: "Shoulders",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/militarypress.mp4",
    instructions: [
      "Barı omuz hizasında tut, baş üstüne it.",
      "Core'u sıkı tut."
    ],
    tips: [
      "Bel boşluğunu artırma.",
      "Ağırlıkları kontrollü indir."
    ],
    duration: "4 set x 6-8 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/militarypress.jpg"
  },
  {
    id: 33,
    name: "Weighted Dip",
    type: "strength",
    muscleGroup: "Chest/Triceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/dip.mp4",
    instructions: [
      "Paralel barlarda vücut ağırlığıyla veya ek ağırlıkla dip yap.",
      "Dirsekleri geriye bük, gövde hafif öne."
    ],
    tips: [
      "Omuzları aşağıda tut.",
      "Tam kilitleme yapma."
    ],
    duration: "3 set x 8-10 reps",
    calories: "7-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/dip.jpg"
  },
  {
    id: 34,
    name: "Cable Fly",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/cablefly.mp4",
    instructions: [
      "Kabloyu göğüs hizasında birleştir.",
      "Kollar hafif bükülü."
    ],
    tips: [
      "Hareketi kontrollü yap.",
      "Omuzları sıkıştırma."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/cablefly.jpg"
  },
  {
    id: 35,
    name: "Overhead Rope Triceps Extension",
    type: "strength",
    muscleGroup: "Triceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/ropeext.mp4",
    instructions: [
      "Kabloyu baş üstünde tut, dirsekten aç."
    ],
    tips: [
      "Dirsekleri sabit tut.",
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/ropeext.jpg"
  },
  {
    id: 36,
    name: "Copenhagen Plank",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/copenhagen.mp4",
    instructions: [
      "Yan plank pozisyonunda üst bacağı yükselt.",
      "Core'u sıkı tut."
    ],
    tips: [
      "Kalçayı sabit tut.",
      "Nefesini kontrol et."
    ],
    duration: "3 set x 40 sn",
    calories: "4-7 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/copenhagen.jpg"
  },
  {
    id: 37,
    name: "Deadlift",
    type: "strength",
    muscleGroup: "Back/Glutes",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/deadlift.mp4",
    instructions: [
      "Barı yerden kaldır, sırt düz, core sıkı."
    ],
    tips: [
      "Barı vücuda yakın tut.",
      "Hareketi kontrollü yap."
    ],
    duration: "4 set x 4-6 reps",
    calories: "10-16 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/deadlift.jpg"
  },
  {
    id: 38,
    name: "Weighted Pull-Up",
    type: "strength",
    muscleGroup: "Back/Biceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/pullup.mp4",
    instructions: [
      "Barfiks barında ağırlıkla veya vücut ağırlığıyla çekiş yap."
    ],
    tips: [
      "Çeneyi barın üstüne çıkar.",
      "Kontrollü in."
    ],
    duration: "4 set x 6-8 reps",
    calories: "8-13 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/pullup.jpg"
  },
  {
    id: 39,
    name: "Pendlay Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/pendlay.mp4",
    instructions: [
      "Barı yerden çek, her tekrarda yere bırak."
    ],
    tips: [
      "Sırtı düz tut.",
      "Patlayıcı çek."
    ],
    duration: "4 set x 8-10 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/pendlay.jpg"
  },
  {
    id: 40,
    name: "Chest-Supported DB Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/dbrow.mp4",
    instructions: [
      "Eğimli bench'te göğüs destekli dumbbell row yap."
    ],
    tips: [
      "Sırtı düz tut.",
      "Kontrollü indir."
    ],
    duration: "3 set x 10-12 reps",
    calories: "6-9 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/dbrow.jpg"
  },
  {
    id: 41,
    name: "Barbell Curl",
    type: "strength",
    muscleGroup: "Biceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/curl.mp4",
    instructions: [
      "Barı alt koldan bükerek kaldır."
    ],
    tips: [
      "Dirsekleri sabit tut.",
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 10-12 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/curl.jpg"
  },
  {
    id: 42,
    name: "Hanging Leg Raise",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/legraise.mp4",
    instructions: [
      "Barfiks barında asılıyken bacakları yukarı kaldır."
    ],
    tips: [
      "Bel boşluğunu kapat.",
      "Kontrollü indir."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/legraise.jpg"
  },
  {
    id: 43,
    name: "Bulgarian Split Squat",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/bulgarian.mp4",
    instructions: [
      "Bir ayağı bench'e koy, diğeriyle squat yap."
    ],
    tips: [
      "Diz parmak ucunu geçmesin.",
      "Dengeyi koru."
    ],
    duration: "3 set x 10 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/bulgarian.jpg"
  },
  {
    id: 44,
    name: "Leg Press",
    type: "strength",
    muscleGroup: "Legs",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/legpress.mp4",
    instructions: [
      "Makinede bacakları it."
    ],
    tips: [
      "Dizleri kilitleme.",
      "Sırtı makineye yapıştır."
    ],
    duration: "3 set x 12 reps",
    calories: "7-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/legpress.jpg"
  },
  {
    id: 45,
    name: "Seated Leg Curl",
    type: "strength",
    muscleGroup: "Hamstrings",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/seatedcurl.mp4",
    instructions: [
      "Makinede otur, bacakları bük."
    ],
    tips: [
      "Hareketi kontrollü yap."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/seatedcurl.jpg"
  },
  {
    id: 46,
    name: "Ab-Wheel Roll-Out",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/abwheel.mp4",
    instructions: [
      "Ab-wheel ile ileriye doğru açıl."
    ],
    tips: [
      "Bel boşluğunu koru.",
      "Core'u sıkı tut."
    ],
    duration: "3 set x 10-12 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/abwheel.jpg"
  },
  {
    id: 47,
    name: "Close-Grip Bench Press",
    type: "strength",
    muscleGroup: "Chest/Triceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/closegrip.mp4",
    instructions: [
      "Bench'te elleri dar tutarak press yap."
    ],
    tips: [
      "Dirsekleri vücuda yakın tut.",
      "Kontrollü indir."
    ],
    duration: "4 set x 8-10 reps",
    calories: "7-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/closegrip.jpg"
  },
  {
    id: 48,
    name: "Arnold Press",
    type: "strength",
    muscleGroup: "Shoulders",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/arnold.mp4",
    instructions: [
      "Dumbbell'ları önde başlat, yukarı çevirerek press yap."
    ],
    tips: [
      "Bel boşluğunu artırma.",
      "Kontrollü indir."
    ],
    duration: "4 set x 8-10 reps",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/arnold.jpg"
  },
  {
    id: 49,
    name: "Rack Pull",
    type: "strength",
    muscleGroup: "Back/Glutes",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/rackpull.mp4",
    instructions: [
      "Barı diz hizasından kaldır."
    ],
    tips: [
      "Barı vücuda yakın tut.",
      "Kontrollü yap."
    ],
    duration: "3 set x 3 reps",
    calories: "10-16 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/rackpull.jpg"
  },
  {
    id: 50,
    name: "Meadows Row",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/meadows.mp4",
    instructions: [
      "Landmine bar ile tek kol row yap."
    ],
    tips: [
      "Sırtı düz tut.",
      "Kontrollü çek."
    ],
    duration: "3 set x 10 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/meadows.jpg"
  },
  {
    id: 51,
    name: "HIIT Sprint",
    type: "cardio",
    muscleGroup: "Cardio",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/hiit.mp4",
    instructions: [
      "8 tur: 30 sn sprint, 60 sn yürüyüş."
    ],
    tips: [
      "Yüksek tempoda formu bozma."
    ],
    duration: "8 set x 30 sn",
    calories: "14-20 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/hiit.jpg"
  },
  {
    id: 52,
    name: "Cable Wood-Chop",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/woodchop.mp4",
    instructions: [
      "Kabloyu çapraz çekerek core'u çalıştır."
    ],
    tips: [
      "Bel boşluğunu koru."
    ],
    duration: "3 set x 15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/woodchop.jpg"
  },
  {
    id: 53,
    name: "Swiss-Ball Crunch",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/swisscrunch.mp4",
    instructions: [
      "Swiss ball üzerinde crunch yap."
    ],
    tips: [
      "Core'u sıkı tut."
    ],
    duration: "3 set x 20 reps",
    calories: "4-7 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/swisscrunch.jpg"
  },
  {
    id: 54,
    name: "Skull Crusher",
    type: "strength",
    muscleGroup: "Triceps",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/skullcrusher.mp4",
    instructions: [
      "Bench'e sırt üstü uzan, barı baş hizasında tut.",
      "Dirsekten bükerek barı başa doğru indir.",
      "Dirsekleri sabit tutarak tekrar yukarı kaldır."
    ],
    tips: [
      "Dirsekleri sabit tut.",
      "Ağırlığı kontrollü indir/kaldır."
    ],
    duration: "3 set x 10-12 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/skullcrusher.jpg"
  },
  {
    id: 55,
    name: "Pallof Press",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/pallof.mp4",
    instructions: [
      "Kabloyu göğüs hizasında iki elle tut.",
      "Kolları öne doğru uzat, core'u sıkı tut.",
      "Yavaşça geri çek."
    ],
    tips: [
      "Kalçayı sabit tut.",
      "Nefesini kontrol et."
    ],
    duration: "3 set x 15 sn",
    calories: "3-5 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/pallof.jpg"
  },
  {
    id: 56,
    name: "Lat-Pulldown",
    type: "strength",
    muscleGroup: "Back",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/latpulldown.mp4",
    instructions: [
      "Makinede barı geniş tutuşla kavra.",
      "Barı göğüs hizasına çek.",
      "Kontrollü bırak."
    ],
    tips: [
      "Omuzları aşağıda tut.",
      "Sırtı düz tut."
    ],
    duration: "3 set x 12-15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/latpulldown.jpg"
  },
  {
    id: 57,
    name: "Hanging Knee Raise",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/kneeraise.mp4",
    instructions: [
      "Barfiks barında asılıyken dizleri yukarı çek.",
      "Kontrollü indir."
    ],
    tips: [
      "Bel boşluğunu kapat.",
      "Sallanmadan yap."
    ],
    duration: "3 set x 15 reps",
    calories: "5-8 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/kneeraise.jpg"
  },
  {
    id: 58,
    name: "Continuous Run",
    type: "cardio",
    muscleGroup: "Cardio",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/run.mp4",
    instructions: [
      "Koşu bandında/parkurda 45 dk orta tempoda koş.",
      "%70 HR_max hedefle."
    ],
    tips: [
      "Dik dur.",
      "Nefesini kontrol et."
    ],
    duration: "1 set x 45 dk",
    calories: "350-600 cal",
    image: "https://storage.googleapis.com/fitness-app-photos/run.jpg"
  },
  {
    id: 59,
    name: "DB Thruster",
    type: "strength",
    muscleGroup: "Full Body",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/thruster.mp4",
    instructions: [
      "Dumbbell'ları omuzda tut, squat yap ve yukarı kalkarken press yap."
    ],
    tips: [
      "Core'u sıkı tut.",
      "Hareketi akıcı yap."
    ],
    duration: "4 set x 8-10 reps",
    calories: "8-12 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/thruster.jpg"
  },
  {
    id: 60,
    name: "Push-up (plate)",
    type: "strength",
    muscleGroup: "Chest",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/pushup_plate.mp4",
    instructions: [
      "Sırtına plate koyarak şınav çek."
    ],
    tips: [
      "Core'u sıkı tut.",
      "Plate'i sabit tut."
    ],
    duration: "4 set x AMRAP",
    calories: "6-10 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/pushup_plate.jpg"
  },
  {
    id: 61,
    name: "Renegade Row",
    type: "strength",
    muscleGroup: "Back/Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/renegade.mp4",
    instructions: [
      "Plank pozisyonunda dumbbell ile tek kolla row yap."
    ],
    tips: [
      "Core'u sıkı tut.",
      "Kalçayı sabit tut."
    ],
    duration: "4 set x 12 reps",
    calories: "7-11 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/renegade.jpg"
  },
  {
    id: 62,
    name: "Battle Rope Slam",
    type: "cardio",
    muscleGroup: "Full Body",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/battlerope.mp4",
    instructions: [
      "Battle rope'u iki elle yere vur."
    ],
    tips: [
      "Dizleri hafif bük.",
      "Core'u sıkı tut."
    ],
    duration: "4 set x 30 sn",
    calories: "10-16 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/battlerope.jpg"
  },
  {
    id: 63,
    name: "V-Sit",
    type: "strength",
    muscleGroup: "Core",
    videoUrl: "https://storage.googleapis.com/fitness-app-photos/vsit.mp4",
    instructions: [
      "Yere otur, bacakları ve gövdeyi V pozisyonunda kaldır."
    ],
    tips: [
      "Bel boşluğunu kapat.",
      "Dizleri bükmeden yap."
    ],
    duration: "3 set x 20 reps",
    calories: "4-7 cal/min",
    image: "https://storage.googleapis.com/fitness-app-photos/vsit.jpg"
  }
]
export const getExerciseById = (id: number): Exercise | undefined => {
  return EXERCISES.find((exercise) => exercise.id === id)
}
// Mock workout programs with proper relational structure
export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 1,
    title: "Beginner Full Body",
    slug: "beginner-full-body",
    description:
      "Perfect for those starting their fitness journey. A comprehensive 4-week program focusing on basic movements and building strength foundation.",
    difficulty: "BEGINNER",
    durationWeeks: 4,
    coverImageUrl: "https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Beginner",
    thumbnailUrl: "https://via.placeholder.com/120x160/33FF57/FFFFFF?text=Beginner",
    tags: ["beginner", "full-body", "strength", "foundation"],
    days: [
      {
        id: 1,
        userId: "user123",
        date: "2024-01-01", // Week 1, Day 1
        exerciseEntries: [
          {
            id: 1,
            exercise: EXERCISES[0], // Push-ups
            orderIndex: 1,
            exerciseSets: [
              { id: 1, setNo: 1, reps: 8, weight: 0, rpe: 6, durationSec: 0 },
              { id: 2, setNo: 2, reps: 8, weight: 0, rpe: 7, durationSec: 0 },
              { id: 3, setNo: 3, reps: 6, weight: 0, rpe: 8, durationSec: 0 },
            ],
          },
          {
            id: 2,
            exercise: EXERCISES[1], // Squats
            orderIndex: 2,
            exerciseSets: [
              { id: 4, setNo: 1, reps: 12, weight: 0, rpe: 5, durationSec: 0 },
              { id: 5, setNo: 2, reps: 12, weight: 0, rpe: 6, durationSec: 0 },
              { id: 6, setNo: 3, reps: 10, weight: 0, rpe: 7, durationSec: 0 },
            ],
          },
          {
            id: 3,
            exercise: EXERCISES[3], // Plank
            orderIndex: 3,
            exerciseSets: [
              { id: 7, setNo: 1, reps: 0, weight: 0, rpe: 6, durationSec: 30 },
              { id: 8, setNo: 2, reps: 0, weight: 0, rpe: 7, durationSec: 30 },
              { id: 9, setNo: 3, reps: 0, weight: 0, rpe: 8, durationSec: 25 },
            ],
          },
        ],
      },
      {
        id: 2,
        userId: "user123",
        date: "2024-01-03", // Week 1, Day 3
        exerciseEntries: [
          {
            id: 4,
            exercise: EXERCISES[2], // Jumping Jacks
            orderIndex: 1,
            exerciseSets: [
              { id: 10, setNo: 1, reps: 20, weight: 0, rpe: 5, durationSec: 0 },
              { id: 11, setNo: 2, reps: 20, weight: 0, rpe: 6, durationSec: 0 },
              { id: 12, setNo: 3, reps: 15, weight: 0, rpe: 7, durationSec: 0 },
            ],
          },
          {
            id: 5,
            exercise: EXERCISES[6], // Lunges
            orderIndex: 2,
            exerciseSets: [
              { id: 13, setNo: 1, reps: 10, weight: 0, rpe: 6, durationSec: 0 },
              { id: 14, setNo: 2, reps: 10, weight: 0, rpe: 7, durationSec: 0 },
              { id: 15, setNo: 3, reps: 8, weight: 0, rpe: 8, durationSec: 0 },
            ],
          },
        ],
      },
    ],
    createdBy: "trainer123",
    likes: ["user1", "user2", "user3"],
    isPublic: true,
    exercises: [EXERCISES[0], EXERCISES[1], EXERCISES[2], EXERCISES[3], EXERCISES[6]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Cardio Blast",
    slug: "cardio-blast",
    description: "High-intensity cardio workouts to boost your cardiovascular health and burn calories effectively.",
    difficulty: "INTERMEDIATE",
    durationWeeks: 6,
    coverImageUrl: "https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Cardio",
    thumbnailUrl: "https://via.placeholder.com/120x160/FF5733/FFFFFF?text=Cardio",
    tags: ["cardio", "hiit", "fat-burn", "endurance"],
    days: [
      {
        id: 3,
        userId: "user123",
        date: "2024-01-01",
        exerciseEntries: [
          {
            id: 6,
            exercise: EXERCISES[2], // Jumping Jacks
            orderIndex: 1,
            exerciseSets: [
              { id: 16, setNo: 1, reps: 30, weight: 0, rpe: 7, durationSec: 0 },
              { id: 17, setNo: 2, reps: 30, weight: 0, rpe: 8, durationSec: 0 },
              { id: 18, setNo: 3, reps: 25, weight: 0, rpe: 9, durationSec: 0 },
            ],
          },
          {
            id: 7,
            exercise: EXERCISES[4], // Burpees
            orderIndex: 2,
            exerciseSets: [
              { id: 19, setNo: 1, reps: 8, weight: 0, rpe: 8, durationSec: 0 },
              { id: 20, setNo: 2, reps: 8, weight: 0, rpe: 9, durationSec: 0 },
              { id: 21, setNo: 3, reps: 6, weight: 0, rpe: 9, durationSec: 0 },
            ],
          },
          {
            id: 8,
            exercise: EXERCISES[7], // High Knees
            orderIndex: 3,
            exerciseSets: [
              { id: 22, setNo: 1, reps: 0, weight: 0, rpe: 7, durationSec: 45 },
              { id: 23, setNo: 2, reps: 0, weight: 0, rpe: 8, durationSec: 45 },
              { id: 24, setNo: 3, reps: 0, weight: 0, rpe: 8, durationSec: 40 },
            ],
          },
        ],
      },
    ],
    createdBy: "trainer456",
    likes: ["user4", "user5"],
    isPublic: true,
    exercises: [EXERCISES[2], EXERCISES[4], EXERCISES[5], EXERCISES[7]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    title: "Strength Builder",
    slug: "strength-builder",
    description: "Advanced strength training program designed to build muscle mass and increase overall strength.",
    difficulty: "ADVANCED",
    durationWeeks: 8,
    coverImageUrl: "https://via.placeholder.com/400x300/33A8FF/FFFFFF?text=Strength",
    thumbnailUrl: "https://via.placeholder.com/120x160/33A8FF/FFFFFF?text=Strength",
    tags: ["strength", "muscle-building", "advanced", "powerlifting"],
    days: [
      {
        id: 4,
        userId: "user123",
        date: "2024-01-01",
        exerciseEntries: [
          {
            id: 9,
            exercise: EXERCISES[0], // Push-ups
            orderIndex: 1,
            exerciseSets: [
              { id: 25, setNo: 1, reps: 15, weight: 0, rpe: 7, durationSec: 0 },
              { id: 26, setNo: 2, reps: 15, weight: 0, rpe: 8, durationSec: 0 },
              { id: 27, setNo: 3, reps: 12, weight: 0, rpe: 9, durationSec: 0 },
              { id: 28, setNo: 4, reps: 10, weight: 0, rpe: 9, durationSec: 0 },
            ],
          },
          {
            id: 10,
            exercise: EXERCISES[1], // Squats
            orderIndex: 2,
            exerciseSets: [
              { id: 29, setNo: 1, reps: 20, weight: 0, rpe: 6, durationSec: 0 },
              { id: 30, setNo: 2, reps: 20, weight: 0, rpe: 7, durationSec: 0 },
              { id: 31, setNo: 3, reps: 18, weight: 0, rpe: 8, durationSec: 0 },
              { id: 32, setNo: 4, reps: 15, weight: 0, rpe: 9, durationSec: 0 },
            ],
          },
        ],
      },
    ],
    createdBy: "trainer789",
    likes: ["user6", "user7", "user8", "user9"],
    isPublic: true,
    exercises: [EXERCISES[0], EXERCISES[1], EXERCISES[3], EXERCISES[6]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    title: "Full-Body Beginner",
    slug: "fullbody-beginner",
    description: "Haftada 3 gün, tam vücut direnç + hafif kardiyo ile kuvvet ve hipertrofi temelleri.",
    difficulty: "BEGINNER",
    durationWeeks: 4,
    coverImageUrl: "https://storage.googleapis.com/fitness-app-photos/fullbody_cover.jpg",
    thumbnailUrl: "https://storage.googleapis.com/fitness-app-photos/fullbody_thumb.jpg",
    tags: ["fullbody", "beginner", "strength"],
    days: [
      // Hafta 1 - Pazartesi
      {
        id: 1,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 1, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 1, setNo: 1, reps: 12 }, { id: 2, setNo: 2, reps: 12 }, { id: 3, setNo: 3, reps: 12 } ] },
          { id: 2, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 4, setNo: 1, reps: 12 }, { id: 5, setNo: 2, reps: 12 }, { id: 6, setNo: 3, reps: 12 } ] },
          { id: 3, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 7, setNo: 1, reps: 12 }, { id: 8, setNo: 2, reps: 12 }, { id: 9, setNo: 3, reps: 12 } ] },
          { id: 4, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 10, setNo: 1, reps: 12 }, { id: 11, setNo: 2, reps: 12 } ] },
          { id: 5, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 12, setNo: 1, durationSec: 30 }, { id: 13, setNo: 2, durationSec: 30 } ] },
          { id: 6, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 14, setNo: 1, durationSec: 600 } ] }
        ]
      },
      // Hafta 1 - Çarşamba
      {
        id: 2,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 15, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 16, setNo: 1, reps: 12 }, { id: 17, setNo: 2, reps: 12 }, { id: 18, setNo: 3, reps: 12 } ] },
          { id: 16, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 19, setNo: 1, reps: 12 }, { id: 20, setNo: 2, reps: 12 }, { id: 21, setNo: 3, reps: 12 } ] },
          { id: 17, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 22, setNo: 1, reps: 12 }, { id: 23, setNo: 2, reps: 12 }, { id: 24, setNo: 3, reps: 12 } ] },
          { id: 18, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 25, setNo: 1, reps: 12 }, { id: 26, setNo: 2, reps: 12 } ] },
          { id: 19, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 27, setNo: 1, durationSec: 30 }, { id: 28, setNo: 2, durationSec: 30 } ] },
          { id: 20, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 29, setNo: 1, durationSec: 600 } ] }
        ]
      },
      // Hafta 1 - Cuma
      {
        id: 3,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 30, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 31, setNo: 1, reps: 12 }, { id: 32, setNo: 2, reps: 12 }, { id: 33, setNo: 3, reps: 12 } ] },
          { id: 31, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 34, setNo: 1, reps: 12 }, { id: 35, setNo: 2, reps: 12 }, { id: 36, setNo: 3, reps: 12 } ] },
          { id: 32, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 37, setNo: 1, reps: 12 }, { id: 38, setNo: 2, reps: 12 }, { id: 39, setNo: 3, reps: 12 } ] },
          { id: 33, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 40, setNo: 1, reps: 12 }, { id: 41, setNo: 2, reps: 12 } ] },
          { id: 34, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 42, setNo: 1, durationSec: 30 }, { id: 43, setNo: 2, durationSec: 30 } ] },
          { id: 35, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 44, setNo: 1, durationSec: 600 } ] }
        ]
      },
      // Hafta 2 - Pazartesi (set/rep güncellenmiş)
      {
        id: 4,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 36, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 37, setNo: 1, reps: 14 }, { id: 38, setNo: 2, reps: 14 }, { id: 39, setNo: 3, reps: 12 } ] },
          { id: 37, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 40, setNo: 1, reps: 14 }, { id: 41, setNo: 2, reps: 14 }, { id: 42, setNo: 3, reps: 12 } ] },
          { id: 38, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 43, setNo: 1, reps: 14 }, { id: 44, setNo: 2, reps: 14 }, { id: 45, setNo: 3, reps: 12 } ] },
          { id: 39, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 46, setNo: 1, reps: 14 }, { id: 47, setNo: 2, reps: 12 } ] },
          { id: 40, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 48, setNo: 1, durationSec: 30 }, { id: 49, setNo: 2, durationSec: 30 } ] },
          { id: 41, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 50, setNo: 1, durationSec: 720 } ] }
        ]
      },
      // Hafta 2 - Çarşamba
      {
        id: 5,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 42, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 43, setNo: 1, reps: 14 }, { id: 44, setNo: 2, reps: 14 }, { id: 45, setNo: 3, reps: 12 } ] },
          { id: 43, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 46, setNo: 1, reps: 14 }, { id: 47, setNo: 2, reps: 14 }, { id: 48, setNo: 3, reps: 12 } ] },
          { id: 44, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 49, setNo: 1, reps: 14 }, { id: 50, setNo: 2, reps: 14 }, { id: 51, setNo: 3, reps: 12 } ] },
          { id: 45, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 52, setNo: 1, reps: 14 }, { id: 53, setNo: 2, reps: 12 } ] },
          { id: 46, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 54, setNo: 1, durationSec: 30 }, { id: 55, setNo: 2, durationSec: 30 } ] },
          { id: 47, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 56, setNo: 1, durationSec: 720 } ] }
        ]
      },
      // Hafta 2 - Cuma
      {
        id: 6,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 48, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 49, setNo: 1, reps: 14 }, { id: 50, setNo: 2, reps: 14 }, { id: 51, setNo: 3, reps: 12 } ] },
          { id: 49, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 52, setNo: 1, reps: 14 }, { id: 53, setNo: 2, reps: 14 }, { id: 54, setNo: 3, reps: 12 } ] },
          { id: 50, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 55, setNo: 1, reps: 14 }, { id: 56, setNo: 2, reps: 14 }, { id: 57, setNo: 3, reps: 12 } ] },
          { id: 51, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 58, setNo: 1, reps: 14 }, { id: 59, setNo: 2, reps: 12 } ] },
          { id: 52, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 60, setNo: 1, durationSec: 30 }, { id: 61, setNo: 2, durationSec: 30 } ] },
          { id: 53, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 62, setNo: 1, durationSec: 720 } ] }
        ]
      },
      // Hafta 3 - Pazartesi (4 set x 10)
      {
        id: 7,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 54, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 55, setNo: 1, reps: 10 }, { id: 56, setNo: 2, reps: 10 }, { id: 57, setNo: 3, reps: 10 }, { id: 58, setNo: 4, reps: 10 } ] },
          { id: 55, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 59, setNo: 1, reps: 10 }, { id: 60, setNo: 2, reps: 10 }, { id: 61, setNo: 3, reps: 10 }, { id: 62, setNo: 4, reps: 10 } ] },
          { id: 56, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 63, setNo: 1, reps: 10 }, { id: 64, setNo: 2, reps: 10 }, { id: 65, setNo: 3, reps: 10 }, { id: 66, setNo: 4, reps: 10 } ] },
          { id: 57, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 67, setNo: 1, reps: 10 }, { id: 68, setNo: 2, reps: 10 }, { id: 69, setNo: 3, reps: 10 }, { id: 70, setNo: 4, reps: 10 } ] },
          { id: 58, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 71, setNo: 1, durationSec: 30 }, { id: 72, setNo: 2, durationSec: 30 } ] },
          { id: 59, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 73, setNo: 1, durationSec: 780 } ] }
        ]
      },
      // Hafta 3 - Çarşamba
      {
        id: 8,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 60, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 61, setNo: 1, reps: 10 }, { id: 62, setNo: 2, reps: 10 }, { id: 63, setNo: 3, reps: 10 }, { id: 64, setNo: 4, reps: 10 } ] },
          { id: 61, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 65, setNo: 1, reps: 10 }, { id: 66, setNo: 2, reps: 10 }, { id: 67, setNo: 3, reps: 10 }, { id: 68, setNo: 4, reps: 10 } ] },
          { id: 62, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 69, setNo: 1, reps: 10 }, { id: 70, setNo: 2, reps: 10 }, { id: 71, setNo: 3, reps: 10 }, { id: 72, setNo: 4, reps: 10 } ] },
          { id: 63, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 73, setNo: 1, reps: 10 }, { id: 74, setNo: 2, reps: 10 }, { id: 75, setNo: 3, reps: 10 }, { id: 76, setNo: 4, reps: 10 } ] },
          { id: 64, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 77, setNo: 1, durationSec: 30 }, { id: 78, setNo: 2, durationSec: 30 } ] },
          { id: 65, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 79, setNo: 1, durationSec: 780 } ] }
        ]
      },
      // Hafta 3 - Cuma
      {
        id: 9,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 66, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 67, setNo: 1, reps: 10 }, { id: 68, setNo: 2, reps: 10 }, { id: 69, setNo: 3, reps: 10 }, { id: 70, setNo: 4, reps: 10 } ] },
          { id: 67, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 71, setNo: 1, reps: 10 }, { id: 72, setNo: 2, reps: 10 }, { id: 73, setNo: 3, reps: 10 }, { id: 74, setNo: 4, reps: 10 } ] },
          { id: 68, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 75, setNo: 1, reps: 10 }, { id: 76, setNo: 2, reps: 10 }, { id: 77, setNo: 3, reps: 10 }, { id: 78, setNo: 4, reps: 10 } ] },
          { id: 69, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 79, setNo: 1, reps: 10 }, { id: 80, setNo: 2, reps: 10 }, { id: 81, setNo: 3, reps: 10 }, { id: 82, setNo: 4, reps: 10 } ] },
          { id: 70, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 83, setNo: 1, durationSec: 30 }, { id: 84, setNo: 2, durationSec: 30 } ] },
          { id: 71, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 85, setNo: 1, durationSec: 780 } ] }
        ]
      },
      // Hafta 4 - Pazartesi (4 set x 12, kardiyo 15 dk)
      {
        id: 10,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 72, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 73, setNo: 1, reps: 12 }, { id: 74, setNo: 2, reps: 12 }, { id: 75, setNo: 3, reps: 12 }, { id: 76, setNo: 4, reps: 12 } ] },
          { id: 73, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 77, setNo: 1, reps: 12 }, { id: 78, setNo: 2, reps: 12 }, { id: 79, setNo: 3, reps: 12 }, { id: 80, setNo: 4, reps: 12 } ] },
          { id: 74, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 81, setNo: 1, reps: 12 }, { id: 82, setNo: 2, reps: 12 }, { id: 83, setNo: 3, reps: 12 }, { id: 84, setNo: 4, reps: 12 } ] },
          { id: 75, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 85, setNo: 1, reps: 12 }, { id: 86, setNo: 2, reps: 12 }, { id: 87, setNo: 3, reps: 12 }, { id: 88, setNo: 4, reps: 12 } ] },
          { id: 76, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 89, setNo: 1, durationSec: 30 }, { id: 90, setNo: 2, durationSec: 30 } ] },
          { id: 77, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 91, setNo: 1, durationSec: 900 } ] }
        ]
      },
      // Hafta 4 - Çarşamba
      {
        id: 11,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 78, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 79, setNo: 1, reps: 12 }, { id: 80, setNo: 2, reps: 12 }, { id: 81, setNo: 3, reps: 12 }, { id: 82, setNo: 4, reps: 12 } ] },
          { id: 79, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 83, setNo: 1, reps: 12 }, { id: 84, setNo: 2, reps: 12 }, { id: 85, setNo: 3, reps: 12 }, { id: 86, setNo: 4, reps: 12 } ] },
          { id: 80, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 87, setNo: 1, reps: 12 }, { id: 88, setNo: 2, reps: 12 }, { id: 89, setNo: 3, reps: 12 }, { id: 90, setNo: 4, reps: 12 } ] },
          { id: 81, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 91, setNo: 1, reps: 12 }, { id: 92, setNo: 2, reps: 12 }, { id: 93, setNo: 3, reps: 12 }, { id: 94, setNo: 4, reps: 12 } ] },
          { id: 82, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 95, setNo: 1, durationSec: 30 }, { id: 96, setNo: 2, durationSec: 30 } ] },
          { id: 83, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 97, setNo: 1, durationSec: 900 } ] }
        ]
      },
      // Hafta 4 - Cuma
      {
        id: 12,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 84, exercise: EXERCISES[11], orderIndex: 1, exerciseSets: [ { id: 85, setNo: 1, reps: 12 }, { id: 86, setNo: 2, reps: 12 }, { id: 87, setNo: 3, reps: 12 }, { id: 88, setNo: 4, reps: 12 } ] },
          { id: 85, exercise: EXERCISES[12], orderIndex: 2, exerciseSets: [ { id: 89, setNo: 1, reps: 12 }, { id: 90, setNo: 2, reps: 12 }, { id: 91, setNo: 3, reps: 12 }, { id: 92, setNo: 4, reps: 12 } ] },
          { id: 86, exercise: EXERCISES[13], orderIndex: 3, exerciseSets: [ { id: 93, setNo: 1, reps: 12 }, { id: 94, setNo: 2, reps: 12 }, { id: 95, setNo: 3, reps: 12 }, { id: 96, setNo: 4, reps: 12 } ] },
          { id: 87, exercise: EXERCISES[15], orderIndex: 4, exerciseSets: [ { id: 97, setNo: 1, reps: 12 }, { id: 98, setNo: 2, reps: 12 }, { id: 99, setNo: 3, reps: 12 }, { id: 100, setNo: 4, reps: 12 } ] },
          { id: 88, exercise: EXERCISES[3], orderIndex: 5, exerciseSets: [ { id: 101, setNo: 1, durationSec: 30 }, { id: 102, setNo: 2, durationSec: 30 } ] },
          { id: 89, exercise: EXERCISES[8], orderIndex: 6, exerciseSets: [ { id: 103, setNo: 1, durationSec: 900 } ] }
        ]
      }
    ],
    createdBy: "system",
    likes: [],
    isPublic: true,
    exercises: [EXERCISES[11], EXERCISES[12], EXERCISES[13], EXERCISES[15], EXERCISES[3], EXERCISES[8]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    title: "Split Intermediate",
    slug: "split-intermediate",
    description: "Üst/Alt bölünmüş antrenman: haftada 4 direnç + 1 kardiyo, 4 hafta boyunca güç ve kas gelişimi.",
    difficulty: "INTERMEDIATE",
    durationWeeks: 4,
    coverImageUrl: "https://storage.googleapis.com/fitness-app-photos/split_cover.jpg",
    thumbnailUrl: "https://storage.googleapis.com/fitness-app-photos/split_thumb.jpg",
    tags: ["upperlower", "intermediate", "split"],
    days: [
      // Hafta 1 - Pazartesi (Upper A)
      {
        id: 1,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 1, exercise: EXERCISES[16], orderIndex: 1, exerciseSets: [ { id: 1, setNo: 1, reps: 10 }, { id: 2, setNo: 2, reps: 10 }, { id: 3, setNo: 3, reps: 10 }, { id: 4, setNo: 4, reps: 10 } ] },
          { id: 2, exercise: EXERCISES[17], orderIndex: 2, exerciseSets: [ { id: 5, setNo: 1, reps: 10 }, { id: 6, setNo: 2, reps: 10 }, { id: 7, setNo: 3, reps: 10 }, { id: 8, setNo: 4, reps: 10 } ] },
          { id: 3, exercise: EXERCISES[18], orderIndex: 3, exerciseSets: [ { id: 9, setNo: 1, reps: 12 }, { id: 10, setNo: 2, reps: 12 }, { id: 11, setNo: 3, reps: 12 } ] },
          { id: 4, exercise: EXERCISES[19], orderIndex: 4, exerciseSets: [ { id: 12, setNo: 1, reps: 12 }, { id: 13, setNo: 2, reps: 12 }, { id: 14, setNo: 3, reps: 12 } ] },
          { id: 5, exercise: EXERCISES[20], orderIndex: 5, exerciseSets: [ { id: 15, setNo: 1, reps: 15 }, { id: 16, setNo: 2, reps: 15 }, { id: 17, setNo: 3, reps: 15 } ] },
          { id: 6, exercise: EXERCISES[21], orderIndex: 6, exerciseSets: [ { id: 18, setNo: 1, reps: 15 }, { id: 19, setNo: 2, reps: 15 }, { id: 20, setNo: 3, reps: 15 } ] },
          { id: 7, exercise: EXERCISES[22], orderIndex: 7, exerciseSets: [ { id: 21, setNo: 1, durationSec: 40 }, { id: 22, setNo: 2, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Salı (Lower A)
      {
        id: 2,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 23, exercise: EXERCISES[23], orderIndex: 1, exerciseSets: [ { id: 23, setNo: 1, reps: 8 }, { id: 24, setNo: 2, reps: 8 }, { id: 25, setNo: 3, reps: 8 }, { id: 26, setNo: 4, reps: 8 } ] },
          { id: 24, exercise: EXERCISES[24], orderIndex: 2, exerciseSets: [ { id: 27, setNo: 1, reps: 10 }, { id: 28, setNo: 2, reps: 10 }, { id: 29, setNo: 3, reps: 10 }, { id: 30, setNo: 4, reps: 10 } ] },
          { id: 25, exercise: EXERCISES[25], orderIndex: 3, exerciseSets: [ { id: 31, setNo: 1, reps: 12 }, { id: 32, setNo: 2, reps: 12 }, { id: 33, setNo: 3, reps: 12 } ] },
          { id: 26, exercise: EXERCISES[26], orderIndex: 4, exerciseSets: [ { id: 34, setNo: 1, reps: 12 }, { id: 35, setNo: 2, reps: 12 }, { id: 36, setNo: 3, reps: 12 } ] },
          { id: 27, exercise: EXERCISES[27], orderIndex: 5, exerciseSets: [ { id: 37, setNo: 1, reps: 15 }, { id: 38, setNo: 2, reps: 15 }, { id: 39, setNo: 3, reps: 15 } ] },
          { id: 28, exercise: EXERCISES[28], orderIndex: 6, exerciseSets: [ { id: 40, setNo: 1, reps: 20 }, { id: 41, setNo: 2, reps: 20 }, { id: 42, setNo: 3, reps: 20 } ] },
          { id: 29, exercise: EXERCISES[29], orderIndex: 7, exerciseSets: [ { id: 43, setNo: 1, durationSec: 30 }, { id: 44, setNo: 2, durationSec: 30 }, { id: 45, setNo: 3, durationSec: 30 } ] }
        ]
      },
      // Hafta 1 - Çarşamba (Cardio)
      {
        id: 3,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 46, exercise: EXERCISES[30], orderIndex: 1, exerciseSets: [ { id: 46, setNo: 1, durationSec: 40 }, { id: 47, setNo: 2, durationSec: 40 }, { id: 48, setNo: 3, durationSec: 40 }, { id: 49, setNo: 4, durationSec: 40 }, { id: 50, setNo: 5, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Perşembe (Upper B, varyasyon)
      {
        id: 4,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 51, exercise: EXERCISES[18], orderIndex: 1, exerciseSets: [ { id: 51, setNo: 1, reps: 12 }, { id: 52, setNo: 2, reps: 12 }, { id: 53, setNo: 3, reps: 12 } ] },
          { id: 52, exercise: EXERCISES[19], orderIndex: 2, exerciseSets: [ { id: 54, setNo: 1, reps: 12 }, { id: 55, setNo: 2, reps: 12 }, { id: 56, setNo: 3, reps: 12 } ] },
          { id: 53, exercise: EXERCISES[20], orderIndex: 3, exerciseSets: [ { id: 57, setNo: 1, reps: 15 }, { id: 58, setNo: 2, reps: 15 }, { id: 59, setNo: 3, reps: 15 } ] },
          { id: 54, exercise: EXERCISES[21], orderIndex: 4, exerciseSets: [ { id: 60, setNo: 1, reps: 15 }, { id: 61, setNo: 2, reps: 15 }, { id: 62, setNo: 3, reps: 15 } ] },
          { id: 55, exercise: EXERCISES[22], orderIndex: 5, exerciseSets: [ { id: 63, setNo: 1, reps: 15 }, { id: 64, setNo: 2, reps: 15 }, { id: 65, setNo: 3, reps: 15 } ] },
          { id: 56, exercise: EXERCISES[23], orderIndex: 6, exerciseSets: [ { id: 66, setNo: 1, reps: 8 }, { id: 67, setNo: 2, reps: 8 }, { id: 68, setNo: 3, reps: 8 }, { id: 69, setNo: 4, reps: 8 } ] },
          { id: 57, exercise: EXERCISES[29], orderIndex: 7, exerciseSets: [ { id: 70, setNo: 1, durationSec: 30 }, { id: 71, setNo: 2, durationSec: 30 }, { id: 72, setNo: 3, durationSec: 30 } ] }
        ]
      },
      // Hafta 1 - Cuma (Lower B, varyasyon)
      {
        id: 5,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 73, exercise: EXERCISES[24], orderIndex: 1, exerciseSets: [ { id: 73, setNo: 1, reps: 10 }, { id: 74, setNo: 2, reps: 10 }, { id: 75, setNo: 3, reps: 10 }, { id: 76, setNo: 4, reps: 10 } ] },
          { id: 74, exercise: EXERCISES[25], orderIndex: 2, exerciseSets: [ { id: 77, setNo: 1, reps: 12 }, { id: 78, setNo: 2, reps: 12 }, { id: 79, setNo: 3, reps: 12 } ] },
          { id: 75, exercise: EXERCISES[26], orderIndex: 3, exerciseSets: [ { id: 80, setNo: 1, reps: 12 }, { id: 81, setNo: 2, reps: 12 }, { id: 82, setNo: 3, reps: 12 } ] },
          { id: 76, exercise: EXERCISES[27], orderIndex: 4, exerciseSets: [ { id: 83, setNo: 1, reps: 15 }, { id: 84, setNo: 2, reps: 15 }, { id: 85, setNo: 3, reps: 15 } ] },
          { id: 77, exercise: EXERCISES[28], orderIndex: 5, exerciseSets: [ { id: 86, setNo: 1, reps: 20 }, { id: 87, setNo: 2, reps: 20 }, { id: 88, setNo: 3, reps: 20 } ] },
          { id: 78, exercise: EXERCISES[30], orderIndex: 6, exerciseSets: [ { id: 89, setNo: 1, durationSec: 40 }, { id: 90, setNo: 2, durationSec: 40 }, { id: 91, setNo: 3, durationSec: 40 } ] }
        ]
      }
      // Hafta 2-4 için günler çoğaltılıp set/rep/duration ilerleme matrisine göre güncellenebilir.
    ],
    createdBy: "system",
    likes: [],
    isPublic: true,
    exercises: [EXERCISES[16], EXERCISES[17], EXERCISES[18], EXERCISES[19], EXERCISES[20], EXERCISES[21], EXERCISES[22], EXERCISES[23], EXERCISES[24], EXERCISES[25], EXERCISES[26], EXERCISES[27], EXERCISES[28], EXERCISES[29], EXERCISES[30]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 7,
    title: "Split Advanced",
    slug: "split-advanced",
    description: "5 gün Push-Pull-Leg-Push-Pull, Cumartesi Cardio+Core. 4 hafta, yüksek hacim.",
    difficulty: "ADVANCED",
    durationWeeks: 4,
    coverImageUrl: "https://storage.googleapis.com/fitness-app-photos/adv_split_cover.jpg",
    thumbnailUrl: "https://storage.googleapis.com/fitness-app-photos/adv_split_thumb.jpg",
    tags: ["split", "advanced", "ppl"],
    days: [
      // Hafta 1 - Pazartesi (Push A)
      {
        id: 1,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 1, exercise: getExerciseById(17)!, orderIndex: 1, exerciseSets: [ { id: 1, setNo: 1, reps: 6 }, { id: 2, setNo: 2, reps: 6 }, { id: 3, setNo: 3, reps: 6 }, { id: 4, setNo: 4, reps: 6 }, { id: 5, setNo: 5, reps: 6 } ] },
          { id: 2, exercise: getExerciseById(19)!, orderIndex: 2, exerciseSets: [ { id: 6, setNo: 1, reps: 10 }, { id: 7, setNo: 2, reps: 10 }, { id: 8, setNo: 3, reps: 10 }, { id: 9, setNo: 4, reps: 10 } ] },
          { id: 3, exercise: getExerciseById(32)!, orderIndex: 3, exerciseSets: [ { id: 10, setNo: 1, reps: 8 }, { id: 11, setNo: 2, reps: 8 }, { id: 12, setNo: 3, reps: 8 }, { id: 13, setNo: 4, reps: 8 } ] },
          { id: 4, exercise: getExerciseById(33)!, orderIndex: 4, exerciseSets: [ { id: 14, setNo: 1, reps: 8 }, { id: 15, setNo: 2, reps: 8 }, { id: 16, setNo: 3, reps: 8 } ] },
          { id: 5, exercise: getExerciseById(34)!, orderIndex: 5, exerciseSets: [ { id: 17, setNo: 1, reps: 15 }, { id: 18, setNo: 2, reps: 15 }, { id: 19, setNo: 3, reps: 15 } ] },
          { id: 6, exercise: getExerciseById(35)!, orderIndex: 6, exerciseSets: [ { id: 20, setNo: 1, reps: 15 }, { id: 21, setNo: 2, reps: 15 }, { id: 22, setNo: 3, reps: 15 } ] },
          { id: 7, exercise: getExerciseById(36)!, orderIndex: 7, exerciseSets: [ { id: 23, setNo: 1, durationSec: 40 }, { id: 24, setNo: 2, durationSec: 40 }, { id: 25, setNo: 3, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Salı (Pull A)
      {
        id: 2,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 26, exercise: getExerciseById(37)!, orderIndex: 1, exerciseSets: [ { id: 26, setNo: 1, reps: 5 }, { id: 27, setNo: 2, reps: 5 }, { id: 28, setNo: 3, reps: 5 }, { id: 29, setNo: 4, reps: 5 } ] },
          { id: 27, exercise: getExerciseById(38)!, orderIndex: 2, exerciseSets: [ { id: 30, setNo: 1, reps: 8 }, { id: 31, setNo: 2, reps: 8 }, { id: 32, setNo: 3, reps: 8 }, { id: 33, setNo: 4, reps: 8 } ] },
          { id: 28, exercise: getExerciseById(39)!, orderIndex: 3, exerciseSets: [ { id: 34, setNo: 1, reps: 10 }, { id: 35, setNo: 2, reps: 10 }, { id: 36, setNo: 3, reps: 10 }, { id: 37, setNo: 4, reps: 10 } ] },
          { id: 29, exercise: getExerciseById(40)!, orderIndex: 4, exerciseSets: [ { id: 38, setNo: 1, reps: 12 }, { id: 39, setNo: 2, reps: 12 }, { id: 40, setNo: 3, reps: 12 } ] },
          { id: 30, exercise: getExerciseById(22)!, orderIndex: 5, exerciseSets: [ { id: 41, setNo: 1, reps: 15 }, { id: 42, setNo: 2, reps: 15 }, { id: 43, setNo: 3, reps: 15 } ] },
          { id: 31, exercise: getExerciseById(41)!, orderIndex: 6, exerciseSets: [ { id: 44, setNo: 1, reps: 12 }, { id: 45, setNo: 2, reps: 12 }, { id: 46, setNo: 3, reps: 12 } ] },
          { id: 32, exercise: getExerciseById(42)!, orderIndex: 7, exerciseSets: [ { id: 47, setNo: 1, durationSec: 40 }, { id: 48, setNo: 2, durationSec: 40 }, { id: 49, setNo: 3, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Çarşamba (Leg)
      {
        id: 3,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 50, exercise: getExerciseById(24)!, orderIndex: 1, exerciseSets: [ { id: 50, setNo: 1, reps: 6 }, { id: 51, setNo: 2, reps: 6 }, { id: 52, setNo: 3, reps: 6 }, { id: 53, setNo: 4, reps: 6 }, { id: 54, setNo: 5, reps: 6 } ] },
          { id: 51, exercise: getExerciseById(25)!, orderIndex: 2, exerciseSets: [ { id: 55, setNo: 1, reps: 10 }, { id: 56, setNo: 2, reps: 10 }, { id: 57, setNo: 3, reps: 10 }, { id: 58, setNo: 4, reps: 10 } ] },
          { id: 52, exercise: getExerciseById(43)!, orderIndex: 3, exerciseSets: [ { id: 59, setNo: 1, reps: 10 }, { id: 60, setNo: 2, reps: 10 }, { id: 61, setNo: 3, reps: 10 } ] },
          { id: 53, exercise: getExerciseById(44)!, orderIndex: 4, exerciseSets: [ { id: 62, setNo: 1, reps: 12 }, { id: 63, setNo: 2, reps: 12 }, { id: 64, setNo: 3, reps: 12 } ] },
          { id: 54, exercise: getExerciseById(45)!, orderIndex: 5, exerciseSets: [ { id: 65, setNo: 1, reps: 15 }, { id: 66, setNo: 2, reps: 15 }, { id: 67, setNo: 3, reps: 15 } ] },
          { id: 55, exercise: getExerciseById(29)!, orderIndex: 6, exerciseSets: [ { id: 68, setNo: 1, reps: 20 }, { id: 69, setNo: 2, reps: 20 }, { id: 70, setNo: 3, reps: 20 }, { id: 71, setNo: 4, reps: 20 } ] },
          { id: 56, exercise: getExerciseById(46)!, orderIndex: 7, exerciseSets: [ { id: 72, setNo: 1, reps: 12 }, { id: 73, setNo: 2, reps: 12 }, { id: 74, setNo: 3, reps: 12 } ] }
        ]
      },
      // Hafta 1 - Perşembe (Push B)
      {
        id: 4,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 57, exercise: getExerciseById(47)!, orderIndex: 1, exerciseSets: [ { id: 75, setNo: 1, reps: 10 }, { id: 76, setNo: 2, reps: 10 }, { id: 77, setNo: 3, reps: 10 }, { id: 78, setNo: 4, reps: 10 } ] },
          { id: 58, exercise: getExerciseById(48)!, orderIndex: 2, exerciseSets: [ { id: 79, setNo: 1, reps: 10 }, { id: 80, setNo: 2, reps: 10 }, { id: 81, setNo: 3, reps: 10 }, { id: 82, setNo: 4, reps: 10 } ] },
          { id: 59, exercise: getExerciseById(49)!, orderIndex: 3, exerciseSets: [ { id: 83, setNo: 1, reps: 8 }, { id: 84, setNo: 2, reps: 8 }, { id: 85, setNo: 3, reps: 8 }, { id: 86, setNo: 4, reps: 8 } ] },
          { id: 60, exercise: getExerciseById(33)!, orderIndex: 4, exerciseSets: [ { id: 87, setNo: 1, reps: 15 }, { id: 88, setNo: 2, reps: 15 }, { id: 89, setNo: 3, reps: 15 } ] },
          { id: 61, exercise: getExerciseById(34)!, orderIndex: 5, exerciseSets: [ { id: 90, setNo: 1, reps: 15 }, { id: 91, setNo: 2, reps: 15 }, { id: 92, setNo: 3, reps: 15 } ] },
          { id: 62, exercise: getExerciseById(35)!, orderIndex: 6, exerciseSets: [ { id: 93, setNo: 1, durationSec: 40 }, { id: 94, setNo: 2, durationSec: 40 }, { id: 95, setNo: 3, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Cuma (Pull B)
      {
        id: 5,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 63, exercise: getExerciseById(49)!, orderIndex: 1, exerciseSets: [ { id: 96, setNo: 1, reps: 3 }, { id: 97, setNo: 2, reps: 3 }, { id: 98, setNo: 3, reps: 3 } ] },
          { id: 64, exercise: getExerciseById(50)!, orderIndex: 2, exerciseSets: [ { id: 99, setNo: 1, reps: 10 }, { id: 100, setNo: 2, reps: 10 }, { id: 101, setNo: 3, reps: 10 } ] },
          { id: 65, exercise: getExerciseById(37)!, orderIndex: 3, exerciseSets: [ { id: 102, setNo: 1, reps: 8 }, { id: 103, setNo: 2, reps: 8 }, { id: 104, setNo: 3, reps: 8 } ] },
          { id: 66, exercise: getExerciseById(38)!, orderIndex: 4, exerciseSets: [ { id: 105, setNo: 1, reps: 8 }, { id: 106, setNo: 2, reps: 8 }, { id: 107, setNo: 3, reps: 8 } ] },
          { id: 67, exercise: getExerciseById(22)!, orderIndex: 5, exerciseSets: [ { id: 108, setNo: 1, reps: 15 }, { id: 109, setNo: 2, reps: 15 }, { id: 110, setNo: 3, reps: 15 } ] },
          { id: 68, exercise: getExerciseById(41)!, orderIndex: 6, exerciseSets: [ { id: 111, setNo: 1, reps: 12 }, { id: 112, setNo: 2, reps: 12 }, { id: 113, setNo: 3, reps: 12 } ] },
          { id: 69, exercise: getExerciseById(42)!, orderIndex: 7, exerciseSets: [ { id: 114, setNo: 1, durationSec: 40 }, { id: 115, setNo: 2, durationSec: 40 }, { id: 116, setNo: 3, durationSec: 40 } ] }
        ]
      },
      // Hafta 1 - Cumartesi (Cardio + Core)
      {
        id: 6,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 70, exercise: getExerciseById(51)!, orderIndex: 1, exerciseSets: [ { id: 117, setNo: 1, durationSec: 30 }, { id: 118, setNo: 2, durationSec: 30 }, { id: 119, setNo: 3, durationSec: 30 }, { id: 120, setNo: 4, durationSec: 30 }, { id: 121, setNo: 5, durationSec: 30 }, { id: 122, setNo: 6, durationSec: 30 }, { id: 123, setNo: 7, durationSec: 30 }, { id: 124, setNo: 8, durationSec: 30 } ] },
          { id: 71, exercise: getExerciseById(52)!, orderIndex: 2, exerciseSets: [ { id: 125, setNo: 1, reps: 15 }, { id: 126, setNo: 2, reps: 15 }, { id: 127, setNo: 3, reps: 15 } ] },
          { id: 72, exercise: getExerciseById(53)!, orderIndex: 3, exerciseSets: [ { id: 128, setNo: 1, reps: 20 }, { id: 129, setNo: 2, reps: 20 }, { id: 130, setNo: 3, reps: 20 } ] }
        ]
      }
      // Hafta 2-4 için günler çoğaltılıp set/rep/duration ilerleme matrisine göre güncellenebilir.
    ],
    createdBy: "system",
    likes: [],
    isPublic: true,
    exercises: [getExerciseById(17)!, getExerciseById(19)!, getExerciseById(32)!, getExerciseById(33)!, getExerciseById(34)!, getExerciseById(35)!, getExerciseById(36)!, getExerciseById(37)!, getExerciseById(38)!, getExerciseById(39)!, getExerciseById(40)!, getExerciseById(22)!, getExerciseById(41)!, getExerciseById(42)!, getExerciseById(24)!, getExerciseById(25)!, getExerciseById(43)!, getExerciseById(44)!, getExerciseById(45)!, getExerciseById(29)!, getExerciseById(46)!, getExerciseById(47)!, getExerciseById(48)!, getExerciseById(49)!, getExerciseById(50)!, getExerciseById(51)!, getExerciseById(52)!, getExerciseById(53)!],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    title: "Advanced Split + Cardio",
    slug: "adv-split-cardio",
    description: "PPL + 2 kardiyo + MetCon. Haftada 6 gün, 4 hafta.",
    difficulty: "ADVANCED",
    durationWeeks: 4,
    coverImageUrl: "https://storage.googleapis.com/fitness-app-photos/adv_split_cardio_cover.jpg",
    thumbnailUrl: "https://storage.googleapis.com/fitness-app-photos/adv_split_cardio_thumb.jpg",
    tags: ["split", "cardio", "advanced"],
    days: [
      // Pazartesi – PUSH
      {
        id: 1,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 1, exercise: getExerciseById(17)!, orderIndex: 1, exerciseSets: [ { id: 1, setNo: 1, reps: 6 }, { id: 2, setNo: 2, reps: 6 }, { id: 3, setNo: 3, reps: 6 }, { id: 4, setNo: 4, reps: 6 }, { id: 5, setNo: 5, reps: 6 } ] }, // Barbell Bench Press
          { id: 2, exercise: getExerciseById(19)!, orderIndex: 2, exerciseSets: [ { id: 6, setNo: 1, reps: 10 }, { id: 7, setNo: 2, reps: 10 }, { id: 8, setNo: 3, reps: 10 }, { id: 9, setNo: 4, reps: 10 } ] }, // Incline DB Press
          { id: 3, exercise: getExerciseById(32)!, orderIndex: 3, exerciseSets: [ { id: 10, setNo: 1, reps: 8 }, { id: 11, setNo: 2, reps: 8 }, { id: 12, setNo: 3, reps: 8 }, { id: 13, setNo: 4, reps: 8 } ] }, // Overhead Barbell Press
          { id: 4, exercise: getExerciseById(33)!, orderIndex: 4, exerciseSets: [ { id: 14, setNo: 1, reps: 10 }, { id: 15, setNo: 2, reps: 10 }, { id: 16, setNo: 3, reps: 10 } ] }, // Weighted Dip
          { id: 5, exercise: getExerciseById(34)!, orderIndex: 5, exerciseSets: [ { id: 17, setNo: 1, reps: 15 }, { id: 18, setNo: 2, reps: 15 }, { id: 19, setNo: 3, reps: 15 } ] }, // Cable Fly
          { id: 6, exercise: getExerciseById(54)!, orderIndex: 6, exerciseSets: [ { id: 20, setNo: 1, reps: 12 }, { id: 21, setNo: 2, reps: 12 }, { id: 22, setNo: 3, reps: 12 } ] }, // Skull Crusher
          { id: 7, exercise: getExerciseById(55)!, orderIndex: 7, exerciseSets: [ { id: 23, setNo: 1, durationSec: 15 }, { id: 24, setNo: 2, durationSec: 15 }, { id: 25, setNo: 3, durationSec: 15 } ] } // Pallof Press
        ]
      },
      // Salı – PULL
      {
        id: 2,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 8, exercise: getExerciseById(38)!, orderIndex: 1, exerciseSets: [ { id: 26, setNo: 1, reps: 8 }, { id: 27, setNo: 2, reps: 8 }, { id: 28, setNo: 3, reps: 8 }, { id: 29, setNo: 4, reps: 8 } ] }, // Weighted Pull-Up
          { id: 9, exercise: getExerciseById(39)!, orderIndex: 2, exerciseSets: [ { id: 30, setNo: 1, reps: 10 }, { id: 31, setNo: 2, reps: 10 }, { id: 32, setNo: 3, reps: 10 }, { id: 33, setNo: 4, reps: 10 } ] }, // Pendlay Row
          { id: 10, exercise: getExerciseById(20)!, orderIndex: 3, exerciseSets: [ { id: 34, setNo: 1, reps: 12 }, { id: 35, setNo: 2, reps: 12 }, { id: 36, setNo: 3, reps: 12 } ] }, // Seated Cable Row
          { id: 11, exercise: getExerciseById(56)!, orderIndex: 4, exerciseSets: [ { id: 37, setNo: 1, reps: 15 }, { id: 38, setNo: 2, reps: 15 }, { id: 39, setNo: 3, reps: 15 } ] }, // Lat-Pulldown
          { id: 12, exercise: getExerciseById(22)!, orderIndex: 5, exerciseSets: [ { id: 40, setNo: 1, reps: 15 }, { id: 41, setNo: 2, reps: 15 }, { id: 42, setNo: 3, reps: 15 } ] }, // Face Pull
          { id: 13, exercise: getExerciseById(41)!, orderIndex: 6, exerciseSets: [ { id: 43, setNo: 1, reps: 12 }, { id: 44, setNo: 2, reps: 12 }, { id: 45, setNo: 3, reps: 12 } ] }, // Barbell Curl
          { id: 14, exercise: getExerciseById(57)!, orderIndex: 7, exerciseSets: [ { id: 46, setNo: 1, reps: 15 }, { id: 47, setNo: 2, reps: 15 }, { id: 48, setNo: 3, reps: 15 } ] } // Hanging Knee Raise
        ]
      },
      // Çarşamba – LEG
      {
        id: 3,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 15, exercise: getExerciseById(24)!, orderIndex: 1, exerciseSets: [ { id: 49, setNo: 1, reps: 6 }, { id: 50, setNo: 2, reps: 6 }, { id: 51, setNo: 3, reps: 6 }, { id: 52, setNo: 4, reps: 6 }, { id: 53, setNo: 5, reps: 6 } ] }, // Back Squat
          { id: 16, exercise: getExerciseById(25)!, orderIndex: 2, exerciseSets: [ { id: 54, setNo: 1, reps: 10 }, { id: 55, setNo: 2, reps: 10 }, { id: 56, setNo: 3, reps: 10 }, { id: 57, setNo: 4, reps: 10 } ] }, // Romanian Deadlift
          { id: 17, exercise: getExerciseById(26)!, orderIndex: 3, exerciseSets: [ { id: 58, setNo: 1, reps: 12 }, { id: 59, setNo: 2, reps: 12 }, { id: 60, setNo: 3, reps: 12 } ] }, // Walking Lunge
          { id: 18, exercise: getExerciseById(44)!, orderIndex: 4, exerciseSets: [ { id: 61, setNo: 1, reps: 12 }, { id: 62, setNo: 2, reps: 12 }, { id: 63, setNo: 3, reps: 12 } ] }, // Leg Press
          { id: 19, exercise: getExerciseById(45)!, orderIndex: 5, exerciseSets: [ { id: 64, setNo: 1, reps: 15 }, { id: 65, setNo: 2, reps: 15 }, { id: 66, setNo: 3, reps: 15 } ] }, // Seated Leg Curl
          { id: 20, exercise: getExerciseById(29)!, orderIndex: 6, exerciseSets: [ { id: 67, setNo: 1, reps: 20 }, { id: 68, setNo: 2, reps: 20 }, { id: 69, setNo: 3, reps: 20 }, { id: 70, setNo: 4, reps: 20 } ] }, // Standing Calf Raise
          { id: 21, exercise: getExerciseById(46)!, orderIndex: 7, exerciseSets: [ { id: 71, setNo: 1, reps: 12 }, { id: 72, setNo: 2, reps: 12 }, { id: 73, setNo: 3, reps: 12 } ] } // Ab-Wheel
        ]
      },
      // Perşembe – Cardio MICT
      {
        id: 4,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 22, exercise: getExerciseById(58)!, orderIndex: 1, exerciseSets: [ { id: 74, setNo: 1, durationSec: 2700 } ] } // Continuous Run (45 dk)
        ]
      },
      // Cuma – UPPER MetCon
      {
        id: 5,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 23, exercise: getExerciseById(59)!, orderIndex: 1, exerciseSets: [ { id: 75, setNo: 1, reps: 10 }, { id: 76, setNo: 2, reps: 10 }, { id: 77, setNo: 3, reps: 10 }, { id: 78, setNo: 4, reps: 10 } ] }, // DB Thruster
          { id: 24, exercise: getExerciseById(18)!, orderIndex: 2, exerciseSets: [ { id: 79, setNo: 1, reps: 10 }, { id: 80, setNo: 2, reps: 10 }, { id: 81, setNo: 3, reps: 10 }, { id: 82, setNo: 4, reps: 10 } ] }, // Barbell Bent-over Row
          { id: 25, exercise: getExerciseById(60)!, orderIndex: 3, exerciseSets: [ { id: 83, setNo: 1, reps: 0 } ] }, // Push-up (plate), AMRAP
          { id: 26, exercise: getExerciseById(61)!, orderIndex: 4, exerciseSets: [ { id: 84, setNo: 1, reps: 12 }, { id: 85, setNo: 2, reps: 12 }, { id: 86, setNo: 3, reps: 12 }, { id: 87, setNo: 4, reps: 12 } ] }, // Renegade Row
          { id: 27, exercise: getExerciseById(62)!, orderIndex: 5, exerciseSets: [ { id: 88, setNo: 1, durationSec: 30 }, { id: 89, setNo: 2, durationSec: 30 }, { id: 90, setNo: 3, durationSec: 30 }, { id: 91, setNo: 4, durationSec: 30 } ] } // Battle Rope Slam
        ]
      },
      // Cumartesi – HIIT + Core
      {
        id: 6,
        userId: "system",
        date: "",
        exerciseEntries: [
          { id: 28, exercise: getExerciseById(51)!, orderIndex: 1, exerciseSets: [ { id: 92, setNo: 1, durationSec: 30 }, { id: 93, setNo: 2, durationSec: 30 }, { id: 94, setNo: 3, durationSec: 30 }, { id: 95, setNo: 4, durationSec: 30 }, { id: 96, setNo: 5, durationSec: 30 }, { id: 97, setNo: 6, durationSec: 30 }, { id: 98, setNo: 7, durationSec: 30 }, { id: 99, setNo: 8, durationSec: 30 }, { id: 100, setNo: 9, durationSec: 30 }, { id: 101, setNo: 10, durationSec: 30 } ] }, // HIIT Sprint
          { id: 29, exercise: getExerciseById(52)!, orderIndex: 2, exerciseSets: [ { id: 102, setNo: 1, reps: 15 }, { id: 103, setNo: 2, reps: 15 }, { id: 104, setNo: 3, reps: 15 } ] }, // Cable Wood-Chop
          { id: 30, exercise: getExerciseById(63)!, orderIndex: 3, exerciseSets: [ { id: 105, setNo: 1, reps: 20 }, { id: 106, setNo: 2, reps: 20 }, { id: 107, setNo: 3, reps: 20 } ] } // V-Sit
        ]
      }
    ],
    createdBy: "system",
    likes: [],
    isPublic: true,
    exercises: [
      getExerciseById(17)!, getExerciseById(19)!, getExerciseById(32)!, getExerciseById(33)!, getExerciseById(34)!, getExerciseById(54)!, getExerciseById(55)!, getExerciseById(38)!, getExerciseById(39)!, getExerciseById(20)!, getExerciseById(56)!, getExerciseById(22)!, getExerciseById(41)!, getExerciseById(57)!, getExerciseById(24)!, getExerciseById(25)!, getExerciseById(26)!, getExerciseById(44)!, getExerciseById(45)!, getExerciseById(29)!, getExerciseById(46)!, getExerciseById(58)!, getExerciseById(59)!, getExerciseById(18)!, getExerciseById(60)!, getExerciseById(61)!, getExerciseById(62)!, getExerciseById(51)!, getExerciseById(52)!, getExerciseById(63)!
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
]

// Helper function to get program by ID
export const getProgramById = (id: string): WorkoutProgram | undefined => {
  return WORKOUT_PROGRAMS.find((program) => program.id.toString() === id)
}

// Helper function to get exercise by ID


// Helper function to format difficulty
export const formatDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case "BEGINNER":
      return "Beginner"
    case "INTERMEDIATE":
      return "Intermediate"
    case "ADVANCED":
      return "Advanced"
    default:
      return difficulty
  }
}

// Helper function to get difficulty color
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "BEGINNER":
      return "#4CAF50"
    case "INTERMEDIATE":
      return "#FF9800"
    case "ADVANCED":
      return "#F44336"
    default:
      return "#757575"
  }
}

export type Activity = "sedentary" | "light" | "moderate" | "active" | "veryActive" | "extraActive" | "*"
export type Goal     = "loseWeight" | "gainMuscle" | "stayFit" | "improveHealth"   | "*"

export interface Rule {
  activity: Activity
  goal: Goal
  /** 1-n program; index-0 = "öncelikli öneri" */
  recommend: string[]
}

export const RECOMMENDATION_MATRIX: Rule[] = [
  // --- Sedentary & Light ----------------------------------------------------
  { activity: "sedentary", goal: "loseWeight",      recommend: ["CARDIO_BLAST",        "FULLBODY_BEGINNER"] },
  { activity: "sedentary", goal: "gainMuscle",      recommend: ["FULLBODY_BEGINNER"] },
  { activity: "sedentary", goal: "stayFit",         recommend: ["FULLBODY_BEGINNER"] },
  { activity: "sedentary", goal: "improveHealth",   recommend: ["CARDIO_BLAST"] },

  { activity: "light",     goal: "loseWeight",      recommend: ["CARDIO_BLAST",        "FULLBODY_BEGINNER"] },
  { activity: "light",     goal: "gainMuscle",      recommend: ["FULLBODY_BEGINNER"] },
  { activity: "light",     goal: "stayFit",         recommend: ["FULLBODY_BEGINNER"] },
  { activity: "light",     goal: "improveHealth",   recommend: ["CARDIO_BLAST"] },

  // --- Moderate -------------------------------------------------------------
  { activity: "moderate",  goal: "loseWeight",      recommend: ["CARDIO_BLAST",        "ADV_SPLIT_CARDIO"] },   // alt + üst
  { activity: "moderate",  goal: "gainMuscle",      recommend: ["SPLIT_INTERMEDIATE",     "FULLBODY_BEGINNER"] },
  { activity: "moderate",  goal: "stayFit",         recommend: ["FULLBODY_BEGINNER",      "SPLIT_INTERMEDIATE"] },
  { activity: "moderate",  goal: "improveHealth",   recommend: ["CARDIO_BLAST"] },

  // --- Active ---------------------------------------------------------------
  { activity: "active",    goal: "loseWeight",      recommend: ["ADV_SPLIT_CARDIO",       "CARDIO_BLAST"] },
  { activity: "active",    goal: "gainMuscle",      recommend: ["SPLIT_ADVANCED",         "SPLIT_INTERMEDIATE"] },
  { activity: "active",    goal: "stayFit",         recommend: ["SPLIT_INTERMEDIATE",     "FULLBODY_BEGINNER"] },
  { activity: "active",    goal: "improveHealth",   recommend: ["ADV_SPLIT_CARDIO",       "CARDIO_BLAST"] },

  // --- Very / Extra Active --------------------------------------------------
  { activity: "veryActive",goal: "loseWeight",      recommend: ["ADV_SPLIT_CARDIO",       "SPLIT_INTERMEDIATE"] },
  { activity: "veryActive",goal: "gainMuscle",      recommend: ["SPLIT_ADVANCED",         "SPLIT_INTERMEDIATE"] },
  { activity: "veryActive",goal: "stayFit",         recommend: ["SPLIT_ADVANCED",         "SPLIT_INTERMEDIATE"] },
  { activity: "veryActive",goal: "improveHealth",   recommend: ["ADV_SPLIT_CARDIO",       "CARDIO_BLAST"] },

  { activity: "extraActive",goal:"loseWeight",      recommend: ["ADV_SPLIT_CARDIO",       "SPLIT_INTERMEDIATE"] },
  { activity: "extraActive",goal:"gainMuscle",      recommend: ["SPLIT_ADVANCED",         "SPLIT_INTERMEDIATE"] },
  { activity: "extraActive",goal:"stayFit",         recommend: ["SPLIT_ADVANCED",         "SPLIT_INTERMEDIATE"] },
  { activity: "extraActive",goal:"improveHealth",   recommend: ["ADV_SPLIT_CARDIO",       "CARDIO_BLAST"] },

  // --- Fallback -------------------------------------------------------------
  { activity: "*", goal: "*",                       recommend: ["CUSTOM"] }
]
