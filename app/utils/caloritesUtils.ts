export function calculateCalorieNeeds(
    gender: "Male" | "Female",
    weight: number,
    height: number,
    age: number,
    activityLevel: string,
    goal: string
  ): number {
    // 1. BMR Hesapla (Mifflin-St Jeor Equation)
    const bmr =
      gender === "Male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161
  
    // 2. Aktivite çarpanı belirle
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
      extraActive: 2.0,
    }
    const multiplier = activityMultipliers[activityLevel] || 1.2
    let tdee = bmr * multiplier
  
    // 3. Hedefe göre kalori ayarı yap
    if (goal === "loseWeight") {
      tdee -= 500
    } else if (goal === "gainMuscle") {
      tdee += 300
    }
  
    return Math.round(tdee)
  }
  